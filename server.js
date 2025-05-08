const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

// Nodemailer config (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables for sensitive data
    pass: process.env.EMAIL_PASS, // Use environment variables for sensitive data
  },
});

// Send Email API
app.post('/send-email', upload.single('file'), async (req, res) => {
  try {
    const { senderEmail, message } = req.body;
    const file = req.file;

    // Ensure recipientEmail is set in the environment variables
    const recipientEmail = process.env.RECIPIENT_EMAIL;

    if (!senderEmail || !message || !recipientEmail) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail, // Use recipientEmail from environment variable
      subject: `Message from ${senderEmail}`,
      text: message,
      replyTo: senderEmail,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ message: 'Email sending failed.' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
