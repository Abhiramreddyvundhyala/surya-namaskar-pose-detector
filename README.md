# Surya Namaskar Yoga Pose Estimation Web App

A comprehensive web application for practicing **12 Surya Namaskar yoga poses** with **real-time AI feedback** using pose estimation technology.

## 🌟 Features

- **User Authentication**: Secure login/signup with JWT tokens
- **Real-time Pose Estimation**: MediaPipe-powered skeleton detection
- **Live Feedback**: Green skeleton for correct poses, red highlights for errors
- **Progress Tracking**: Session history and accuracy trends
- **Interactive UI**: Split-screen practice with reference poses
- **Responsive Design**: Built with React and Tailwind CSS

## 🏗️ Architecture

- **Frontend**: React.js with Tailwind CSS
- **Backend**: FastAPI with Python
- **Database**: MongoDB Atlas
- **AI/ML**: MediaPipe Pose Detection
- **Authentication**: JWT tokens
- **Charts**: Chart.js for progress visualization

## 📁 Project Structure

```
surya-namaskar-app/
├── frontend/              # React application
│   ├── public/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks
│   │   ├── utils/        # Utility functions
│   │   ├── assets/       # Images and reference poses
│   │   └── styles/       # CSS files
│   ├── package.json
│   └── tailwind.config.js
├── backend/              # FastAPI application
│   ├── app/
│   │   ├── models/       # Database models
│   │   ├── routers/      # API routes
│   │   ├── utils/        # Utility functions
│   │   └── main.py       # FastAPI app entry
│   ├── requirements.txt
│   └── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB Atlas account

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 📋 Surya Namaskar Poses

1. **Pranamasana** (Prayer Pose)
2. **Hastauttanasana** (Raised Arms Pose)
3. **Hastapadasana** (Standing Forward Bend)
4. **Ashwa Sanchalanasana** (Low Lunge)
5. **Dandasana** (Plank Pose)
6. **Ashtanga Namaskara** (Eight-Limbed Pose)
7. **Bhujangasana** (Cobra Pose)
8. **Adho Mukha Svanasana** (Downward-Facing Dog)
9. **Ashwa Sanchalanasana** (Low Lunge - Other Leg)
10. **Hastapadasana** (Standing Forward Bend)
11. **Hastauttanasana** (Raised Arms Pose)
12. **Tadasana** (Mountain Pose)

## 🔧 Configuration

### Environment Variables
Create `.env` files in both frontend and backend directories:

**Backend (.env)**:
```
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256
```

**Frontend (.env)**:
```
REACT_APP_API_URL=http://localhost:8000
```

## 🚀 Deployment

- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Backend**: Vercel, Render, or Heroku
- **Database**: MongoDB Atlas

## 📊 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Chart.js
- **Backend**: FastAPI, Python, PyMongo
- **Database**: MongoDB
- **ML/AI**: MediaPipe, TensorFlow.js
- **Authentication**: JWT
- **Deployment**: Vercel, MongoDB Atlas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.