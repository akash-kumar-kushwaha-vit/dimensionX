# ✅ Configuration Quick Fix

Based on your Google Cloud Console screenshot, here's what you need:

## Your Google Client ID (Confirmed ✅)
```
1052842171524-r3v4f4cc93otaobv3us62n68f37hb1er.apps.googleusercontent.com
```

---

## Fix 1: MongoDB Atlas Connection

### Problem
Your current URI has incorrect credentials: `akash25_kumar:akash25_kumar`

### Solution
Go to MongoDB Atlas and get the correct connection string:

1. Login to https://cloud.mongodb.com
2. Click "Database" → "Connect" → "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual database password
5. Update `server/.env` line 2

**OR use local MongoDB for now:**
```env
MONGO_URI=mongodb://localhost:27017/college-lost-found
```

---

## Fix 2: Google OAuth Authorized Origins

### Problem
The "Wrong recipient" error means your authorized origins aren't configured.

### Solution
In Google Cloud Console (where you took the screenshot):

1. Click on your OAuth Client ID name
2. Scroll to **"Authorized JavaScript origins"**
3. Click **"ADD URI"** and add these TWO origins:
   - `http://localhost:3000`
   - `http://localhost:5173`
4. Scroll to **"Authorized redirect URIs"**  
5. Click **"ADD URI"** and add:
   - `http://localhost:5173`
6. Click **"SAVE"** at the bottom

![Screenshot Reference](C:/Users/kushw/.gemini/antigravity/brain/e1ab1baf-e2fd-4aeb-a952-54fee4976e33/uploaded_image_1767502762749.png)

---

## After Making Changes

1. **Restart backend:**
   ```bash
   cd server
   npm start
   ```

2. **Restart frontend:**
   ```bash
   cd client
   npm run dev
   ```

3. **Test login** at http://localhost:5173

---

## Expected Result

✅ Backend: `✅ MongoDB Connected`  
✅ Frontend: Google Login button works without errors  
✅ Login: Successfully redirects to home page
