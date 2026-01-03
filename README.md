# Foodie Delights - Full Stack Food Ordering System

A full-stack food ordering web application built with Node.js, Express, MongoDB, and EJS.

## ⚠️ Important: Hosting Information

**This is a Node.js backend application and cannot be hosted on GitHub Pages.** GitHub Pages only supports static websites. You need a platform that supports Node.js like Render, Railway, Vercel, or Heroku.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed hosting instructions.

## Features

### User Features
- Browse food categories (Pizza, Sushi, Desserts, Beverages, Burgers)
- View products with images, descriptions, and prices
- Add products to shopping cart
- Place orders with delivery information
- Responsive design with beautiful animations

### Admin Features
- Secure admin login system
- Dashboard with order and product statistics
- Product Management:
  - Add new products (upload images or use URLs)
  - Edit existing products
  - Delete products
  - Filter products by category
- Order Management:
  - View all orders
  - Filter orders by status
  - View detailed order information
  - Update order status (pending, confirmed, preparing, ready, delivered, cancelled)

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS templating engine, HTML, CSS, JavaScript
- **File Upload**: Multer
- **Authentication**: Express Sessions, bcryptjs for password hashing

## Project Structure

```
WEBSITE-1/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── upload.js            # File upload configuration
│   ├── models/
│   │   ├── Product.js           # Product model
│   │   ├── Order.js             # Order model
│   │   └── Admin.js             # Admin user model
│   ├── routes/
│   │   ├── productRoutes.js     # Product API routes
│   │   ├── orderRoutes.js       # Order API routes
│   │   └── adminRoutes.js       # Admin panel routes
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── scripts/
│   │   ├── initAdmin.js         # Script to create admin user
│   │   └── seedProducts.js      # Script to seed products
│   └── server.js                # Main server file
├── frontend/
│   ├── views/
│   │   ├── partials/
│   │   │   ├── header.ejs
│   │   │   └── footer.ejs
│   │   ├── admin/
│   │   │   ├── login.ejs
│   │   │   ├── dashboard.ejs
│   │   │   ├── products.ejs
│   │   │   ├── product-form.ejs
│   │   │   ├── orders.ejs
│   │   │   └── order-detail.ejs
│   │   ├── index.ejs
│   │   ├── category.ejs
│   │   ├── cart.ejs
│   │   └── checkout.ejs
│   └── public/
│       ├── css/
│       │   ├── style.css
│       │   └── admin.css
│       ├── js/
│       │   └── cart.js
│       └── uploads/              # Uploaded product images
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Step 1: Install Dependencies

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the `backend` folder:

```env
MONGODB_URI=mongodb://localhost:27017/foodie-delights
SESSION_SECRET=your-secret-key-change-this-in-production
PORT=3000
```

For MongoDB Atlas (cloud database), use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodie-delights
```

### Step 3: Start MongoDB

Make sure MongoDB is running on your system:

**Local MongoDB:**
```bash
mongod
```

Or if you're using MongoDB as a service:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### Step 4: Create Admin User

Run the initialization script to create an admin user:

```bash
cd backend
npm run init-admin
```

This will create an admin user with:
- Username: `admin`
- Password: `admin123`

To create a custom admin user:
```bash
node scripts/initAdmin.js yourusername yourpassword
```

### Step 5: Seed Products (Optional)

Seed the database with sample products:

```bash
npm run seed-products
```

This will add 27 products across all categories.

### Step 6: Start the Server

```bash
cd backend
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Usage

### User Interface
1. Visit `http://localhost:3000`
2. Browse categories and view products
3. Add items to cart
4. Proceed to checkout
5. Fill in delivery information and place order

### Admin Panel
1. Visit `http://localhost:3000/admin/login`
2. Login with your admin credentials
3. Access the dashboard to view statistics
4. Manage products (add, edit, delete)
5. View and manage orders

## Default Admin Credentials

After running the initialization script:
- **Username**: `admin`
- **Password**: `admin123`

**Important**: Change the default password after first login in production!

## Scripts

- `npm start` - Start the server
- `npm run dev` - Start with nodemon (auto-restart)
- `npm run init-admin` - Create admin user
- `npm run seed-products` - Seed database with products

## File Upload

The admin panel supports two ways to add product images:
1. **Upload files directly** - Images are stored in `frontend/public/uploads/`
2. **Use image URLs** - Provide a URL to an external image

Uploaded files are limited to 5MB and support: JPG, PNG, GIF, WEBP

## Deployment

**This application cannot be hosted on GitHub Pages.** You need a Node.js hosting service.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions using:
- Render (Free tier available)
- Railway
- Vercel
- Heroku
- DigitalOcean

## License

This project is open source and available for educational purposes.

## Support

For deployment issues, see [DEPLOYMENT.md](./DEPLOYMENT.md). For code-related questions, check the code comments or create an issue in the repository.

