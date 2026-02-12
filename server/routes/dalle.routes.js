import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Try to use OpenAI API, but fallback to demo mode if billing limit reached
    try {
      const response = await openai.images.generate({
        model: "dall-e-2",
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      });

      const image = response.data[0].b64_json;
      res.status(200).json({ photo: image });
    } catch (openaiError) {
      // If billing limit reached or API error, use demo mode
      console.log("⚠️  OpenAI API unavailable:", openaiError.message);
      console.log("📝 Using demo mode with placeholder image");

      // Use the threejs logo from the client public folder as demo
      const logoPath = path.join(__dirname, "../../client/public/threejs.png");

      if (fs.existsSync(logoPath)) {
        const imageBuffer = fs.readFileSync(logoPath);
        const base64Image = imageBuffer.toString("base64");
        res.status(200).json({
          photo: base64Image,
          demo: true,
          message:
            "⚠️ Demo mode: OpenAI billing limit reached. Using placeholder image.",
        });
      } else {
        // If file doesn't exist, return error
        res.status(503).json({
          message:
            "OpenAI API unavailable and no fallback image found. Please add billing to your OpenAI account at https://platform.openai.com/account/billing",
          error: openaiError.message,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

export default router;
