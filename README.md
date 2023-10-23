USE:

send a POST request to:
https://us-central1-nw-contact-form-mail-sender.cloudfunctions.net/sendEmailFromContactForm

with the following data structure:

const data = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hola, esto es una prueba.',
    to: 'ventas@novaworks.com.ar',
    subject: 'XRS contact form'
};
