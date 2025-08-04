# Kitchen AI Migration Plan: From SST Monorepo to TanStack Start

## Executive Summary

This document outlines the migration plan to transform Kitchen AI from a complex SST-based monorepo architecture to a simplified TanStack Start application following the Electric TanStack starter pattern. This migration will significantly simplify the codebase while maintaining all core functionality.

## Architecture Comparison

### Current Architecture (Kitchen AI)
- **Structure**: PNPM monorepo with multiple packages
- **Deployment**: SST framework with AWS/Cloudflare hybrid
- **Authentication**: Clerk (configured but not active)
- **API Layer**: Hono on Cloudflare Workers with direct endpoints
- **Frontend**: React + TanStack Router + Radix UI
- **Database**: PostgreSQL + ElectricSQL with direct shape access
- **Build System**: Separate Vite configs for frontend/backend

### Target Architecture (Electric TanStack Starter)
- **Structure**: Single package application
- **Deployment**: TanStack Start deployed to Cloudflare Workers
- **Authentication**: better-auth with built-in session management
- **API Layer**: tRPC for type-safe API with optimistic updates
- **Frontend**: TanStack Start with file-based routing
- **Database**: PostgreSQL + ElectricSQL with permission-based shapes
- **Build System**: Single Vite config with TanStack Start

## Key Benefits of Migration

1. **Simplified Architecture**: Single package vs monorepo reduces complexity
2. **Better Type Safety**: tRPC provides end-to-end type safety vs manual endpoint typing
3. **Improved DX**: File-based routing and integrated dev server
4. **Optimistic Updates**: Built-in optimistic mutations with TanStack DB collections
5. **Better Auth**: better-auth provides more modern authentication patterns
6. **Reduced Dependencies**: Eliminate SST, Clerk, and Express dependencies
7. **Easier Deployment**: Single build target for Cloudflare Workers

## Phase 1: Project Structure Transformation

### 1.1 Create New Project Structure
```bash
# Target structure after migration
kitchen-ai/
├── package.json                     # Single package.json
├── vite.config.ts                   # TanStack Start configuration
├── tsconfig.json                    # TypeScript configuration
├── docker-compose.yaml              # PostgreSQL + Electric services
├── drizzle.config.ts                # Database configuration
├── Caddyfile                        # HTTPS proxy for development
├── src/
│   ├── db/                          # Database layer
│   │   ├── schema.ts                # Kitchen AI schema adapted
│   │   ├── auth-schema.ts           # Authentication tables
│   │   └── connection.ts            # Database connection
│   ├── lib/                         # Core libraries
│   │   ├── auth.ts                  # better-auth server config
│   │   ├── auth-client.ts           # better-auth client
│   │   ├── trpc.ts                  # tRPC server setup
│   │   ├── trpc-client.ts           # tRPC client config
│   │   ├── collections.ts           # TanStack DB collections
│   │   └── trpc/                    # tRPC route handlers
│   ├── routes/                      # File-based routing
│   │   ├── __root.tsx               # Root layout
│   │   ├── _authenticated.tsx       # Auth layout
│   │   ├── _authenticated/          # Protected routes
│   │   │   ├── index.tsx            # Dashboard
│   │   │   ├── ingredients/         # Ingredient routes
│   │   │   ├── recipes/             # Recipe routes
│   │   │   └── upload-photos.tsx    # Photo upload
│   │   ├── login.tsx                # Authentication
│   │   └── api/                     # API routes
│   ├── components/                  # React components (migrate existing)
│   └── styles.css                   # Global styles
└── public/                          # Static assets
```

**Tasks:**
- [ ] Create new root `package.json` combining all dependencies
- [ ] Set up TanStack Start configuration in `vite.config.ts`
- [ ] Create Docker Compose file for local development
- [ ] Copy Caddy setup from Electric starter (`Caddyfile` and `src/vite-plugin-caddy.ts`)
- [ ] Configure TypeScript for new structure

