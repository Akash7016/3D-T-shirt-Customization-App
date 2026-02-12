# Vercel Deployment Guide

This project is now configured for Vercel deployment with serverless functions.

## 📦 What Changed for Vercel

1. ✅ Created `/api/dalle.js` - Serverless function replacing Express server
2. ✅ Updated `vercel.json` - Vercel configuration for build and routing
3. ✅ Updated client config - Uses relative paths in production
4. ✅ Updated `Customizer.jsx` - Detects environment automatically
5. ✅ Added root `package.json` - Install dependencies for API

## 🚀 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push
```

### 2. Deploy on Vercel

**Option A: Via Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration
5. **Add Environment Variable:**
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
6. Click "Deploy"

**Option B: Via Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variable
vercel env add OPENAI_API_KEY

# Deploy to production
vercel --prod
```

### 3. Environment Variables

In Vercel Dashboard, add:
- `OPENAI_API_KEY` - Your OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys)

## 🧪 Testing Locally

### Client (Frontend)
```bash
cd client
npm install
npm run dev
```

### Server (Backend - for local testing)
```bash
cd server
npm install
# Create .env file with OPENAI_API_KEY
npm start
```

## 🔧 Common Issues & Solutions

### Issue: "Build failed"
- **Solution**: Make sure all dependencies are installed. Run `npm install` in both client and root directories.

### Issue: "API not found" or 404 errors
- **Solution**: The API route is `/api/v1/dalle`. Check that `vercel.json` rewrites are configured correctly.

### Issue: "OpenAI API error"
- **Solution**: 
  1. Verify your API key is set in Vercel environment variables
  2. Check your OpenAI account has available credits
  3. The app will work but AI features require valid API key

### Issue: "CORS errors"
- **Solution**: Already handled in `/api/dalle.js` with proper CORS headers

## 📁 Project Structure After Changes

```
project_threejs_ai/
├── api/
│   └── dalle.js          # ✨ Serverless function for Vercel
├── client/
│   ├── src/
│   │   ├── config/
│   │   │   └── config.js # Updated with relative paths
│   │   └── pages/
│   │       └── Customizer.jsx # Updated to use config
│   └── dist/             # Build output (auto-generated)
├── server/               # Original Express server (for local dev)
├── vercel.json          # ✨ Vercel configuration
└── package.json         # ✨ Root dependencies for API

```

## ✅ Verification

After deployment:
1. Visit your Vercel URL
2. Try color customization (should work immediately)
3. Try AI generation (requires valid OpenAI API key)
4. Check browser console for any errors

## 📱 Features

- ✅ Color customization
- ✅ File upload for logos/textures
- ✅ AI-generated logos and textures (with OpenAI API key)
- ✅ Responsive 3D rendering
- ✅ Download customized designs

---

Need help? Check [Vercel Documentation](https://vercel.com/docs) or [OpenAI API Documentation](https://platform.openai.com/docs)
