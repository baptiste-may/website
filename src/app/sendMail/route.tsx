import nodemailer from "nodemailer";

const {EMAIL_USER, EMAIL_PASSWORD} = process.env;
const transporter = nodemailer.createTransport({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    host: "smtp.ionos.fr",
    secureConnection: true,
    port: 465,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
});

/**
 * Send an email to the address specified in the `EMAIL_USER` environment
 * variable from the email address specified in `email` with the subject
 * `subject` and the body `body`.
 *
 * @param name - The sender's name.
 * @param forename - The sender's forename.
 * @param email - The sender's email address.
 * @param subject - The email subject.
 * @param body - The email body.
 *
 * @returns {Promise<void>} A promise that resolves or rejects based on the
 * success or failure of the email delivery.
 */
function sendMail({name, forename, email, subject, body}: {
    name: string;
    forename: string;
    email: string;
    subject: string;
    body: string;
}): Promise<void> {
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