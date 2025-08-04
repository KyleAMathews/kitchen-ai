# Kitchen AI - Project Architecture Analysis

## Project Overview

Kitchen AI is a modern web application built for managing kitchen ingredients and recipes. The application is designed as a monorepo using SST (Serverless Stack) for deployment, with a React frontend and serverless backend functions. The project implements real-time data synchronization using ElectricSQL and features AI-powered recipe processing capabilities.

## Directory Structure

### Root Level
```
/Users/kylemathews/programs/kitchen-ai/
├── package.json                 # Root package.json with SST dependencies
├── pnpm-workspace.yaml         # PNPM workspace configuration
├── sst.config.ts               # SST deployment configuration
├── migrations/                 # Database migration files
│   └── 001-add-tables.sql     # Initial database schema
├── stacks/                     # SST infrastructure stacks
│   └── spice-photos-stack.ts  # Photo upload infrastructure
└── packages/                   # Monorepo packages
    ├── app/                   # Frontend React application
    ├── functions/             # Backend serverless functions
    └── core/                  # Shared utilities (empty)
```

### Frontend Application (`packages/app/`)
```
packages/app/
├── src/
│   ├── components/            # React components
│   │   ├── recipe-card.tsx
│   │   ├── ingredient-card.tsx
│   │   └── expiration-date-edit.tsx
│   ├── routes/               # Page components
│   │   ├── index.tsx         # Homepage
│   │   ├── recipes.tsx       # Recipe list
│   │   ├── recipe-detail.tsx # Recipe detail view
│   │   ├── ingredients.tsx   # Ingredient list
│   │   └── ingredient-detail.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── use-shapes.ts    # ElectricSQL data hooks
│   ├── generated/           # Generated ElectricSQL client
│   │   └── client/
│   ├── backend/             # Local development backend
│   │   └── compose/         # Docker compose for local PostgreSQL
│   └── static/              # Static assets and fonts
├── package.json
└── vite.config.ts           # Vite build configuration
```

### Backend Functions (`packages/functions/`)
```
packages/functions/
├── src/
│   ├── index.ts             # Main Hono API server
│   ├── recipes.ts           # Recipe processing functions
│   └── create-ingredient.ts # Ingredient creation
└── package.json
```

## Tech Stack Breakdown

### Frontend Stack
- **React 19.1.1** - UI framework
- **TypeScript 5.9.2** - Type safety
- **Vite 7.0.6** - Build tool and dev server
- **TanStack Router 1.130.12** - Type-safe routing
- **Radix UI Themes 3.2.1** - Design system and components
- **ElectricSQL React 1.0.7** - Real-time database synchronization
- **TanStack React DB 0.1.1** - Database query management
- **Clerk React 5.38.1** - Authentication (configured but not fully implemented)

### Backend Stack
- **Hono 4.8.12** - Web framework for Cloudflare Workers
- **OpenAI 5.11.0** - AI integration for recipe processing
- **PostgreSQL** - Database (via Electric)
- **ElectricSQL** - Real-time sync layer
- **Zod 3.25.64** - Schema validation

### Infrastructure & Deployment
- **SST 3.17.10** - Infrastructure as Code framework
- **Cloudflare Workers** - Serverless function runtime
- **AWS S3** - File storage (configured)
- **PostgreSQL** - Database backend
- **Docker** - Local development environment

### Development Tools
- **PNPM** - Package manager with workspace support
- **ESLint & Prettier** - Code formatting and linting
- **TypeScript** - Static type checking

## Key Configuration Files

### SST Configuration (`sst.config.ts`)
```typescript
export default $config({
  app(input) {
    return {
      name: `kitchen-ai`,
      removal: input?.stage === `production` ? `retain` : `remove`,
      home: `aws`,
      providers: {
        aws: { profile: `kyle` },
      },
    }
  },
  async run() {
    // Environment secrets configuration
    const connectionInfo = {
      ELECTRIC_SECRET: new sst.Secret(`ELECTRIC_SECRET`),
      ELECTRIC_ID: new sst.Secret(`ELECTRIC_ID`),
      PGURI: new sst.Secret(`PGURI`),
      PGURI_POOL: new sst.Secret(`PGURI_POOL`),
      OPENAI_KEY: new sst.Secret(`OPENAI_KEY`),
    }

    // Cloudflare Worker for API
    const worker = new sst.cloudflare.Worker(`${$app.name}-worker`, {
      handler: `./packages/functions/src/index.ts`,
      url: true,
      environment: { ...connectionInfo },
    })

    // Static site deployment
    const website = deploySite(connectionInfo, worker)
    
    return {
      website: website.url,
      api: worker.url,
    }
  },
})
```

