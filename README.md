# yin
A discord chatbot which supports creating and continuing conversations with several personas

This project uses supabase for deployment, for budgetary concerns.

Support for other cloud providers may get added in the future.

### Reverting Prisma Migrations

```shell
# Step 1: Generate the migration file against your database
npx prisma migrate diff --from-url "{REMOTE_SERVER}" --shadow-database-url "{PROBABLY_LOCAL_POSTGRES_SERVER}" --to-migrations ./prisma/migrations --script > backward.sql
 
# Step 2: Run the migration file against your database
npx prisma db execute --url "{REMOTE_SERVER}" --file backward.sql

CREATE ROLE admin WITH LOGIN PASSWORD '<password within quotes>'
ALTER ROLE admin CREATEDB; 
```