import nodemailer from "nodemailer";

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;
const transporter = nodemailer.createTransport({
    // @ts-ignore
    host: "smtp.ionos.fr",
    secureConnection: true,
    port: 465,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
});

function sendMail({ name, forename, email, subject, body }: {
    name: string;
    forename: string;
    email: string;
    subject: string;
    body: string;
}) {
    return new Promise<void>((resolve, reject) => {
        const mailOptions = {
            from: `"${name} ${forename} - ${email}" <${EMAIL_USER}>`,
            to: EMAIL_USER,
            subject: subject,
            text: body
        };

        transporter.sendMail(mailOptions, err => {
            if (err) reject(err);
            else resolve();
        });
    });
}

export async function POST(req: Request) {
    const data = await req.json();
    const {name, forename, email, subject, body} = data;
    if (!name || !forename || !email || !subject || !body) {
        return new Response(null, {status: 400});
    }
    try {
        await sendMail(data);
        return new Response(null, {status: 200});
    } catch (error) {
        console.error(error);
        return new Response(null, {status: 500});
    }
}