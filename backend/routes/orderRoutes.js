const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Create new order
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, customerAddress, items } = req.body;
    
    // Validate and populate items with product details
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.available) {
        return res.status(400).json({ error: `Product ${item.productId} not available` });
      }
      
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }
    
    const order = new Order({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items: orderItems,
      totalAmount
    });
    
    await order.save();
    res.json({ success: true, orderId: order._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

