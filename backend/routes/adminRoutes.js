const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { requireAuth } = require('../middleware/auth');
const upload = require('../config/upload');

// Admin Login Page
router.get('/login', (req, res) => {
  if (req.session && req.session.adminId) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', { error: null });
});

// Admin Login Post
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return res.render('admin/login', { error: 'Invalid credentials' });
    }
    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.render('admin/login', { error: 'Invalid credentials' });
    }
    
    req.session.adminId = admin._id;
    req.session.adminUsername = admin.username;
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.render('admin/login', { error: 'Login failed. Please try again.' });
  }
});

// Admin Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Admin Dashboard
router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const recentOrders = await Order.find()
      .populate('items.product')
      .sort({ orderDate: -1 })
      .limit(5);
    
    res.render('admin/dashboard', {
      totalProducts,
      totalOrders,
      pendingOrders,
      recentOrders,
      adminUsername: req.session.adminUsername
    });
  } catch (error) {
    res.status(500).send('Error loading dashboard');
  }
});

// Products Management - List
router.get('/products', requireAuth, async (req, res) => {
  try {
    const category = req.query.category;
    const query = category ? { category } : {};
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.render('admin/products', { products, selectedCategory: category || 'all' });
  } catch (error) {
    res.status(500).send('Error loading products');
  }
});

// Add Product - Form
router.get('/products/add', requireAuth, (req, res) => {
  res.render('admin/product-form', { product: null, isEdit: false });
});

// Add Product - Post
router.post('/products/add', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;
    
    // Use uploaded file if available, otherwise use URL
    let finalImageUrl = imageUrl && imageUrl.trim() ? imageUrl.trim() : null;
    if (req.file) {
      finalImageUrl = '/uploads/' + req.file.filename;
    }
    
    if (!finalImageUrl) {
      return res.render('admin/product-form', { 
        product: null, 
        isEdit: false, 
        error: 'Please provide either an image file or image URL' 
      });
    }
    
    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      category,
      imageUrl: finalImageUrl
    });
    await product.save();
    res.redirect('/admin/products');
  } catch (error) {
    // Delete uploaded file if error occurred
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.render('admin/product-form', { 
      product: null, 
      isEdit: false, 
      error: 'Error adding product: ' + error.message
    });
  }
});

// Edit Product - Form
router.get('/products/edit/:id', requireAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.redirect('/admin/products');
    }
    res.render('admin/product-form', { product, isEdit: true });
  } catch (error) {
    res.redirect('/admin/products');
  }
});

// Edit Product - Update
router.post('/products/edit/:id', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, available } = req.body;
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.redirect('/admin/products');
    }
    
    // Use uploaded file if available, otherwise use URL, otherwise keep existing
    let finalImageUrl = imageUrl || product.imageUrl;
    if (req.file) {
      // Delete old image if it's an uploaded file (not a URL)
      if (product.imageUrl && product.imageUrl.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '../../frontend/public', product.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      finalImageUrl = '/uploads/' + req.file.filename;
    }
    
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price: parseFloat(price),
      category,
      imageUrl: finalImageUrl,
      available: available === 'on'
    });
    res.redirect('/admin/products');
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.redirect('/admin/products');
  }
});

// Delete Product
router.post('/products/delete/:id', requireAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      // Delete associated image file if it's an uploaded file
      if (product.imageUrl && product.imageUrl.startsWith('/uploads/')) {
        const imagePath = path.join(__dirname, '../../frontend/public', product.imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await Product.findByIdAndDelete(req.params.id);
    }
    res.redirect('/admin/products');
  } catch (error) {
    res.redirect('/admin/products');
  }
});

// Orders Management - List
router.get('/orders', requireAuth, async (req, res) => {
  try {
    const status = req.query.status;
    const query = status && status !== 'all' ? { status } : {};
    const orders = await Order.find(query)
      .populate('items.product')
      .sort({ orderDate: -1 });
    res.render('admin/orders', { orders, selectedStatus: status || 'all' });
  } catch (error) {
    res.status(500).send('Error loading orders');
  }
});

// View Single Order
router.get('/orders/:id', requireAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.redirect('/admin/orders');
    }
    res.render('admin/order-detail', { order });
  } catch (error) {
    res.redirect('/admin/orders');
  }
});

// Update Order Status
router.post('/orders/update-status/:id', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    await Order.findByIdAndUpdate(req.params.id, { status });
    res.redirect(`/admin/orders/${req.params.id}`);
  } catch (error) {
    res.redirect('/admin/orders');
  }
});

module.exports = router;

