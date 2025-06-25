
# Netlify Environment Variables Setup Guide

This guide covers all environment variables needed for your Triple Chat application on Netlify.

## Required Environment Variables

### 1. Neon Database Configuration
```
VITE_DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require
```
- Get this from your Neon dashboard under "Connection Details"
- Format: `postgresql://[user]:[password]@[hostname]/[database]?sslmode=require`

### 2. Firebase Configuration
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
- Get these from Firebase Console > Project Settings > General > Your apps > Config

### 3. Groq AI Configuration
```
VITE_GROQ_API_KEY=your_groq_api_key
VITE_GROQ_BASE_URL=https://api.groq.com/openai/v1
```
- Get your API key from https://console.groq.com/keys

### 4. Application Configuration
```
VITE_APP_NAME=Triple Chat
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=production
```

### 5. Optional API Keys (if using other services)
```
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_API_BASE_URL=https://your-api-domain.com
```

## How to Set Environment Variables in Netlify

1. **Via Netlify Dashboard:**
   - Go to your site dashboard on Netlify
   - Navigate to Site settings > Environment variables
   - Click "Add a variable"
   - Enter the key-value pairs from above

2. **Via Netlify CLI:**
   ```bash
   netlify env:set VITE_DATABASE_URL "your_database_url"
   netlify env:set VITE_FIREBASE_API_KEY "your_firebase_api_key"
   # ... repeat for all variables
   ```

3. **Via netlify.toml file:**
   ```toml
   [build.environment]
     VITE_DATABASE_URL = "your_database_url"
     VITE_FIREBASE_API_KEY = "your_firebase_api_key"
     # ... other variables
   ```

## Security Notes

- All variables prefixed with `VITE_` are exposed to the client-side
- Only use `VITE_` prefix for publishable keys and non-sensitive data
- For sensitive server-side operations, use Netlify Functions with non-VITE variables
- Never commit actual API keys to your repository

## Development vs Production

For local development, create a `.env.local` file:
```
VITE_DATABASE_URL=your_local_or_dev_database_url
VITE_FIREBASE_API_KEY=your_firebase_api_key
# ... other variables
```

## Verification

After setting up, verify your deployment by checking:
1. Database connections work
2. Firebase authentication functions
3. AI chat features respond correctly
4. No console errors related to missing environment variables
