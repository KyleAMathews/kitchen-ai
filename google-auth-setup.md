# Setting Up Google OAuth with Email Restrictions

This guide explains how to enable Google Sign-In for your Kitchen AI app in production, with the ability to restrict access to specific email addresses.

## Overview

The implementation allows users to sign in with Google while:

- Restricting access to a whitelist of approved emails
- Automatically creating accounts on first sign-in (conflating sign-in and sign-up)
- Falling back to email/password authentication when needed

## Step 1: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API for your project
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Configure the OAuth consent screen with your app details
7. Add authorized redirect URIs:
   - For local development: `https://kitchen-ai.localhost/api/auth/callback/google`
   - For production: `https://your-domain.fly.dev/api/auth/callback/google`
8. Copy your **Client ID** and **Client Secret**

## Step 2: Environment Variables

Add these environment variables to your Fly.io deployment:

```bash
# Google OAuth credentials
fly secrets set GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com" --app kitchen-ai
fly secrets set GOOGLE_CLIENT_SECRET="your-client-secret" --app kitchen-ai

# Allowed emails (comma-separated list)
fly secrets set ALLOWED_EMAILS="user1@gmail.com,user2@company.com,user3@example.com" --app kitchen-ai
```

## Step 3: How It Works

### Server-side (`src/lib/auth.ts`)

The authentication is configured with:

1. **Google OAuth Provider**: Configured with your Google credentials
2. **Email Restriction**: The `mapProfileToUser` function checks if the user's email is in the allowed list
3. **Automatic Account Creation**: When a user signs in with Google for the first time, an account is automatically created

```typescript
socialProviders: {
  google: {
    enabled: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    prompt: 'select_account',
    mapProfileToUser: (profile) => {
      // Check email restrictions in production
      if (process.env.NODE_ENV === 'production' && allowedEmails.length > 0) {
        if (!allowedEmails.includes(profile.email)) {
          throw new Error(`Access restricted. Your email ${profile.email} is not authorized.`)
        }
      }

      return {
        email: profile.email,
        name: profile.name,
        emailVerified: profile.email_verified,
        image: profile.picture,
      }
    },
  },
}
```

### Client-side (`src/routes/login.tsx`)

The login page:

1. Shows a "Sign in with Google" button when Google OAuth is configured
2. Falls back to email/password authentication
3. Handles errors gracefully

## Step 4: Adding/Removing Allowed Emails

To update the list of allowed emails:

```bash
# View current allowed emails
fly secrets list --app kitchen-ai

# Update the list
fly secrets set ALLOWED_EMAILS="email1@gmail.com,email2@company.com,email3@example.com" --app kitchen-ai

# Remove all email restrictions (allow any Google account)
fly secrets unset ALLOWED_EMAILS --app kitchen-ai
```

## Step 5: Testing

### Local Development

1. Google OAuth is disabled by default in development
2. Use email/password authentication with any credentials
3. To test Google OAuth locally, add the environment variables to your local `.env` file

### Production

1. Deploy your application: `fly deploy --app kitchen-ai`
2. Navigate to your app URL
3. Click "Sign in with Google"
4. Select or enter your Google account
5. If your email is in the allowed list, you'll be signed in
6. If not, you'll see an error message

## Security Considerations

1. **Email Verification**: Google OAuth automatically verifies email addresses
2. **Account Linking**: If a user already has an account with the same email, the Google account will be linked to it
3. **Session Management**: Sessions are managed by better-auth with secure cookies
4. **HTTPS Required**: Google OAuth requires HTTPS in production (Fly.io provides this automatically)

## Troubleshooting

### "Access restricted" error

- Check that your email is in the `ALLOWED_EMAILS` list
- Verify the environment variable is set correctly: `fly secrets list --app kitchen-ai`

### Google sign-in button not appearing

- Ensure `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set
- Check the browser console for errors

### Redirect URI mismatch

- Verify the redirect URI in Google Cloud Console matches your domain
- Format should be: `https://your-domain.fly.dev/api/auth/callback/google`

### "Invalid client" error

- Double-check your Client ID and Client Secret
- Ensure they're from the correct Google Cloud project

## Advanced Configuration

### Custom Error Messages

Modify the error message in `mapProfileToUser` to provide more helpful feedback:

```typescript
throw new Error(
  `Please contact admin@company.com to request access for ${profile.email}`
)
```

### Domain-based Restrictions

Instead of individual emails, you can restrict by domain:

```typescript
const allowedDomain = "@company.com"
if (!profile.email.endsWith(allowedDomain)) {
  throw new Error(`Only ${allowedDomain} emails are allowed`)
}
```

### Multiple OAuth Providers

You can add additional providers (GitHub, Microsoft, etc.) following the same pattern in the `socialProviders` configuration.

## Complete Deployment Checklist

- [ ] Create Google OAuth credentials in Google Cloud Console
- [ ] Add redirect URIs for both development and production
- [ ] Set `GOOGLE_CLIENT_ID` secret in Fly.io
- [ ] Set `GOOGLE_CLIENT_SECRET` secret in Fly.io
- [ ] Set `ALLOWED_EMAILS` with comma-separated email list
- [ ] Deploy application with `fly deploy --app kitchen-ai`
- [ ] Test sign-in with an allowed email
- [ ] Test sign-in with a non-allowed email (should be rejected)
- [ ] Verify automatic account creation works on first sign-in
