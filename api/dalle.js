import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({ message: "Hello from DALL.E API" });
  }

  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      try {
        const response = await openai.images.generate({
          model: "dall-e-2",
          prompt,
          n: 1,
          size: "1024x1024",
          response_format: "b64_json",
        });

        const image = response.data[0].b64_json;
        return res.status(200).json({ photo: image });
      } catch (openaiError) {
        console.log("⚠️  OpenAI API unavailable:", openaiError.message);
        console.log("📝 Using demo mode");

        // Return a simple placeholder message in demo mode
        return res.status(200).json({
          photo: null,
          message: "OpenAI API unavailable. Please check your API key and billing.",
          demo: true
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
