require('dotenv').config();
const User = require('../models/User');

async function initAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@virtuverse.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
    const adminName = process.env.ADMIN_NAME || 'Admin User';

    // Check if admin already exists
    const existingAdmin = User.findByEmail(adminEmail);
    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log(`Email: ${adminEmail}`);
      return;
    }

    // Create admin user
    const userId = await User.create(adminEmail, adminPassword, adminName, 'admin');
    
    console.log('Admin user created successfully!');
    console.log('=================================');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log(`User ID: ${userId}`);
    console.log('=================================');
    console.log('IMPORTANT: Change the password after first login in production!');
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

initAdmin();