### Vite Configuration (`packages/app/vite.config.ts`)
- React SWC for fast builds
- Custom typography plugin with Capsize for font metrics
- WASM asset inclusion for ElectricSQL
- Font optimization with GeneralSans and Montserrat

## Database Schema and Models

### Core Tables (from `migrations/001-add-tables.sql`)

#### Users Table
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    avatar_url TEXT
);
```

#### Ingredients System
```sql
CREATE TYPE ingredients_tracking_type AS ENUM ('fill_level', 'count');
CREATE TYPE grocery_section AS ENUM (
    'Produce', 'Deli', 'Bakery', 'Meat_Seafood', 'Dairy_Eggs',
    'Dry__Goods', 'Canned__Foods', 'Spices_Herbs', 'Beverages',
    'Frozen__Foods', 'Oil_Vinegar', 'Other__Aisles'
);

CREATE TABLE ingredients (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    is_reviewed BOOLEAN NOT NULL,
    embedding TEXT NOT NULL,          -- Vector embeddings for AI
    tracking_type ingredients_tracking_type,
    fill_level INTEGER NOT NULL,
    grocery_section grocery_section NOT NULL,
    count INTEGER NOT NULL,
    expiration_date TIMESTAMP WITH TIME ZONE NOT NULL,
    ingredients_photo_uploads_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);
```

#### Photo Upload System
```sql
CREATE TYPE ingredient_photo_upload_state AS ENUM (
    'uploading', 'ai_processing', 'reviewing', 'done'
);

