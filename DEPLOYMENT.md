# Deployment Guide for cord.to

This guide walks you through deploying the Domain-Insight application to cord.to using Fly.io.

## Prerequisites

1. **Fly.io account**: Sign up at https://fly.io
2. **Flyctl CLI**: Install from https://fly.io/docs/getting-started/installing-flyctl/
3. **GitHub repo**: Your code must be pushed to GitHub (for CI/CD and deployments)
4. **Domain**: cord.to already registered

## Step 1: Install Flyctl and Authenticate

```bash
# macOS
brew install flyctl

# Linux/Windows or other platforms
curl -L https://fly.io/install.sh | sh

# Add to PATH if needed
export PATH="/home/$(whoami)/.local/bin:$PATH"

# Authenticate with Fly.io
flyctl auth login
```

## Step 2: Provision a PostgreSQL Database

Create a managed PostgreSQL database on Fly.io:

```bash
fly postgres create --name cord-to-db --region iad --initial-cluster-machine-count 1
```

**Save the database credentials!** Fly will output a `DATABASE_URL` similar to:
```
postgres://cord-to_db_user:password@cord-to-db.internal:5432/cord_to_db?sslmode=disable
```

Note: The `.internal` hostname is available inside Fly's private network.

## Step 3: Create the Fly.io App

```bash
cd /path/to/Domain-Insight

# Initialize the app (this uses the existing Dockerfile and fly.toml)
flyctl launch --no-deploy

# When prompted:
# - App name: cord-to (or your preferred name)
# - Postgres: select the database you created (cord-to-db)
# - Deploy now: no (we'll set secrets first)
```

This generates/updates `fly.toml` with the database attachment.

## Step 4: Set Environment Secrets

Set the required environment variables as secrets:

```bash
# Required
flyctl secrets set DATABASE_URL="postgres://cord-to_db_user:password@cord-to-db.internal:5432/cord_to_db?sslmode=disable"
flyctl secrets set LOGO_DEV_API_KEY="your-logo-dev-api-key"

**Note (Logo API key):**
Set `LOGO_DEV_API_KEY` in your production environment to enable the `/api/logo/:domain` endpoint. Without this key the server will return an error for logo requests. Example for Fly:

```bash
flyctl secrets set LOGO_DEV_API_KEY="pk_<your_key_here>"
```

# Optional (Fly.io sets NODE_ENV and PORT automatically)
flyctl secrets set NODE_ENV="production"
```

**Get your LOGO_DEV_API_KEY** from https://logo.dev if you haven't already.

View all secrets:
```bash
flyctl secrets list
```

## Step 5: Run Database Migrations

```bash
# Run migrations on the remote database
flyctl ssh console
npm ci
npm run db:push
exit
```

Or as a one-off command:
```bash
flyctl ssh console --command "npm run db:push"
```

## Step 6: Deploy to Fly.io

```bash
flyctl deploy
```

This will:
1. Build the Docker image using your `Dockerfile`
2. Push it to Fly's registry
3. Deploy to the configured region (iad = Northern Virginia)
4. Start the app and run health checks

Monitor the deployment:
```bash
flyctl status
flyctl logs
```

## Step 7: Configure DNS for cord.to

### Option A: Transfer Domain to Fly.io (Easiest)

```bash
# Create the DNS record on Fly
flyctl domains create cord.to

# Follow Fly's instructions to update your domain registrar's nameservers
```

### Option B: Keep Registrar, Add CNAME Records (Recommended)

1. Go to your domain registrar's DNS settings
2. Add these records:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: `cord-to.fly.dev`
   - **TTL**: 3600

3. For the root domain (`cord.to`), use:
   - **Type**: ALIAS or ANAME (if your registrar supports it)
   - **Name**: @ (root)
   - **Value**: `cord-to.fly.dev`
   - **TTL**: 3600

   If your registrar doesn't support ALIAS/ANAME, see Step 7C.

### Option C: Use A Records (Alternative)

Get Fly's IP address:
```bash
flyctl ips list
```

Then add to your DNS:
- **Type**: A
- **Name**: @ (root)
- **Value**: (the IPv4 address from flyctl ips list)
- **TTL**: 3600

Wait for DNS propagation (5-30 minutes).

## Step 8: Verify the Deployment

```bash
# Check app status
flyctl status

# View logs
flyctl logs

# Test the app
curl https://cord.to/
curl https://cord.to/api/registrations/today-count

# Test registration endpoint
curl -X POST https://cord.to/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

## Step 9: Monitor & Update

### View Logs
```bash
flyctl logs
flyctl logs --no-tail  # Past logs only
```

### Scale Replicas
```bash
flyctl scale count 2  # 2 instances
```

### Redeploy After Code Changes
```bash
git push origin main
flyctl deploy
```

### Manage Secrets
```bash
flyctl secrets list
flyctl secrets set LOGO_DEV_API_KEY="new-key"
flyctl secrets unset OLD_VAR
```

## Troubleshooting

### App Won't Start
```bash
flyctl logs --all
```
Check for:
- Missing `DATABASE_URL` env var
- Migrations not run
- Port already in use

### Database Connection Issues
```bash
# Verify the database is running
flyctl postgres status

# Check credentials in secrets
flyctl secrets list
```

### DNS Not Resolving
```bash
dig cord.to
nslookup cord.to

# If using CNAME, verify:
dig www.cord.to CNAME
```

### Health Check Failing
Fly checks `GET /` by default (configurable in `fly.toml`). Verify:
```bash
curl -v http://localhost:5000/
```

## Rollback to Previous Deployment

```bash
flyctl releases
flyctl releases rollback
```

## Additional Resources

- Fly.io Docs: https://fly.io/docs/
- Node.js on Fly: https://fly.io/docs/languages-and-frameworks/nodejs/
- PostgreSQL on Fly: https://fly.io/docs/postgres/
- Domain Management: https://fly.io/docs/domains-and-certificates/

## Summary of Commands

```bash
# Quick deployment checklist
flyctl auth login
fly postgres create --name cord-to-db --region iad
flyctl launch --no-deploy
flyctl secrets set DATABASE_URL="..." LOGO_DEV_API_KEY="..."
flyctl ssh console --command "npm run db:push"
flyctl deploy
flyctl domains create cord.to
# Update DNS at registrar
curl https://cord.to/
```
