import nodemailer from 'nodemailer'
import 'dotenv/config'

// Configuración única
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
})

//Verificacion al boot
transporter.verify((error, success) => {
    if(error){
        console.error('SMTP VERIFY FAILED:', error)
    } else {
        console.log('SMTP READY')
    }
})

/**
 * Función genérica para enviar cualquier correo.
 * @param {object} mailOptions - Opciones de Nodemailer (to, subject, html, from, etc.)
 */
async function sendGenericEmail(mailOptions)
{
    return transporter.sendMail(mailOptions)
    .then(info => {
        console.log("Email enviado: %s", info.messageId)
        //Devolvemos el resultado (info) para el siguiente then()
        return info
    })
    .catch(error => {
        console.error("Error al enviar el email:", error)
        throw error
    })
}

export{
    sendGenericEmail
}