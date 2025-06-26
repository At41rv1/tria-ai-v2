
// Direct configuration without environment variables
export const config = {
  // Database Configuration
  database: {
    url: 'postgresql://neondb_owner:npg_qHSkAB7l9utN@ep-fragrant-truth-a87ffjpc-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require',
  },
  
  // Firebase Configuration
  firebase: {
    apiKey: 'AIzaSyAUwbCbsT2yvFvjUc0-eeJ2qCMibJKs0OY',
    authDomain: 'a7-tria.firebaseapp.com',
    projectId: 'a7-tria',
    storageBucket: 'a7-tria.appspot.com',
    messagingSenderId: '69423808863',
    appId: '1:69423808863:web:your-app-id',
  },

  // Groq AI Configuration
  groq: {
    apiKey: '',
    baseUrl: 'https://api.groq.com/openai/v1',
    model: 'llama-3.1-8b-instant',
  },

  // API Configuration
  api: {
    baseUrl: 'https://api.example.com',
    openaiApiKey: '',
  },

  // App Configuration
  app: {
    name: 'Triple Chat',
    version: '1.0.0',
    environment: 'production',
    isDevelopment: false,
    isProduction: true,
  },

  // Deployment Configuration
  deployment: {
    netlifyUrl: '',
    netlifyDeployUrl: '',
    netlifySiteId: '',
  }
};

export const validateEnvironment = () => {
  return true;
};

export const logEnvironmentInfo = () => {
  console.log('Environment Info:', {
    environment: config.app.environment,
    hasDatabase: !!config.database.url,
    hasFirebase: !!config.firebase.apiKey,
    appName: config.app.name,
    version: config.app.version,
  });
};

export default config;