### 1.2 Dependency Migration

**Remove:**
- SST framework (`sst`, `@sst/*`)
- Clerk authentication (`@clerk/clerk-react`)
- Express/Hono for separate backend
- Monorepo tooling (`pnpm-workspace.yaml`)

**Add:**
- TanStack Start ecosystem (`@tanstack/react-start`, `@tanstack/react-router`)
- better-auth for authentication
- tRPC for API layer (`@trpc/client`, `@trpc/server`)
- Drizzle ORM for database operations
- TanStack DB for local collections

**Migrate:**
- Keep ElectricSQL client and collections
- Keep React, TypeScript, Vite
- Keep Radix UI components
- Keep OpenAI integration (move to tRPC)

## Phase 2: Database Schema Migration

### 2.1 Convert to Drizzle Schema

**Current Schema Location:** `migrations/001-add-tables.sql`
**Target Location:** `src/db/schema.ts`

#### Key Schema Adaptations

**Users Table Enhancement:**
```typescript
// Add better-auth compatibility
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  avatar_url: text("avatar_url"), // Keep existing field
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Add sessions table for better-auth
export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
})
```

**Ingredients Table with User Ownership:**
```typescript
export const ingredients = pgTable("ingredients", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  is_reviewed: boolean("is_reviewed").notNull().default(false),
  embedding: text("embedding").notNull(),
  tracking_type: trackingTypeEnum("tracking_type"),
  fill_level: integer("fill_level").notNull().default(0),
  grocery_section: grocerySectionEnum("grocery_section").notNull(),
  count: integer("count").notNull().default(0),
  expiration_date: timestamp("expiration_date", { withTimezone: true }).notNull(),
  ingredients_photo_uploads_id: uuid("ingredients_photo_uploads_id").references(() => ingredientsPhotoUploads.id),
  user_id: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }), // Add user ownership
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})
```

**Tasks:**
- [ ] Convert SQL schema to Drizzle TypeScript definitions
- [ ] Add user ownership to all relevant tables
- [ ] Create auth schema for better-auth compatibility
- [ ] Set up database connection and migrations
- [ ] Create permission triggers for ElectricSQL shapes

### 2.2 ElectricSQL Shape Configuration

**Current:** Direct table access with authentication proxy  
**Target:** Permission-based shapes with user filtering

```typescript
// Example: User-filtered ingredients shape
const ingredientsShapeConfig = {
  url: "/api/ingredients",
  params: {
    table: "ingredients",
    user_id: async () => authClient.getSession().then(s => s.data!.user.id),
  },
  // Filter: user_id = current_user OR shared with user
  where: `user_id = ? OR ? = ANY(shared_user_ids)`
}
```

## Phase 3: Authentication Migration

### 3.1 Remove Clerk Integration

**Files to Remove/Modify:**
- Remove Clerk provider from `packages/app/src/main.tsx`
- Remove Clerk context from `packages/app/src/context.tsx`
- Remove Clerk environment variables

### 3.2 Implement better-auth

**Server Configuration (`src/lib/auth.ts`):**
```typescript
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: { users, sessions },
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  trustedOrigins: [
    "https://kitchen-ai.localhost",
    "https://kitchen-ai.bricolage.io",
  ],
})
```

**Client Setup (`src/lib/auth-client.ts`):**
```typescript
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields()],
})
```

**Tasks:**
- [ ] Set up better-auth server configuration
- [ ] Create authentication API routes
- [ ] Implement login/signup pages
- [ ] Add session management to route layouts
- [ ] Migrate user data to new auth tables

## Phase 4: API Layer Migration (Express/Hono → tRPC)

### 4.1 Convert Endpoints to tRPC Procedures

**Current API Structure:**
- `GET /` - Health check
- `GET /v1/shape` - ElectricSQL proxy
- `POST /recipes/process` - OpenAI recipe processing

