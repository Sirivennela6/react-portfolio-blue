import formidable from 'formidable';
import nodemailer from 'nodemailer';
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    const { senderEmail, message } = fields;
    const file = files.file;

    try {
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
          ? [{
              filename: file.originalFilename,
              path: file.filepath,
            }]
          : [],
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Email sending error:', error);
      return res.status(500).json({ message: 'Email sending failed.' });
    }
  });
}
