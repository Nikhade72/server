const nodemailer = require('nodemailer');
// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use the email service you prefer (e.g., Gmail)
    auth: {
      user: 'your_email@gmail.com', // Your email address
      pass: 'your_password', // Your email password (use environment variables for security)
    },
  });
  
  module.exports = transporter;