**Target tRPC Structure:**
```typescript
export const appRouter = router({
  ingredients: ingredientsRouter,
  recipes: recipesRouter,
  upload: uploadRouter,
  ai: aiRouter,
})

// Example: Recipe processing router
export const recipesRouter = router({
  process: authedProcedure
    .input(z.object({
      pasted: z.string(),
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // OpenAI processing logic here
      // Return with txid for optimistic updates
    }),

  create: authedProcedure
    .input(createRecipeSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        const txid = await generateTxId(tx)
        const [newRecipe] = await tx.insert(recipes).values({
          ...input,
          user_id: ctx.session.user.id,
        }).returning()
        return { recipe: newRecipe, txid }
      })
      return result
    }),
})
```

**Tasks:**
- [ ] Create tRPC router structure
- [ ] Convert recipe processing endpoint to tRPC procedure
- [ ] Add input/output schemas with Zod
- [ ] Implement authentication middleware
- [ ] Add transaction ID support for optimistic updates

### 4.2 ElectricSQL Shape API Routes

Convert proxy endpoint to permission-based shape routes:

```typescript
// src/routes/api/ingredients.ts
export const serve = async ({ request }: { request: Request }) => {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return new Response("Unauthorized", { status: 401 })

  const url = new URL(request.url)
  const originUrl = new URL("http://localhost:3000/v1/shape")
  
  // Copy Electric params
  url.searchParams.forEach((value, key) => {
    if (["live", "table", "handle", "offset", "cursor"].includes(key)) {
      originUrl.searchParams.set(key, value)
    }
  })

  originUrl.searchParams.set("table", "ingredients")
  originUrl.searchParams.set("where", `user_id = '${session.user.id}'`)

  const response = await fetch(originUrl)
  return new Response(response.body, { 
    status: response.status, 
    headers: response.headers 
  })
}
```

## Phase 5: Frontend Migration

### 5.1 TanStack Start Integration

**Current:** Separate React app with Vite  
**Target:** TanStack Start with file-based routing

**Key Changes:**
- Move from `packages/app/src/routes/` to `src/routes/`
- Convert route components to TanStack Start format
- Add `__root.tsx` with HTML document structure
- Create authenticated layout with sidebar navigation

### 5.2 Component Migration Strategy

**Components to Migrate (keep existing):**
- `recipe-card.tsx` → Move to `src/components/`
- `ingredient-card.tsx` → Move to `src/components/`
- `expiration-date-edit.tsx` → Move to `src/components/`

**Routes to Convert:**
```
Current Structure → Target Structure
packages/app/src/routes/index.tsx → src/routes/_authenticated/index.tsx
packages/app/src/routes/recipes.tsx → src/routes/_authenticated/recipes/index.tsx
packages/app/src/routes/recipe-detail.tsx → src/routes/_authenticated/recipes/$id.tsx
packages/app/src/routes/ingredients.tsx → src/routes/_authenticated/ingredients/index.tsx
packages/app/src/routes/ingredient-detail.tsx → src/routes/_authenticated/ingredients/$id.tsx
```

### 5.3 Data Fetching Migration

**Current:** Direct ElectricSQL collections with custom hooks  
**Target:** TanStack DB collections with optimistic updates

```typescript
// Current approach in use-shapes.ts
export const recipesCollection = createCollection(
  electricCollectionOptions({
    id: `recipes`,
    // ... basic config
  })
)

// Target approach with optimistic updates
export const recipesCollection = createCollection(
  electricCollectionOptions({
    id: "recipes",
    shapeOptions: {
      url: "/api/recipes",
      params: {
        table: "recipes",
        user_id: async () => authClient.getSession().then(s => s.data!.user.id),
      },
    },
    schema: selectRecipeSchema,
    getKey: (item) => item.id,
    
    // Optimistic mutation handlers
    onInsert: async ({ transaction }) => {
      const { modified: newRecipe } = transaction.mutations[0]
      const result = await trpc.recipes.create.mutate(newRecipe)
      return { txid: result.txid }
    },
    
    onUpdate: async ({ transaction }) => {
      const { modified: updatedRecipe } = transaction.mutations[0]
      const result = await trpc.recipes.update.mutate({
        id: updatedRecipe.id,
        data: updatedRecipe,
      })
      return { txid: result.txid }
    },
  })
)
```

