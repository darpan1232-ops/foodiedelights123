# Deployment Guide for Foodie Delights

## Important: GitHub Pages Limitation

**GitHub Pages cannot host Node.js/Express backend applications.** GitHub Pages only supports static websites (HTML, CSS, JavaScript) or Jekyll sites. This project requires a Node.js server to run.

## Hosting Options

### Option 1: Render (Recommended - Free Tier Available)
1. Create account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new "Web Service"
4. Select your repository
5. Settings:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     ```
     MONGODB_URI=your_mongodb_connection_string
     SESSION_SECRET=your_secret_key
     PORT=10000
     ```
6. Add MongoDB Atlas (free cloud MongoDB) connection string

### Option 2: Railway (Free Trial)
1. Create account at [railway.app](https://railway.app)
2. Connect GitHub repository
3. Deploy from GitHub
4. Add environment variables
5. Add MongoDB service

### Option 3: Vercel (For Frontend) + Backend Separately
- Frontend can be deployed to Vercel
- Backend needs separate hosting (Render, Railway, etc.)

### Option 4: Heroku (Paid after free tier ended)
1. Create Heroku account
2. Install Heroku CLI
3. Run:
   ```bash
   heroku create your-app-name
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set SESSION_SECRET=your_secret
   git push heroku main
   ```

### Option 5: DigitalOcean App Platform
- Paid hosting option
- Supports Node.js applications
- Easy MongoDB integration

## MongoDB Setup (Required)

Since this is a full-stack app, you need a database:

### MongoDB Atlas (Free)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a free cluster
4. Get connection string
5. Add to your hosting environment variables

## Environment Variables Needed

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodie-delights
SESSION_SECRET=your-random-secret-key-here
PORT=10000
```

## Deployment Steps (Render Example)

1. **Push code to GitHub** (make sure `.env` is in `.gitignore`)

2. **Create MongoDB Atlas Database**
   - Sign up at MongoDB Atlas
   - Create free cluster
   - Create database user
   - Whitelist IP (0.0.0.0/0 for all)
   - Get connection string

3. **Deploy on Render**
   - New → Web Service
   - Connect GitHub repo
   - Settings:
     - Name: foodie-delights
     - Environment: Node
     - Build Command: `cd backend && npm install`
     - Start Command: `cd backend && npm start`
   - Add Environment Variables
   - Deploy

4. **Initialize Database**
   - Once deployed, SSH into service or use Render shell
   - Run: `cd backend && npm run init-admin`
   - Run: `cd backend && npm run seed-products`

5. **Access Your App**
   - Your app will be available at: `https://your-app-name.onrender.com`
   - Admin panel: `https://your-app-name.onrender.com/admin/login`

## Local Development

For local development:

```bash
# Install dependencies
cd backend
npm install

# Create .env file
MONGODB_URI=mongodb://localhost:27017/foodie-delights
SESSION_SECRET=your-secret-key
PORT=3000

# Start MongoDB locally (or use Atlas)
mongod

# Initialize admin user
npm run init-admin

# Seed products (optional)
npm run seed-products

# Start server
npm start
```

## GitHub Repository Setup

Even though GitHub Pages won't host the app, you can still:
- Store your code on GitHub
- Use GitHub Actions for CI/CD
- Keep version control
- Share your code

Just don't try to publish it as a GitHub Page - use a proper hosting service instead.

## Notes

- The `.nojekyll` file prevents GitHub Pages from trying to build the site
- `node_modules/` should never be committed to Git
- Always keep `.env` files out of version control
- Upload directory will be created automatically on first upload

