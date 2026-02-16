# Recetali

## Tech stack

**Frontend + backend**

- **Framework**: Next.JS (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Auth**: NextAuth
- **Architecture**: Server Actions

**Database**

- **Development**: SQLite
- **Production**: Neon (PostgreSQL)
- **ORM**: Prisma

**Why Prisma?**

- Prisma eases many-to-many relationships
- Great PostgreSQL support
- Highly valuated in profesional environments
- Solid migrations

**Hosting**

- **Fronted + backend**: Vercel
- **Database**: Neon
- **Images**: Cloudinary (free plan)

## Database model

**users**

- id (PK)
- firstName
- lastName
- email (unique)
- password (hash)
- role (enum)
- createdAt

**recipes**

- id (PK)
- name
- slug: (unique)
- steps (text)
- imageUrl
- category (enum)
- userId (FK -> users)
- timesDone (default 0)
- createdAt
- updatedAt
- _indexes_:
  - name
  - category
  - slug

**ingredients**

- id (PK)
- name (unique)
- type (enum)
- createdAt

**recipe_ingredients**

- id (PK)
- recipeId (FK -> recipes)
- ingredientId (FK -> ingredients)
- quantity
- unit

**favorites**

- id (PK)
- userId (FK -> users)
- recipeId (FK -> recipes)
- createdAt
- _constrains_:
  - composed unique (userId - recipeId)

## System relationships

- 1 user -> many recipes
- 1 recipe -> many ingredients
- 1 ingredient -> many recipes
- 1 user -> many favorites
- 1 recipe -> many users favorite

## Permisions

**Not logged user** - See recipes - Filter - Search

**Admin user** - CRUD recipe - Manage ingredients - Tag / untag favorites - Its favorites

**Control implemented by** - Middleware - Server actions validation

## Filtering system

The app allows:

- Searching by name
- Filter by category
- Filter by ingredient
- Order by popularity
- Pagination

## Architectural decisions

- Enums in category and type for better consistency and validation
- Slugs: clean and SEO friendly URLs

## Scalability

This model allows to easily add:

- Comments
- Rating
- Public API
- Complex roles
- Dedicated admin dashboard
- Public recipe sharing with SEO
