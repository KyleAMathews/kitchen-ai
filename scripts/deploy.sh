#!/bin/bash

# Deploy script for Kitchen AI to Fly.io
# Usage: ./scripts/deploy.sh [app-name]

set -e  # Exit on error

# Configuration
APP_NAME=${1:-kitchen-ai}
DEPLOY_ENV=${DEPLOY_ENV:-production}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Deploying $APP_NAME to Fly.io${NC}"
echo "Environment: $DEPLOY_ENV"
echo ""

# Check if fly CLI is installed
if ! command -v fly &> /dev/null; then
    echo -e "${RED}❌ Fly CLI is not installed${NC}"
    echo "Install it with: brew install flyctl"
    exit 1
fi

# Check if logged in to Fly
if ! fly auth whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Fly${NC}"
    echo "Running: fly auth login"
    fly auth login
fi

# Check if app exists
if ! fly apps list | grep -q "$APP_NAME"; then
    echo -e "${YELLOW}⚠️  App '$APP_NAME' does not exist${NC}"
    echo "Would you like to create it? (y/n)"
    read -r response
    if [[ "$response" == "y" ]]; then
        fly apps create "$APP_NAME"
        echo -e "${GREEN}✅ App created${NC}"
        echo ""
        echo -e "${YELLOW}⚠️  Don't forget to set secrets before deploying:${NC}"
        echo "  fly secrets set DATABASE_URL='...' --app $APP_NAME"
        echo "  fly secrets set ELECTRIC_SERVICE_URL='...' --app $APP_NAME"
        echo "  fly secrets set BETTER_AUTH_SECRET='...' --app $APP_NAME"
        echo "  fly secrets set OPENAI_API_KEY='...' --app $APP_NAME"
        echo ""
        echo "Press Enter when ready to continue..."
        read -r
    else
        exit 1
    fi
fi

# Run linter before deploy
echo -e "${YELLOW}📝 Running linter...${NC}"
pnpm lint || {
    echo -e "${RED}❌ Linting failed. Fix errors before deploying.${NC}"
    exit 1
}

# Build locally first to catch errors early
echo -e "${YELLOW}🔨 Testing build locally...${NC}"
pnpm run build || {
    echo -e "${RED}❌ Build failed. Fix errors before deploying.${NC}"
    exit 1
}

# Deploy to Fly
echo -e "${GREEN}🚀 Deploying to Fly...${NC}"
fly deploy --app "$APP_NAME"

# Check deployment status
echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Useful commands:"
echo "  fly open --app $APP_NAME        # Open in browser"
echo "  fly logs --app $APP_NAME        # View logs"
echo "  fly status --app $APP_NAME      # Check status"
echo "  fly ssh console --app $APP_NAME # SSH into container"