require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodie-delights', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const createAdmin = async () => {
  await connectDB();
  
  const username = process.argv[2] || 'admin';
  const password = process.argv[3] || 'admin123';
  
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log(`Admin user "${username}" already exists!`);
      process.exit(0);
    }
    
    // Create new admin
    const admin = new Admin({ username, password });
    await admin.save();
    console.log(`Admin user "${username}" created successfully!`);
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log('\nYou can now login to the admin panel at http://localhost:3000/admin/login');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();

