# Deploying to Fly.io

## Quick Start (First Deploy)

```bash
# 1. Install Fly CLI and login
brew install flyctl
fly auth login

# 2. Create app (one-time)
fly apps create kitchen-ai  # Choose your app name

# 3. Set secrets (one-time)
fly secrets set DATABASE_URL="postgresql://user:pass@host:5432/db" --app kitchen-ai
fly secrets set ELECTRIC_SOURCE_ID="your-electric-source-id" --app kitchen-ai
fly secrets set ELECTRIC_SOURCE_SECRET="your-electric-source-secret" --app kitchen-ai
fly secrets set BETTER_AUTH_SECRET="$(openssl rand -hex 32)" --app kitchen-ai
fly secrets set OPENAI_API_KEY="sk-..." --app kitchen-ai

# 4. Deploy!
fly deploy --app kitchen-ai

# 5. Open your app
fly open --app kitchen-ai
```

## Prerequisites

1. Install Fly CLI: `brew install flyctl` (or see https://fly.io/docs/hands-on/install-flyctl/)
2. Sign up/login: `fly auth login`

## Initial Setup

1. Create your Fly app (one-time setup):

```bash
fly apps create kitchen-ai  # Replace with your desired app name
```

2. Create a Postgres database on Fly:

```bash
fly postgres create --name kitchen-ai-db
fly postgres attach kitchen-ai-db --app kitchen-ai
```

This will automatically set the `DATABASE_URL` secret in your app.

3. Set up required secrets/environment variables:

```bash
# Database URL (required - your external Postgres)
fly secrets set DATABASE_URL="postgresql://user:password@host:5432/dbname" --app kitchen-ai

# Electric Cloud authentication (required - from Electric Cloud dashboard)
fly secrets set ELECTRIC_SOURCE_ID="your-electric-source-id" --app kitchen-ai
fly secrets set ELECTRIC_SOURCE_SECRET="your-electric-source-secret" --app kitchen-ai

# Auth secret (required - generate secure random string)
fly secrets set BETTER_AUTH_SECRET="$(openssl rand -hex 32)" --app kitchen-ai

# OpenAI API key (required for AI recipe features)
fly secrets set OPENAI_API_KEY="sk-..." --app kitchen-ai
# Or use OPENAI_KEY if you prefer
fly secrets set OPENAI_KEY="sk-..." --app kitchen-ai

# Optional: Production URL for auth callbacks
fly secrets set PRODUCTION_URL="https://kitchen-ai.fly.dev" --app kitchen-ai
fly secrets set AUTH_URL="https://kitchen-ai.fly.dev" --app kitchen-ai
```

## Deployment

Deploy your application:

```bash
fly deploy --app kitchen-ai
```

## Post-Deployment

1. Check deployment status:

```bash
fly status --app kitchen-ai
```

2. View logs:

```bash
fly logs --app kitchen-ai
```

3. SSH into the container (for debugging):

```bash
fly ssh console --app kitchen-ai
```

4. Scale to zero configuration is already set in fly.toml:

- `auto_stop_machines = true`
- `auto_start_machines = true`
- `min_machines_running = 0`

The app will automatically scale down to zero when not in use and start up when requests come in.

## Custom Domain (Optional)

1. Add a custom domain:

```bash
fly certs add yourdomain.com --app kitchen-ai
```

2. Update DNS records as instructed by Fly

## Database Migrations

Migrations run automatically on deploy via the `release_command` in fly.toml.

To run migrations manually:

```bash
fly ssh console --app kitchen-ai -C "pnpm run migrate"
```

## Monitoring

View metrics and monitoring:

```bash
fly dashboard --app kitchen-ai
```

## Troubleshooting

If deployment fails:

1. Check logs: `fly logs --app kitchen-ai`
2. Verify secrets are set: `fly secrets list --app kitchen-ai`
3. Test build locally: `docker build -t kitchen-ai .`
4. Run locally: `docker run -p 3000:3000 kitchen-ai`
