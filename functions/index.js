const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mensajes@novaworks.com.ar',
        pass: 'ozqprhtcybdkdzoz'
    }
});

exports.sendEmailFromContactForm = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if (request.method !== "POST") {
            return response.status(400).json({ error: "Método no permitido" });
        }

        const { name, email, message, to, subject } = request.body;

        let data = "Nombre: " + name + " \nEmail: " + email + "\nMensaje: " + message;

        let mailOptions = {
            from: "mensajes@novaworks.com.ar",
            to: to,
            subject: subject,
            text: data
        };

        if(email.indexOf('@') === -1 || email.indexOf('.') === -1){
            return response.status(400).json({ error: "Email inválido" });
        }

        if(!name || !email || !message || !to || !subject){
            return response.status(400).json({ error: "Faltan datos" });
        } else {
            return transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    console.log(error)
                    return response.status(500).send(error.message);
                }
                return response.status(200).send('Email sent');
            });
        }
    });
});
