import express from 'express';
import formidable from 'formidable';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

app.post('/send-email', (req, res) => {
  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    try {
      const { senderEmail, message } = fields;
      const file = files.file;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: `Message from ${senderEmail}`,
        text: message,
        replyTo: senderEmail,
        attachments: file
          ? [
              {
                filename: file.originalFilename,
                path: file.filepath,
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
});
app.get('/', (req, res) => {
    res.send('Node.js email sender is live!');
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
