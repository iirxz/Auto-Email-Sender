// This is a Node.js serverless function
// You must install "nodemailer" for this to work
// Run: npm install nodemailer
const nodemailer = require('nodemailer');

// This function will be triggered by the frontend
export default async function handler(request, response) {
    // 1. Only allow POST requests
    if (request.method !== 'POST') {
        return response.status(405).json({ message: 'Method Not Allowed' });
    }

    // 2. Get data from the form
    const { email_to, subject, body_content } = request.body;

    // 3. Create a "transporter" - this is the service that sends the email
    // We use environment variables (process.env.VARIABLE_NAME)
    // to keep your login details SECURE.
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_APP_PASSWORD, 
        },
    });

    // 4. Define the email's content
    let mailOptions = {
        from: `Aurora Skins <${process.env.GMAIL_USERNAME}>`, // Change "Your Name"
        to: email_to,
        subject: subject,
        html: `<p>${body_content}</p>`, // Use HTML for the body

    };

    // 5. Try to send the email
    try {
        await transporter.sendMail(mailOptions);
        return response.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error sending email' });
    }
}
