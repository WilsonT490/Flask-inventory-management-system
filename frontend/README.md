# Inventory Management System

## Project Description

This project is an Inventory Management System built using **Flask** for the backend and **React** for the frontend. The application allows an administrator to manage inventory items by adding, viewing, editing, and deleting products.

The system also connects to the **OpenFoodFacts API**, allowing users to search for products by barcode and automatically fill in product information before adding it to the inventory.

---

## Features

- View all inventory items
- Add new inventory items
- Edit existing items
- Delete inventory items
- Fetch product details using OpenFoodFacts API
- Inventory summary
- REST API built with Flask
- Unit tests for backend routes

---

## Technologies Used

### Backend
- Python
- Flask
- Flask-CORS
- Requests

### Frontend
- React
- Vite
- Axios
- CSS

### API
- OpenFoodFacts API

---

## Project Structure

```
Flask-management-system/

├── backend/
│   ├── app.py
│   ├── test_app.py
│   ├── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Flask-management-system.git
```

Go into the project folder.

```bash
cd Flask-management-system
```

---

## Backend Setup

Go to the backend folder.

```bash
cd backend
```

Create a virtual environment.

```bash
python3 -m venv .venv
```

Activate it.

Linux/Mac

```bash
source .venv/bin/activate
```

Windows

```bash
.venv\Scripts\activate
```

Install the required packages.

```bash
pip install -r requirements.txt
```

Run the Flask server.

```bash
python3 app.py
```

---

## Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the React application.

```bash
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /inventory | Get all items |
| GET | /inventory/<id> | Get one item |
| POST | /inventory | Add a new item |
| PATCH | /inventory/<id> | Update an item |
| DELETE | /inventory/<id> | Delete an item |
| GET | /summary | Inventory summary |
| GET | /fetch-product/<barcode> | Search product using OpenFoodFacts |

---

## Running Tests

Go to the backend folder and run:

```bash
python -m unittest test_app.py
```

If everything is working correctly, all tests should pass.

---

## Challenges I Faced

While building this project I ran into a few problems:

- Setting up the Flask backend and React frontend together.
- Fixing CORS errors.
- Connecting to the OpenFoodFacts API.
- Debugging API responses and unit tests.
- Connecting the frontend to the backend using Axios.

These problems helped me understand how REST APIs work and how frontend and backend applications communicate.

---

## Future Improvements

If I continue working on this project, I would like to add:

- A database such as SQLite or MySQL instead of storing data in memory.
- User login and authentication.
- Product search and filtering.
- Product images.
- Export inventory to CSV.
- Better styling and responsive design.

---

## Author

Wilson Mbiuki

Course Project – Python Flask REST API Inventory Management System