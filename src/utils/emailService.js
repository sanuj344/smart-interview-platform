const sgMail = require('@sendgrid/mail');

// Set API key from environment
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const msg = {
      to,
      from: process.env.FROM_EMAIL, // e.g., 'noreply@yourapp.com'
      subject,
      html,
    };

    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Email send failed:', error);
    // Don't throw error to avoid crashing app
  }
};

module.exports = { sendEmail };