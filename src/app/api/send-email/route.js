import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ message: 'Missing required fields' }),
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: 'go@mytimsea.com', 
            to: 'go@mytimsea.com',
            subject: `New Message from ${name}`,
            text: `
                You have received a new message from:
                
                Name / Company: ${name}
                Email: ${email}
                
                Inquiry:
                ${message}
            `,
        };

        await transporter.sendMail(mailOptions);

        return new Response(
            JSON.stringify({ message: 'Email sent successfully' }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to send email', error: error.message }),
            { status: 500 }
        );
    }
}
