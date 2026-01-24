import nodemailer from 'nodemailer'
import 'dotenv/config'

// Configuración única
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
    }
})

/**
 * Función genérica para enviar cualquier correo.
 * @param {object} mailOptions - Opciones de Nodemailer (to, subject, html, from, etc.)
 */
function sendGenericEmail(mailOptions)
{
    return transporter.sendMail(mailOptions)
    .then(info => {
        console.log("Email enviado: %s", info.messageId)
        //Devolvemos el resultado (info) para el siguiente then()
        return info
    })
    .catch(error => {
        console.error("Error al enviar el email:", error)
        throw new Error("Fallo al enviar el correo: " + error.message)
    })
}

export{
    sendGenericEmail
}