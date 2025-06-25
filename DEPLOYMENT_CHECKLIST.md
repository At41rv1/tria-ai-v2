
# Netlify Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Variables Setup
- [ ] Set `VITE_DATABASE_URL` with your Neon database connection string
- [ ] Set all Firebase configuration variables from your Firebase console
- [ ] Set `VITE_GROQ_API_KEY` from your Groq console
- [ ] Set application configuration variables
- [ ] Verify all variables are set in Netlify dashboard

### 2. Database Setup
- [ ] Neon database is created and accessible
- [ ] Database schema is migrated (run `npx drizzle-kit push` if needed)
- [ ] Database connection string is correctly formatted with SSL mode

### 3. Firebase Setup
- [ ] Firebase project is created
- [ ] Authentication is enabled (Email/Password provider)
- [ ] Firebase configuration is copied from console
- [ ] Domain is added to authorized domains in Firebase

### 4. Groq AI Setup
- [ ] Groq account is created
- [ ] API key is generated
- [ ] API limits and quotas are understood

## Deployment Steps

1. **Connect Repository to Netlify:**
   ```bash
   # If using Git
   git add .
   git commit -m "Add environment configuration"
   git push origin main
   ```

2. **Set Environment Variables in Netlify:**
   - Go to Site settings > Environment variables
   - Add all variables from the list above
   - Deploy the site

3. **Verify Deployment:**
   - [ ] Site builds successfully
   - [ ] Database connections work
   - [ ] Authentication flows work
   - [ ] Chat features respond correctly
   - [ ] No console errors

## Post-Deployment

- [ ] Test all major features
- [ ] Monitor for any runtime errors
- [ ] Set up custom domain (if needed)
- [ ] Configure any additional Netlify features (forms, functions, etc.)

## Troubleshooting

If you encounter issues:
1. Check Netlify build logs for errors
2. Verify environment variables are correctly set
3. Test database connectivity
4. Check Firebase configuration
5. Verify API keys are valid and have proper permissions

## Security Reminders

- Never commit actual API keys to your repository
- Use the `.env.example` file as a template
- Regularly rotate API keys
- Monitor usage of external services
