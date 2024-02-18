const path = require("path");
const { PORT, EMAIL } = require("./config.json");

const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.ionos.fr",
    secureConnection: true,
    port: 465,
    auth: {
        user: EMAIL.user,
        pass: EMAIL.pass
    }
});

function postResMessage(res, msg) {
    res.send(`<script>window.close();alert("${msg}");</script>`);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/index.html"))
});

app.post("/send-mail", async (req, res) => {
    const mailData = req.body;
    if (mailData.hasOwnProperty("name") &&
        mailData.hasOwnProperty("forename") &&
        mailData.hasOwnProperty("email") &&
        mailData.hasOwnProperty("subject") &&
        mailData.hasOwnProperty("body")) {
        try {
            await sendMail(mailData);
            postResMessage(res, "Le mail a bien été envoyé ! Je vous réponds le plus rapidement possible !")
        } catch (e) {
            postResMessage(res, "Une erreur s'est produite lors de l'envois du mail : " + e.message);
        }
    } else {
        res.sendStatus(403);
    }
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});

async function sendMail(data) {
    new Promise((resolve, reject) => {
        const mailOptions = {
            from: `"${data.name} ${data.forename} - ${data.email}" <${EMAIL.user}>`,
            to: EMAIL.user,
            subject: data.subject,
            text: data.body
        };

        transporter.sendMail(mailOptions, (err, res) => {
            if (err) reject(err);
            else resolve();
        });
    });
}
