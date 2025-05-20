# Product Management System

A full-stack application for managing products with Angular frontend and Node.js backend.

## Project Structure

```
product-management/
├── frontend/         # Angular application
└── backend/         # Node.js API server
```

## Frontend Setup (Angular)

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (`npm install -g @angular/cli`)

### Installation & Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Development server:
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Features
- User Authentication
- Product Management (CRUD operations)
- Material Design UI
- Lazy Loading
- Responsive Layout

### Default Login Credentials
- Username: admin@gmail.com
- Password: admin123

## Backend Setup (Node.js)

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4 or higher)

### Installation & Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```



3. Start the server:
   ```bash
   npm start
   ```
   The API server will run on `http://localhost:3000`

### API Endpoints

#### Authentication
- POST `/api/login` - User login
- POST `/api/logout` - User logout

#### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product by ID
- POST `/api/products` - Create new product
- PUT `/api/products/:id` - Update product
- DELETE `/api/products/:id` - Delete product

## Running the Complete Application

1. Start MongoDB:
   ```bash
   mongod
   ```

2. Start the backend server (in backend directory):
   ```bash
   npm start
   ```

3. Start the frontend development server (in frontend directory):
   ```bash
   ng serve
   ```

4. Access the application at `http://localhost:4200`

## Development

### Frontend Development
- Run `ng generate component component-name` to generate a new component
- Run `ng build` to build the project
- Run `ng test` to execute unit tests
- Run `ng e2e` to execute end-to-end tests

### Backend Development
- Run `npm run dev` for development with nodemon
- Run `npm test` to execute the tests

## Production Build

### Frontend
```bash
cd frontend


### Backend
```bash
cd backend

```

## Technologies Used

### Frontend
- Angular 17
- Angular Material
- RxJS
- TypeScript
- SCSS

### Backend
- Node.js
- Express.js



## License
This project is licensed under the MIT License - see the LICENSE file for details