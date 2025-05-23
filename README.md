# Auto Parts Management System

A full-stack web application for managing auto parts inventory, sales, and customer relationships.

## Features

- Parts inventory management
- Sales order processing
- Customer management
- Multi-warehouse support
- User authentication and authorization
- Parts categorization (groups and subgroups)
- Brand and car model management

## Tech Stack

### Backend

- FastAPI
- SQLite database
- SQLAlchemy ORM
- JWT authentication
- Python 3.12

### Frontend

- React.js
- Material-UI components
- i18n internationalization
- REST API integration

## Getting Started

### Prerequisites

- Python 3.12 or higher
- Node.js 14 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Initialize the database:

```bash
python init_db.py
```

5. Start the backend server:

```bash
uvicorn app.main:app --reload
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

## Environment Variables

### Backend

Create a `.env` file in the backend directory with the following variables:

```
SECRET_KEY=your_secret_key_here
DATABASE_URL=sqlite:///./auto_parts.db
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend

Create a `.env` file in the frontend directory with:

```
REACT_APP_API_URL=http://localhost:8000
```

## Deployment

The project includes deployment configurations for:

- Nginx web server
- Systemd service for the backend
- Build scripts for production deployment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
