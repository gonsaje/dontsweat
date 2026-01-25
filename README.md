This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Schema

This schema is intentionally designed with **clear separation of concerns** between identity, tenancy, access control, and domain data. The goal is to support a real multi-tenant training system while preserving immutable workout history and allowing future expansion (client logins, multiple trainers, analytics).

### Core Principles

1. **All data belongs to a tenant (`Organization`).**
   - The organization is the primary data boundary. Clients, templates, and sessions are always scoped to an org.

2. **Identity is separate from domain data.**
   - A `User` represents a person who can log in.
   - A `Client` represents a training record and may exist without a login.

3. **Access control is modeled explicitly via a join table (`Membership`).**
   - Roles are not stored on users directly because roles depend on the organization context.

4. **Workout history is immutable.**
   - Templates define plans. Assignments copy those plans into session instances so past workouts never change when templates are edited.

5. **Public access is capability-based.**
   - Share links use unguessable tokens and grant read-only access without authentication.

### Entity Responsibilities

#### Identity

- **`User`**
  - Represents a person who can authenticate.
  - Stores identity data only (email, name).
  - Can belong to multiple organizations.
  - May optionally be linked to a client record.

#### Tenant

- **`Organization`**
  - Represents a tenant / gym / training group.
  - Owns all domain data (clients, templates, sessions).
  - Serves as the primary data partition.

#### Access Control

- **`Membership`**
  - Join table between `User` and `Organization`.
  - Stores role information (`OWNER`, `TRAINER`, `STAFF`, `CLIENT`).
  - A single user can hold multiple roles within the same organization.
  - Enables scenarios where a user is both a trainer and a client.

#### Domain Actor

- **`Client`**
  - Represents a person being trained.
  - Always belongs to an organization.
  - Can exist without a login.
  - Can optionally be linked to a `User` account.
  - Supports archiving instead of deletion.

#### Plans (Reusable Workouts)

- **`SessionTemplate`**
  - Defines a reusable workout plan.
  - Owned by an organization.

- **`TemplateExercise`**
  - Exercises that belong to a template.
  - Ordered explicitly via `sortOrder`.

#### History (Immutable Assignments)

- **`SessionInstance`**
  - A scheduled instance of a workout for a client on a specific date.
  - Optionally references the originating template.
  - Preserved even if the template is deleted.

- **`SessionExercise`**
  - A snapshot copy of exercises at assignment time.
  - Stores both planned values and actual results.
  - Ensures workout history never mutates.

### Design Guarantees

- **Multi-tenant safe**: All domain data is scoped to an organization.
- **Role-flexible**: Users can have multiple roles per organization.
- **Client-login optional**: Clients do not require accounts.
- **History-safe**: Editing templates never affects past sessions.
- **Future-proof**: Supports client portals, multiple trainers, analytics, and auditing.

### Constraints & Indexing

- Composite uniqueness is used where tenancy matters (e.g. client ↔ user per org).
- Foreign keys are indexed for common access patterns.
- Cascade deletes are used for true ownership.
- `SetNull` is used where history must be preserved.
- Share links are enforced via unique, unguessable tokens.

---
