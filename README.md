# Appzeto - Single Vendor E-commerce

A modern single vendor e-commerce website built with MERN stack.

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Animations**: GSAP + Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: React Icons
- **Carousel**: Swiper

## Project Structure

```
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions & animations
│   │   └── assets/        # Images, fonts, etc.
├── backend/           # Express backend API
│   ├── routes/        # API routes
│   ├── models/        # Database models
│   └── controllers/  # Route controllers
└── package.json       # Root package.json for running both
```

## Setup Instructions

1. Install all dependencies:

```bash
npm run install-all
```

2. Set up environment variables:

   - Copy `backend/.env.example` to `backend/.env`
   - Add your MongoDB connection string
   - Create `frontend/.env` and add `VITE_API_BASE_URL=http://localhost:5000/api`

3. Run development servers:

```bash
npm run dev
```

This will start:

- Frontend on http://localhost:3000
- Backend on http://localhost:5000

## Features

- ✅ Responsive design (mobile-first approach)
- ✅ Modern UI/UX with smooth animations
- ✅ GSAP & Framer Motion for advanced animations
- ✅ Fast development with Vite
- ✅ RESTful API structure
- ✅ Toast notifications
- ✅ Form handling with React Hook Form
- ✅ State management with Zustand

## Animation Libraries

### GSAP

- Scroll-triggered animations
- Timeline animations
- Advanced easing functions

### Framer Motion

- Component animations
- Page transitions
- Gesture animations

## Development

- Frontend only: `cd frontend && npm run dev`
- Backend only: `cd backend && npm run dev`
- Both: `npm run dev` (from root)

## Available Utilities

- `useGSAPAnimation` - Hook for GSAP animations
- `useScrollAnimation` - Hook for scroll-triggered animations
- `AnimatedComponent` - Wrapper for Framer Motion
- `PageTransition` - Smooth page transitions
