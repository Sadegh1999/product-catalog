# Product Catalog — Setup Guide

## Project Structure
```
ProductCatalog/
├── Controllers/         → API endpoints
├── Services/            → Business logic
├── Models/              → Database entities
├── DTOs/                → Data transfer objects
├── Data/                → EF Core DbContext
├── Program.cs           → App startup
├── frontend/            → React web app
│   └── src/
│       ├── App.js
│       ├── components/
│       └── services/
```

---

## Step 1 — Set up the database

Open `appsettings.json` and update the connection string with your SQL Server details.

---

## Step 2 — Copy files into your Visual Studio project

Copy these files into your existing WebApi Visual Studio project:
- All `.cs` files go into their matching folders
- Replace `Program.cs` with the new one
- Replace `Data/AppDbContext.cs` with the new one

---

## Step 3 — Run migrations

Open Terminal in Visual Studio (View → Terminal) and run:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

## Step 4 — Run the API

In Visual Studio press **F5** or click the green Run button.

Your API will be at: `https://localhost:5001`
Swagger UI at: `https://localhost:5001/swagger`

---

## Step 5 — Set up the React frontend

Open a second terminal and run:

```bash
cd frontend
npx create-react-app .
```

Then replace the generated files with the ones in `frontend/src/`.

Run the frontend:
```bash
npm start
```

Your web app will open at: `http://localhost:3000`

---

## API Endpoints

| Method | URL | What it does |
|--------|-----|--------------|
| GET | /api/products | Get all products |
| GET | /api/products/5 | Get one product |
| POST | /api/products | Add a product |
| PUT | /api/products/5 | Edit a product |
| DELETE | /api/products/5 | Delete a product |
| GET | /api/categories | Get all categories |
| POST | /api/categories | Add a category |
