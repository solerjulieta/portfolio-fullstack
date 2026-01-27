import 'dotenv/config' //Para variables de entorno
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { sendGenericEmail } from './mailer.service.js'

// 1. Obtiene la URL del archivo actual (ej: file:///C:/.../contact.service.js)
const __filename = fileURLToPath(import.meta.url)
// 2. Obtiene el directorio a partir de la URL del archivo
const __dirname = path.dirname(__filename)

// 💡 MODIFICACIÓN DE RUTA: Ajustar la ruta si 'templates' está fuera del directorio 'services'
// Asumiendo que 'templates' está en el mismo nivel que la carpeta 'services':
const templatePath = path.resolve(__dirname, '..', 'templates', 'email-template.html')


async function sendEmail(emailData)
{
    let htmlContent

    try{
        htmlContent = await fs.readFile(templatePath, 'utf-8')
    } catch(error){
        console.error("Error al leer la plantilla de email", error)
        htmlContent = `Nombre: ${emailData.name}\nEmail: ${emailData.email}\nMensaje: ${emailData.message}`
    }

    if (htmlContent) {
        // Reemplazo simple para los placeholders {{...}}
        htmlContent = htmlContent
            .replace(/{{name}}/g, emailData.name)
            .replace(/{{email}}/g, emailData.email)
            .replace(/{{message}}/g, emailData.message)
    }

    const mailOptions = {
        from: 'Contacto Portfolio <onboarding@resend.dev>',
        to: process.env.MY_WORK_EMAIL,
        subject: `Nuevo contacto desde el Portfolio: ${emailData.name}`,
        reply_to: emailData.email,
        text: `Nombre: ${emailData.name}\nEmail: ${emailData.email}\nMensaje: ${emailData.message}`, 
        html: htmlContent
    }

    return await sendGenericEmail(mailOptions)
}

export{
    sendEmail
}