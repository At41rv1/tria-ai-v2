
// Environment configuration for deployment
export const config = {
  // Database Configuration
  database: {
    url: import.meta.env.VITE_DATABASE_URL || 'postgresql://neondb_owner:npg_qHSkAB7l9utN@ep-misty-flower-a8tlacd0-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  },
  
  // Firebase Configuration
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAUwbCbsT2yvFvjUc0-eeJ2qCMibJKs0OY',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'a7-tria.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'a7-tria',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'a7-tria.appspot.com',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '69423808863',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:69423808863:web:your-app-id',
  },

  // Groq AI Configuration
  groq: {
    apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
    baseUrl: import.meta.env.VITE_GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
    model: import.meta.env.VITE_GROQ_MODEL || 'llama-3.1-8b-instant',
  },

  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
    openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY || '', // Only if using client-side AI
  },

  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Triple Chat',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.VITE_APP_ENVIRONMENT || import.meta.env.MODE || 'development',
    isDevelopment: import.meta.env.DEV || false,
    isProduction: import.meta.env.PROD || false,
  },

  // Deployment Configuration
  deployment: {
    netlifyUrl: import.meta.env.VITE_NETLIFY_URL || '',
    netlifyDeployUrl: import.meta.env.VITE_NETLIFY_DEPLOY_URL || '',
    netlifySiteId: import.meta.env.VITE_NETLIFY_SITE_ID || '',
  }
};

// Validation function to check if required environment variables are set
export const validateEnvironment = () => {
  const required = [
    'VITE_DATABASE_URL',
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
  ];

  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing);
    return false;
  }
  
  return true;
};

// Development helper to log configuration (excluding sensitive data)
export const logEnvironmentInfo = () => {
  if (config.app.isDevelopment) {
    console.log('Environment Info:', {
      environment: config.app.environment,
      hasDatabase: !!config.database.url,
      hasFirebase: !!config.firebase.apiKey,
      hasGroq: !!config.groq.apiKey,
      appName: config.app.name,
      version: config.app.version,
    });
  }
};

export default config;
