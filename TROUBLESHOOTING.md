# 🔧 Troubleshooting Guide

## Issue 1: MongoDB Authentication Failed ❌

**Error:** `bad auth : authentication failed`

### Fix Steps:

1. **Go to MongoDB Atlas** (https://cloud.mongodb.com)
2. **Check Database User:**
   - Click "Database Access" in left sidebar
   - Verify user `akash25_kumar` exists
   - If not, create a new user with a simple password (no special characters)
   
3. **Get Correct Connection String:**
   - Click "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   
4. **Update `.env`:**
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.t5je51r.mongodb.net/college-lost-found?retryWrites=true&w=majority
   ```

### Common Issues:
- Password contains special characters (needs URL encoding)
- Username/password mismatch
- User not created in Atlas
- IP not whitelisted (add 0.0.0.0/0 for testing)

---

## Issue 2: Google OAuth "Wrong recipient" Error ❌

**Error:** `payload audience != requiredAudience`

### This means the Google Client ID in frontend doesn't match backend

### Fix Steps:

1. **Verify Client ID in Google Cloud Console:**
   - Go to https://console.cloud.google.com
   - Select your project
   - Go to "Credentials"
   - Copy the **Client ID** (ends with `.apps.googleusercontent.com`)

2. **Update BOTH files with the SAME Client ID:**

   **File 1: `server/.env`**
   ```env
   GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
   ```

   **File 2: `client/src/main.jsx`**
   ```javascript
   const clientId = "YOUR_CLIENT_ID_HERE.apps.googleusercontent.com";
   ```

3. **Verify Authorized Origins in Google Console:**
   - In Google Cloud Console → Credentials → Your OAuth Client
   - **Authorized JavaScript origins** should include:
     - `http://localhost:3000`
     - `http://localhost:5173`
   - **Authorized redirect URIs** should include:
     - `http://localhost:3000`
     - `http://localhost:5173`

4. **Restart both servers** after making changes

---

## Quick Test

### Test MongoDB Connection:
```bash
# In server folder
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI).then(() => console.log('✅ Connected')).catch(err => console.log('❌', err.message));"
```

### Test Google OAuth:
1. Open browser console (F12)
2. Try to login
3. Check for errors in console
4. Common error: "idpiframe_initialization_failed" means origins not configured

---

## Alternative: Use Local MongoDB (Temporary Fix)

If Atlas is giving trouble, use local MongoDB:

1. **Install MongoDB locally** or use this in `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/college-lost-found
   ```

2. **Start local MongoDB:**
   ```bash
   mongod
   ```

This bypasses authentication issues for development.
