const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.ethereal.gmail",
    port: 587,
    secure: false,
    auth: {
        user: "gocabsbooking49@gmail.com", // Your Gmail email address
        pass: "xvtx iazo apyp btpq",       // Your Gmail password or an "App Password"
    },
});

// Define your email content
async function sendConfirmationEmail(obj) {
    console.log(obj.email);
    try {
        const info = await transporter.sendMail({
            from: 'gocabsbooking49@gmail.com', // Sender's email address
            to: obj.email,               // Recipient's email address collected from the booking form
            subject: "Your Booking is confirmed",
            html: `
            <h1>Hello,</h1>
            <p>Your ZenFlow booking has been confirmed!</p>
            <p>Details of your booking:</p>
            <ul>
                <li>Date-Time : ${new Date().toLocaleString()}</li>
                <li>Timing: ${obj.timing}</li>
                <li>Month: ${obj.month}</li>
                <li>Year: ${obj.year}</li>
            </ul>
            <p>Thank you for choosing our cab service. Have a great trip!</p>
        `,
        });

        console.log(info.messageId); // Random ID generated after a successful send (optional)
    } catch (error) {
        console.error("Error sending confirmation email:", error);
    }
}

module.exports = { sendConfirmationEmail };