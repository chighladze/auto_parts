# Backend Setup Guide

## Overview

This is the backend service for the Auto Parts Management System, built with FastAPI and SQLite.

## Prerequisites

- Python 3.12 or higher
- pip package manager
- Virtual environment (recommended)

## Installation

1. Create and activate virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

## Configuration

1. Create a `.env` file in the backend directory with the following variables:

```
SECRET_KEY=your_secure_secret_key_here
DATABASE_URL=sqlite:///./auto_parts.db
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALGORITHM=HS256
```

Replace `your_secure_secret_key_here` with a secure secret key.

## Database Setup

1. Initialize the database:

```bash
python init_db.py
```

2. Create an admin user:

```bash
python create_admin.py
```

3. Import sample data (optional):

```bash
python import_data.py
```

## API Documentation

Once the server is running, you can access:

- Interactive API documentation at: http://localhost:8000/docs
- Alternative API documentation at: http://localhost:8000/redoc

## Project Structure

```
backend/
├── app/
│   ├── models/       # Database models
│   ├── routers/     # API routes
│   ├── schemas/     # Pydantic schemas
│   ├── services/    # Business logic
│   ├── database.py  # Database configuration
│   └── main.py      # Application entry point
├── tests/           # Unit tests
├── data/           # Sample data CSV files
├── requirements.txt # Python dependencies
└── README.md       # This file
```

## Running the Server

Development mode:

```bash
uvicorn app.main:app --reload
```

Production mode:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Running Tests

```bash
pytest
```

## Deployment

1. Set up the systemd service:

```bash
sudo cp auto-parts-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable auto-parts-backend
sudo systemctl start auto-parts-backend
```

2. Configure Nginx:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/auto-parts
sudo ln -s /etc/nginx/sites-available/auto-parts /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```
