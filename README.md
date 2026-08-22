# Mahamudul Hasan — Next.js Portfolio CMS

## Run locally

1. Install Node.js 20+
2. Extract this folder.
3. Run:

```bash
npm install
```

Windows:
```bash
copy .env.example .env
```

Mac/Linux:
```bash
cp .env.example .env
```

Then:

```bash
npm run db:push
npm run db:seed
npm run dev
```

Open http://localhost:3000

Admin: http://localhost:3000/login

Default:
- Email: admin@example.com
- Password: admin123

Change the credentials in `.env` before public deployment.

This is a local-first production architecture starter: SQLite is used so it runs immediately. For launch, move the database to PostgreSQL, add Cloudinary/S3 for media, and harden authentication/rate limiting.
