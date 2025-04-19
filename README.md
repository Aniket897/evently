# 🔐 Next.js App with NextAuth, Tailwind CSS, and Prisma

This is a full-stack application built with **Next.js (App Router)**, **NextAuth.js** for authentication, **Tailwind CSS** for styling, and **Prisma** for database ORM.

---

## 🚀 Tech Stack

- **Next.js** (App Router)
- **NextAuth.js**
- **Tailwind CSS**
- **Prisma**
- **PostgreSQL / Mysql** (or any supported Prisma database)

---

## 📂 Folder Structure (No `src`, using `/app`)

```
📁 app
│   ├── api
│   │   └── auth
│   │   │   └── [...nextauth]          # NextAuth API route
│       ├── login                      # Login page
│   ├── dashboard                      # Protected routes
│   └── page.tsx                       # Home page
│
📁 components                          # Reusable UI components
📁 lib                                 # Helpers, db, auth utils
│   ├── auth.ts                        # NextAuth config
│   └── prisma.ts                      # Prisma client
├── .env                               # Local environment variables
├── tailwind.config.ts                 # Tailwind config
├── tsconfig.json                      # TypeScript config
├── prisma
│   └── schema.prisma                  # Prisma schema
├── package.json
└── README.md
```

---

## 🛠️ Local Development Setup

### 1. **Clone the Repository**

```bash
git clone https://github.com/Aniket897/evently
cd evently
```

### 2. **Install Dependencies**

```bash
npm install
# or
yarn install
```

### 3. **Setup Environment Variables**

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/mydb
NEXTAUTH_SECRET=your-secret
```

> Replace values accordingly.

### 4. **Generate Prisma Client & Migrate**

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. **Run the Development Server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication

- Uses **NextAuth.js** with credential support.
- Configure providers in `lib/auth.ts`.

---

## 🎨 Styling

- Styled with **Tailwind CSS**.
- Pre-configured `tailwind.config.ts` and `postcss.config.js`.

---

## 🧩 Prisma ORM

- Prisma handles database models and queries.
- Modify the schema in `prisma/schema.prisma` and run:

```bash
npx prisma migrate dev --name your-migration-name
```

---

## 📦 Deployment

Supports deployment on **Vercel**, **Railway**, **Render**, etc.  
Ensure you set the same `.env` variables in the deployment environment.

---