**Tasks:**
- [ ] Convert existing collections to optimistic update pattern
- [ ] Migrate all route components to TanStack Start format
- [ ] Update data fetching to use tRPC mutations
- [ ] Test optimistic updates for all operations

## Phase 6: Docker & Development Environment

### 6.1 Local Development Setup

**Current:** Custom Docker Compose in `packages/app/src/backend/compose/`  
**Target:** Root-level Docker Compose with Caddy

```yaml
# docker-compose.yaml
services:
  postgres:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: kitchen_ai
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports: ["54321:5432"]
    command: ["-c", "wal_level=logical"]
    volumes:
      - postgres_data:/var/lib/postgresql/data

  electric:
    image: electricsql/electric:latest
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/kitchen_ai
      ELECTRIC_INSECURE: true
    ports: ["3000:3000"]
    depends_on: [postgres]

volumes:
  postgres_data:
```

**Caddy Configuration:**
```caddyfile
kitchen-ai.localhost {
  reverse_proxy localhost:5173
  encode { gzip }
}
```

### 6.2 Development Scripts

```json
{
  "scripts": {
    "dev": "docker compose up -d && vite dev",
    "build": "vite build",
    "start": "node .output/server/index.mjs",
    "db:migrate": "drizzle-kit migrate",
    "db:generate": "drizzle-kit generate:pg",
    "db:studio": "drizzle-kit studio"
  }
}
```

## Phase 7: Deployment Migration

### 7.1 Remove SST Infrastructure

**Files to Remove:**
- `sst.config.ts`
- `stacks/spice-photos-stack.ts`
- All SST-related dependencies and configs

### 7.2 Cloudflare Workers Deployment

**Current:** SST managed deployment  
**Target:** Direct Cloudflare Workers deployment with TanStack Start

```bash
# New deployment process
npm run build
npx wrangler deploy
```

**Wrangler Configuration (`wrangler.toml`):**
```toml
name = "kitchen-ai"
main = ".output/server/index.mjs"
compatibility_date = "2024-01-01"

[vars]
ELECTRIC_URL = "https://your-electric-instance.com"
DATABASE_URL = "postgresql://..."

[[env.production.vars]]
BETTER_AUTH_SECRET = "..."
```

## Phase 8: Migration Execution Plan

### 8.1 Pre-Migration Preparation
- [ ] **Backup current database** - Export all data
- [ ] **Document current API contracts** - Ensure no breaking changes
- [ ] **Create feature parity checklist** - Verify all functionality works
- [ ] **Set up new development environment** - Test Docker Compose setup

### 8.2 Migration Steps (in order)

#### Step 1: Project Setup (1-2 days)
- [ ] Create new project structure in separate branch
- [ ] Set up package.json with new dependencies
- [ ] Configure TanStack Start and Vite
- [ ] Set up Docker Compose for development

#### Step 2: Database Migration (2-3 days)
- [ ] Convert SQL schema to Drizzle
- [ ] Add user ownership and permissions
- [ ] Set up database connection and migrations
- [ ] Test schema with sample data

#### Step 3: Authentication Setup (1-2 days)
- [ ] Configure better-auth server and client
- [ ] Create login/signup pages
- [ ] Set up session management
- [ ] Test authentication flow

#### Step 4: API Migration (3-4 days)
- [ ] Set up tRPC routers and procedures
- [ ] Convert recipe processing endpoint
- [ ] Create ElectricSQL shape API routes
- [ ] Test all API functionality

#### Step 5: Frontend Migration (4-5 days)
- [ ] Convert routes to TanStack Start format
- [ ] Migrate all components
- [ ] Set up optimistic collections
- [ ] Test all user interactions