CREATE TABLE ingredients_photo_uploads (
    id UUID PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE,
    state ingredient_photo_upload_state NOT NULL,
    upload_duration_sec FLOAT,
    ai_processing_duration_sec FLOAT,
    photo_url TEXT
);
```

#### Recipe System
```sql
CREATE TABLE recipes (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    user_id TEXT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE recipe_ingredients (
    id UUID PRIMARY KEY,
    listing TEXT NOT NULL,
    extracted_name TEXT NOT NULL,
    embedding TEXT NOT NULL,         -- AI-generated embeddings
    grocery_section grocery_section2 NOT NULL,
    recipe_id UUID NOT NULL REFERENCES recipes(id)
);
```

#### Job Queue System
```sql
CREATE TYPE jobs_state AS ENUM ('working', 'done', 'error');
CREATE TABLE jobs (
    id UUID PRIMARY KEY,
    state jobs_state NOT NULL,
    target_id UUID,
    type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    error JSONB,
    result JSONB
);
```

## API Endpoints and Structure

### Main API Server (`packages/functions/src/index.ts`)

#### Core Endpoints

**GET `/`**
- Simple health check endpoint

**GET `/v1/shape`**
- Proxy for ElectricSQL shape requests
- Handles real-time data synchronization
- Adds authentication headers for Electric service

**POST `/recipes/process`**
- AI-powered recipe processing endpoint
- Uses OpenAI GPT-4o for ingredient extraction
- Implements retry logic with schema validation

#### Recipe Processing Flow
```typescript
const recipeProcessingSchema = z.object({
  pasted: z.string(),
  id: z.string(),
})

// AI function for ingredient extraction
const functions: ZodFunctionDef[] = [{
  name: `get_ingredients`,
  description: `Get ingredients from recipe`,
  schema: z.object({
    name: z.string().describe(`name of the recipe`),
    description: z.string().describe(`Short description`),
    ingredients: z.array(z.object({
      listing: z.string().max(140),
      extracted_name: z.string(),
      grocery_section: z.enum([...]) // Grocery store sections
    }))
  })
}]
```

## Frontend Components and Routing

### Routing Structure (`packages/app/src/router.tsx`)
- **TanStack Router** for type-safe routing
- Route-based code splitting
- Preloading strategies for data fetching

#### Key Routes
- `/` - Homepage with search and ingredient/recipe overview
- `/ingredients` - Ingredient management
- `/ingredients/$id` - Individual ingredient details
- `/recipes` - Recipe listing
- `/recipes/$id` - Recipe details
- `/recipes/new` - Create new recipe
- `/upload-photos` - Photo upload interface
- `/review` - Review AI-processed ingredients

### Component Architecture

#### Data Management (`packages/app/src/hooks/use-shapes.ts`)
```typescript
// ElectricSQL collections for real-time data
export const recipesCollection = createCollection(
  electricCollectionOptions({
    id: `recipes`,
    getKey: (item) => item.id,
    shapeOptions: {
      url: `${API_URL}/v1/shape`,
      params: { table: `recipes` },
    },
  })
)

export const ingredientsCollection = createCollection(
  electricCollectionOptions({
    id: `ingredients`,
    getKey: (item) => item.id,
    shapeOptions: {
      url: `${API_URL}/v1/shape`,
      params: { table: `ingredients` },
      parser: {
        timestamptz: (value: string) => new Date(value),
      },
    },
  })
)
```

#### Component Examples

**Recipe Card** (`packages/app/src/components/recipe-card.tsx`)
- Displays recipe name and last used date
- Links to recipe detail page
- Uses time-ago formatting

**Ingredient Card** (`packages/app/src/components/ingredient-card.tsx`)
- Shows ingredient details and status
- Expiration date management
- Fill level or count tracking

## Authentication Flow

### Clerk Integration
The application is configured to use Clerk for authentication but appears to be in transition:

**Configuration** (`packages/app/src/main.tsx`)
```typescript
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// Currently commented out but ready for activation
```

**Context Setup** (`packages/app/src/context.tsx`)
```typescript
export function ElectricalProvider({ children }) {
  const { getToken, isSignedIn } = useAuth()
  const { user } = useUser()
  
  // JWT token renewal every minute
  // User synchronization with ElectricSQL
  // Automatic login/logout handling
}
```

**Authentication State**
- JWT tokens are refreshed every minute
- User data is synchronized with the database
- ElectricSQL integration requires authenticated tokens

## Deployment Configuration

### SST Deployment Strategy
- **Staging**: Automatic removal of resources
- **Production**: Resource retention policy
- **Multi-provider**: AWS for hosting, Cloudflare for workers

### Environment Variables
- `ELECTRIC_SECRET` - ElectricSQL authentication
- `ELECTRIC_ID` - Electric service identifier  
- `PGURI` / `PGURI_POOL` - PostgreSQL connection strings
- `OPENAI_KEY` - OpenAI API access
- `VITE_API_URL` - Frontend API endpoint

### Domain Configuration
- Production: `kitchen-ai.bricolage.io`
- Staging: `kitchen-ai-stage-{stage}.bricolage.io`
- Cloudflare DNS management

## Docker/Containerization Setup

### Local Development (`packages/app/src/backend/compose/docker-compose.yaml`)
```yaml
services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: ${APP_NAME:-electric}
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: pg_password
    ports:
      - 5432:5432

  electric:
    image: electricsql/electric:latest
    environment:
      DATABASE_URL: postgresql://postgres:pg_password@postgres:5432/electric
      PG_PROXY_PASSWORD: proxy_password
    ports:
      - 3000:3000
    depends_on:
      - postgres
```

**Development Commands**
- `npm run backend:start` - Start local PostgreSQL + Electric
- `npm run backend:down` - Stop and cleanup containers

## Dependencies Analysis

### Critical Production Dependencies

#### Frontend Core
- **@electric-sql/client**: Real-time database synchronization
- **@tanstack/react-router**: Type-safe routing system
- **@tanstack/react-db**: Database query management
- **@radix-ui/themes**: Design system and components
- **@clerk/clerk-react**: Authentication provider

#### Backend Core  
- **hono**: Lightweight web framework for workers
- **openai**: AI integration for recipe processing
- **postgres**: Database client library
- **zod**: Runtime type validation

#### Infrastructure
- **sst**: Serverless deployment framework
- **@aws-sdk/client-s3**: File upload capabilities

### Development Dependencies
- **vite**: Fast build tool and dev server
- **typescript**: Static type checking
- **eslint/prettier**: Code quality tools
- **@vitejs/plugin-react-swc**: Fast React compilation

### Unique Features
- **vite-plugin-capsize-radix**: Custom typography optimization
- **@kylemathews/sync**: Custom synchronization utilities
- **openai-zod-functions**: Type-safe OpenAI function calling

## Current State and Implementation Notes

### Active Features
1. **Real-time Data Sync**: ElectricSQL provides instant updates across clients
2. **AI Recipe Processing**: OpenAI integration for extracting ingredients from pasted recipes
3. **Photo Upload Pipeline**: S3 integration for ingredient photos
4. **Type-Safe Development**: Full TypeScript coverage with Zod validation

### In Progress / Incomplete
1. **Authentication**: Clerk integration is configured but not fully activated
2. **Database Operations**: Some Supabase operations are commented out in favor of Electric
3. **Photo Processing**: AI processing pipeline exists but may need completion

### Architecture Strengths
1. **Modern Stack**: Uses cutting-edge tools like ElectricSQL and TanStack Router
2. **Type Safety**: Comprehensive TypeScript usage throughout
3. **Real-time Sync**: ElectricSQL enables local-first architecture
4. **Serverless Ready**: Cloudflare Workers for global edge deployment
5. **Monorepo Structure**: Clean separation of concerns with PNPM workspaces

This architecture represents a sophisticated, modern web application with real-time capabilities, AI integration, and a focus on developer experience through strong typing and excellent tooling choices.