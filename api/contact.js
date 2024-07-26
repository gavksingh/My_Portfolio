const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).send('Please complete the form and try again.');
      return;
    }

    // Configure your SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `${name} <${email}>`,
      to: 'ksingh.gav@gmail.com',
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Thank you! Your message has been sent.');
    } catch (error) {
      res.status(500).send('Oops! Something went wrong and we couldn\'t send your message.');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
