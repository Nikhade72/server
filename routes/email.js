const express = require('express');
const router = express.Router(); // Create a router instance
const nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'harshanikhade72@gmail.com', // Replace with your Gmail email address
        pass: 'kaew zpdw blzs qbuy',      // Replace with your Gmail password or an app-specific password
    },
});

// Define a route to send an email
router.post('/api/sendEmail', (req, res) => { // Updated route path
    // Define email details
    const mailDetails = {
        from: 'harshanikhade72@gmail.com',   // Replace with your Gmail email address
        to: 'harshanikhade29@example.com',   // Replace with the recipient's email address
        subject: 'Ticket Booking',
        html: '<p>Your Ticket Book successfully</p>',
    };

    // Send the email
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.error('Error occurred:', err);
            res.status(500).json({ error: 'An error occurred while sending the email.' });
        } else {
            console.log('Email sent successfully');
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

module.exports = router;
