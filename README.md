# Admin Backend (NestJS + AdminJS)

This is a progressive [Node.js](http://nodejs.org) backend application built with [NestJS](https://nestjs.com/), [TypeORM](https://typeorm.io/), and integrated with [AdminJS](https://adminjs.co/) for an instant administrative interface.

## 🚀 Features

- **AdminJS Integration**: Instant UI for managing database resources.
- **PostgreSQL Support**: robust data persistence using TypeORM.
- **Automatic Seeding**: Automatically creates 11 admin accounts on the first run.
- **UUID Support**: Uses UUIDs for better database security.
- **Custom Body Parsing**: Specialized middleware to ensure AdminJS and REST APIs work together seamlessly.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) database

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/belalhossain22000/adminjs-nestjs.git
   cd admin-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## ⚙️ Configuration

Open `src/app.module.ts` and update the `TypeOrmModule.forRoot` configuration with your database credentials:

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  entities: [User, Admin],
  synchronize: true, // Auto-creates tables (disable for production)
}),
```

## 🏃 Running the Application

```bash
# Development mode (with watch mode)
npm run start:dev

# Production mode
npm run start:prod
```

## 🛡️ Admin Panel Access

Once the server is running, you can access the AdminJS dashboard at:
👉 **[http://localhost:3000/admin](http://localhost:3000/admin)**

### Default Login Credentials (Seeded automatically)

#### **Super Admin:**
- **Email:** `belalhossain22000@gmail.com`
- **Password:** `123456`

#### **Standard Admins:**
- **Emails:** `admin1@example.com` through `admin10@example.com`
- **Password:** `password123`

## 🛣️ API Endpoints

- **Users API**: `http://localhost:3000/user`
- **Admins API**: `http://localhost:3000/admins` (uses UUID)

## 🤝 Support

For support, please contact the developer or open an issue in the repository.

## 📄 License

This project is licensed under the MIT License.
