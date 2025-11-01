# 🌾 Maharashtra Seed Service

A comprehensive web-based service for farmers in Maharashtra to apply for seed distribution, check application status, and receive scheme updates. This government-tech style project provides an efficient digital platform for seed distribution management.

## 🏗️ Tech Stack

- **Frontend:** React 18 + TailwindCSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Docker + Docker Compose

## 📁 Project Structure

```
MaharashtraSeedService/
├── backend/
│   ├── server.js           # Express server entry point
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication routes
│   │   └── seeds.js        # Seed application routes
│   ├── models/             # MongoDB models
│   │   ├── User.js         # User model
│   │   └── SeedApplication.js  # Seed application model
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   └── seedController.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/          # React pages
│   │   ├── components/     # React components
│   │   ├── context/        # React context
│   │   └── App.js          # Main App component
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml      # Docker orchestration
├── .gitignore
└── README.md
```

## 🚀 Quick Start with Docker

### Prerequisites

- Docker installed on your system
- Docker Compose installed

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MaharashtraSeedService
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - MongoDB on port `27017`
   - Backend API on port `5000`
   - Frontend on port `80`

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

4. **Stop all services**
   ```bash
   docker-compose down
   ```

5. **View logs**
   ```bash
   docker-compose logs -f
   ```

## 🔧 Local Development (Without Docker)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   MONGO_URI=mongodb://localhost:27017/maharashtra-seed-service
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Make sure MongoDB is running** (locally or via Docker)

5. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (optional, defaults to localhost:5000)
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   Frontend will be available at http://localhost:3000

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "aadharNumber": "123456789012",
    "address": {
      "district": "Mumbai",
      "taluka": "South",
      "village": "ABC",
      "pincode": "400001"
    }
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/profile` - Get user profile (requires authentication)
  - Headers: `Authorization: Bearer <token>`

### Seed Applications

- `POST /api/seeds/apply` - Apply for seeds (requires authentication)
  ```json
  {
    "seedType": "wheat",
    "quantity": 50,
    "landArea": 2.5,
    "cropSeason": "rabi"
  }
  ```

- `GET /api/seeds/my-applications` - Get user's applications (requires authentication)

- `GET /api/seeds/all` - Get all applications (admin only)

- `PATCH /api/seeds/:applicationId/status` - Update application status (admin only)
  ```json
  {
    "status": "approved",
    "remarks": "Application approved"
  }
  ```

### Seed Types
- wheat, rice, cotton, soybean, sugarcane, maize, other

### Crop Seasons
- kharif, rabi, zaid

### Application Status
- pending, approved, rejected, distributed

## 👤 User Roles

### Farmer
- Register and login
- Apply for seeds
- View application status
- Update profile

### Admin
- All farmer features
- View all applications
- Approve/reject applications
- Update application status

## 🔐 Creating an Admin User

To create an admin user, you need to update the user directly in MongoDB:

```javascript
// Connect to MongoDB and run:
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or use MongoDB Compass/CLI to update the role field to "admin".

## 🛠️ Development

### Backend Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 📦 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://mongo:27017/maharashtra-seed-service
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild after changes
docker-compose up -d --build

# View logs
docker-compose logs -f [service-name]

# Stop and remove volumes
docker-compose down -v
```

## 🧪 Testing the API

You can use tools like Postman or curl to test the API:

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","phone":"1234567890","aadharNumber":"123456789012","address":{"district":"Mumbai","taluka":"South","village":"ABC","pincode":"400001"}}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📝 Features

- ✅ User registration and authentication
- ✅ JWT-based secure authentication
- ✅ Seed application submission
- ✅ Application status tracking
- ✅ Admin dashboard for approval management
- ✅ Responsive UI with TailwindCSS
- ✅ Docker containerization
- ✅ MongoDB data persistence

## 🔒 Security Notes

- Change JWT_SECRET in production
- Use strong passwords
- Enable HTTPS in production
- Implement rate limiting
- Add input validation and sanitization
- Use environment variables for sensitive data

## 📄 License

This project is created for educational/demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ for Maharashtra Farmers**

