# 🏫 College Lost & Found Web Application

A full-stack web application for college students to report and find lost items, built with React, Express.js, Node.js, and MongoDB Atlas.

## 🔐 Features

- **Google OAuth 2.0 Authentication** - Secure login with college email verification
- **Lost Items** - Report items you've lost with details and images
- **Found Items** - Report items you've found to help others
- **Search & Filter** - Find items by name and category
- **User Profile** - Manage your own posts (edit/delete)
- **Image Upload** - Attach photos to your posts
- **Responsive UI** - Mobile-friendly Bootstrap design

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- React Bootstrap
- React Router DOM
- @react-oauth/google
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- Google Auth Library
- Multer (file uploads)

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Google Cloud Console account (for OAuth)

## 🚀 Setup Instructions

### 1. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable OAuth consent screen (External)
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized JavaScript origins:
   - `http://localhost:3000`
   - `http://localhost:5173`
6. Copy your **Client ID**

### 2. MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP (or use 0.0.0.0/0 for development)
4. Get your connection string

### 3. Backend Configuration

1. Navigate to the `server` folder
2. Update `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri_here
JWT_SECRET=your_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
ALLOWED_DOMAINS=gmail.com,vit.edu,college.edu
```

3. Install dependencies:
```bash
cd server
npm install
```

4. Start the server:
```bash
npm start
```

### 4. Frontend Configuration

1. Navigate to the `client` folder
2. Update `src/main.jsx` - replace the `clientId` with your Google Client ID
3. Install dependencies:
```bash
cd client
npm install
```

4. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 📱 Usage

1. **Login** - Click "Login" and sign in with your college Google account
2. **Browse Items** - View Lost Items or Found Items from the navbar
3. **Post Item** - Click "Post Item" to report a lost or found item
4. **Search** - Use the search bar and category filter to find specific items
5. **Profile** - View and manage your posts from the Profile page

## 🔒 Security Features

- JWT-based session management
- Google OAuth token verification
- Email domain restriction
- Protected API routes
- Password-less authentication

## 📁 Project Structure

```
hackthon/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Item.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── items.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── uploads/
│   ├── server.js
│   └── .env
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ItemCard.jsx
    │   │   ├── ItemsPage.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── LostItems.jsx
    │   │   ├── FoundItems.jsx
    │   │   ├── PostItem.jsx
    │   │   └── Profile.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🐛 Troubleshooting

**Login fails with "Access denied":**
- Ensure your email domain is in the `ALLOWED_DOMAINS` list in `.env`

**Images not showing:**
- Check that the `server/uploads` folder exists
- Verify the backend URL in image paths

**MongoDB connection error:**
- Verify your MongoDB Atlas URI is correct
- Check if your IP is whitelisted
- Ensure the database user credentials are correct

**Google Login button not appearing:**
- Verify the Google Client ID is set in `client/src/main.jsx`
- Check browser console for errors
- Ensure authorized origins are configured in Google Cloud Console

## 📝 License

This project is open source and available for educational purposes.
