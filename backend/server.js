require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(methodOverride('_method'));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Admin Routes
app.use('/admin', adminRoutes);

// User Routes
app.get('/', async (req, res) => {
  try {
    const Product = require('./models/Product');
    const categories = ['pizza', 'sushi', 'desserts', 'beverages', 'burgers'];
    res.render('index', { categories });
  } catch (error) {
    res.status(500).send('Error loading page');
  }
});

app.get('/category/:category', async (req, res) => {
  try {
    const Product = require('./models/Product');
    const { category } = req.params;
    const products = await Product.find({ category, available: true }).sort({ createdAt: -1 });
    res.render('category', { products, category });
  } catch (error) {
    res.status(500).send('Error loading category');
  }
});

app.get('/cart', (req, res) => {
  res.render('cart');
});

app.get('/checkout', (req, res) => {
  res.render('checkout');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