#### Step 6: Integration Testing (2-3 days)
- [ ] End-to-end testing of all features
- [ ] Performance testing with real data
- [ ] Mobile responsiveness testing
- [ ] Cross-browser compatibility

#### Step 7: Deployment Setup (1-2 days)
- [ ] Configure Cloudflare Workers deployment
- [ ] Set up production environment variables
- [ ] Test production build and deployment
- [ ] Configure domain and SSL

#### Step 8: Data Migration (1 day)
- [ ] Export data from current system
- [ ] Import data into new system
- [ ] Verify data integrity
- [ ] Update user authentication records

### 8.3 Rollback Plan
- Keep current system running during migration
- Use feature flags to gradually migrate users
- Maintain database sync between old and new systems during transition
- Have rollback scripts ready to revert to SST if needed

## Phase 9: Post-Migration Optimization

### 9.1 Performance Optimization
- [ ] Bundle size analysis and optimization
- [ ] ElectricSQL sync performance tuning
- [ ] Cloudflare Workers optimization
- [ ] Database query optimization

### 9.2 Documentation Updates
- [ ] Update README with new development setup
- [ ] Document new API endpoints and tRPC procedures
- [ ] Create deployment guide for Cloudflare Workers
- [ ] Update architecture documentation

### 9.3 Monitoring and Maintenance
- [ ] Set up error tracking and monitoring
- [ ] Configure logging for debugging
- [ ] Set up automated testing pipeline
- [ ] Plan regular dependency updates

## Risk Assessment and Mitigation

### High Risk Areas
1. **Data Migration**: Complex schema changes with user data
   - **Mitigation**: Extensive testing with data backups and rollback plan

2. **Authentication Changes**: Moving from Clerk to better-auth
   - **Mitigation**: Gradual migration with user session preservation

3. **Real-time Sync**: ElectricSQL configuration changes
   - **Mitigation**: Thorough testing of sync behavior and conflict resolution

### Medium Risk Areas
1. **API Contract Changes**: Moving from REST to tRPC
   - **Mitigation**: Maintain backward compatibility during transition

2. **Frontend Routing**: TanStack Router file-based routing
   - **Mitigation**: URL structure preservation and redirect rules

### Low Risk Areas
1. **Component Migration**: Most components can be moved as-is
2. **Styling**: Radix UI and CSS can remain largely unchanged
3. **Build Process**: Vite configuration is similar

## Success Metrics

### Technical Metrics
- [ ] **Build Time**: Reduce build time by >30% (single package vs monorepo)
- [ ] **Bundle Size**: Maintain or reduce total bundle size
- [ ] **Type Safety**: 100% TypeScript coverage with tRPC end-to-end types
- [ ] **Development Speed**: Faster hot reload and development server startup

### Functional Metrics
- [ ] **Feature Parity**: 100% of current features working
- [ ] **Performance**: No regression in app performance
- [ ] **User Experience**: Seamless transition for existing users
- [ ] **Developer Experience**: Improved development workflow

### Business Metrics
- [ ] **Deployment Simplicity**: Single command deployment
- [ ] **Maintenance Overhead**: Reduced complexity for future development
- [ ] **Cost Optimization**: Simplified infrastructure costs
- [ ] **Team Velocity**: Faster feature development after migration

## Conclusion

This migration plan transforms Kitchen AI from a complex SST monorepo to a streamlined TanStack Start application. The key benefits include:

- **Simplified Architecture**: Single package vs monorepo
- **Better Type Safety**: End-to-end types with tRPC
- **Improved Developer Experience**: File-based routing and integrated dev server
- **Modern Authentication**: better-auth instead of Clerk
- **Optimistic Updates**: Better user experience with instant feedback

The migration is estimated to take **15-20 days** of development time with proper testing and can be executed with minimal downtime using a gradual migration approach.

The risk is manageable with proper backup strategies and rollback plans, while the long-term benefits significantly outweigh the migration effort through reduced complexity and improved maintainability.