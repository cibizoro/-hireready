# HireReady - Full Stack Interview Preparation Platform

HireReady is a comprehensive interview preparation platform designed to help candidates prepare for technical interviews through DSA (Data Structures & Algorithms) challenges, aptitude tests, and AI-powered mock interviews.

## 🚀 Features

### For Candidates
- **DSA Practice Arena**: Solve coding challenges across multiple categories (Arrays, Strings, Linked Lists, Trees, Stacks, Hash Maps)
- **Code Editor**: Built-in Monaco editor with syntax highlighting and multiple language support
- **Aptitude Tests**: Practice quantitative and logical reasoning questions
- **Mock Interviews**: AI-powered interview sessions with real-time feedback
- **Progress Tracking**: Track your solved questions and performance metrics
- **Difficulty Levels**: Questions categorized as Easy, Medium, and Hard

### Platform Features
- User Authentication with JWT
- Role-based access control (User/Admin)
- Responsive UI with modern design
- Real-time code execution and validation
- Comprehensive question bank with test cases

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Monaco Editor** - Code editor component
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Spring Boot 3.2.2** - Java framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database ORM
- **JWT (JSON Web Tokens)** - Secure authentication
- **H2 Database** - In-memory database (development)
- **MySQL** - Production database support
- **Maven** - Dependency management

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Java JDK 17** or higher
- **Maven 3.6+**
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone git@github.com:cibizoro/hireready.git
cd hireready
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

The application uses H2 in-memory database by default. For production with MySQL, update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hireready
spring.datasource.username=your_username
spring.datasource.password=your_password
```

Build and run the backend:
```bash
mvn clean install
mvn spring-boot:run
```

The backend server will start at `http://localhost:8081`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔑 Default Credentials

The application comes with pre-seeded users:

**Regular User:**
- Email: `user@hireready.com`
- Password: `password`

**Admin User:**
- Email: `admin@hireready.com`
- Password: `password`

## 📁 Project Structure

```
hireready/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/hireready/backend/
│   │   │   │   ├── config/          # Security & configuration
│   │   │   │   ├── controller/      # REST API endpoints
│   │   │   │   ├── model/           # Entity models
│   │   │   │   ├── repository/      # Data access layer
│   │   │   │   ├── service/         # Business logic
│   │   │   │   └── security/        # JWT & authentication
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── data.sql         # Initial data
│   │   └── test/
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### DSA Questions
- `GET /api/dsa` - Get all DSA questions
- `GET /api/dsa/{id}` - Get specific question
- `GET /api/dsa/category/{category}` - Filter by category
- `GET /api/dsa/difficulty/{difficulty}` - Filter by difficulty
- `POST /api/dsa/solve/{id}` - Mark question as solved

### Aptitude Questions
- `GET /api/aptitude` - Get all aptitude questions
- `GET /api/aptitude/{id}` - Get specific question

### Mock Interviews
- `POST /api/mock-interview` - Create interview session
- `GET /api/mock-interview/user/{userId}` - Get user's interviews

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

## 🎨 Features in Detail

### DSA Practice
- 30+ coding challenges across multiple categories
- Example inputs/outputs for each question
- Test case validation
- Code submission and execution
- Progress tracking for solved questions

### Mock Interviews
- AI-powered interview simulations
- Multiple job roles supported
- Real-time feedback and scoring
- Interview history and performance analytics

### User Dashboard
- Personal progress overview
- Recently solved problems
- Performance metrics
- Profile management

## 🔐 Security Features

- JWT-based authentication
- Password encryption using BCrypt
- CORS configuration
- Role-based access control
- Secure REST API endpoints

## 🚧 Future Enhancements

- [ ] Real-time collaborative coding
- [ ] Video mock interviews
- [ ] Company-specific question sets
- [ ] Leaderboards and competitions
- [ ] Discussion forums
- [ ] Solution explanations and hints
- [ ] Email notifications
- [ ] Social login (Google, LinkedIn, GitHub)
- [ ] Mobile application
- [ ] Advanced analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Cibi Arulnath**
- GitHub: [@cibizoro](https://github.com/cibizoro)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful UI library
- All contributors and supporters of this project

## 📧 Support

For support, email support@hireready.com or open an issue in the GitHub repository.

---

**Happy Coding! 🎉**
