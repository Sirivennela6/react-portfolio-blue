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
    user: 'sirivennela6166@gmail.com', // Hardcoded sender
    pass: 'bcclaymtgnitmnbx',         // Gmail App password
  },
});

app.post('/send-email', upload.single('file'), async (req, res) => {
  try {
    const { senderEmail, recipientEmail, message } = req.body;
    const file = req.file;

    // Validation
   

    const mailOptions = {
      from: 'sirivennela6166@gmail.com',
      to: "ganeshdhanasri7@gmail.com",
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
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Email sending failed.' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
