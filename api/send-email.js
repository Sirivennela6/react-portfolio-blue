import nodemailer from 'nodemailer';
import nextConnect from 'next-connect';
import multer from 'multer';

export const config = {
  api: {
    bodyParser: false, // Allow multer to handle multipart/form-data
  },
};

const upload = multer();
const handler = nextConnect();

handler.use(upload.single('file'));

handler.post(async (req, res) => {
  try {
    const { senderEmail, message } = req.body;
    const file = req.file;

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
        ? [{ filename: file.originalname, content: file.buffer }]
        : [],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Email sending failed.' });
  }
});

export default handler;
