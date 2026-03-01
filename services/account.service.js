import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'
import { sendGenericEmail } from './mailer.service.js'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const templatePath = path.resolve(__dirname, '..', 'templates', 'reset-password.html')
const baseUrl = 'https://julieta-soler.vercel.app'

const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017'
//const client = new MongoClient('mongodb://127.0.0.1:27017')
const client = new MongoClient(uri)
//const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('DB_JS')
const users = db.collection('Users')

async function register(account)
{
    await client.connect()

    const existingEmail = await users.findOne({ email: account.email })
    const existingUser = await users.findOne({ user: account.user })

    if(existingEmail){
        throw new Error('Ya existe un usuario con este email.')
    }

    if(existingUser){
        throw new Error('Usuario no disponible.')
    }

    const newUser = { ...account }

    //encriptar password
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    await users.insertOne(newUser)

    return newUser
}

async function login(user)
{
    await client.connect()

    const query = user.email
        ? { email: user.email }
        : { user: user.user }

    const existingAccount = await users.findOne(query)

    if (!existingAccount) {
        throw new Error(user.email 
            ? 'No existe un usuario registrado con este email.'
            : 'No existe este usuario.');
    }
    
    const passwordMatch = await bcrypt.compare(user.password, existingAccount.password)

    if(!passwordMatch){
        throw new Error('La contraseña es incorrecta.')
    }

    return { ...existingAccount, password: undefined }
}

async function forgotPassword(user)
{
    await client.connect()

    const query = user.email
        ? { email: user.email }
        : { user: user.user }

    const existingAccount = await users.findOne(query)

    console.log("La cuenta existe desde el service", existingAccount)

    if(!existingAccount){
        throw new Error(user.email
            ? 'No existe un usuario registrado con este email.'
            : 'No existe este usuario.')
    }

    //Genero un token seguro
    const token = crypto.randomBytes(32).toString('hex')
    const expires = Date.now() + 3600000 //1 hora desde ahora

    //Guardar el token y su fecha de expiración en la base de datos
    await users.updateOne(
        { _id: new ObjectId(existingAccount._id) },
        { $set: { resetPasswordToken: token, resetPasswordExpires: expires } }
    )

    const recoveryLink = `${baseUrl}/admin/forgotpassword/${token}`
    let htmlContent

    try{
        htmlContent = await fs.readFile(templatePath, 'utf-8')
        htmlContent = htmlContent.replace(/{{LINK_RECUPERACION}}/g, recoveryLink)
    } catch(error){
        console.error("Error al leer la plantilla de reset password", error)
        htmlContent = `<p>Para restablecer tu clave, haz clic aquí: <a href="${recoveryLink}">${recoveryLink}</a>. Este enlace expira en una hora.</p>`
    }

    const mailOptions = {
        from: 'Admin Portfolio <no-reply@jotaportfolio.com',
        to: existingAccount.email,
        subject: 'Recuperar mi contraseña',
        html: htmlContent
    }

    await sendGenericEmail(mailOptions)

    return { success: true, email: existingAccount.email }
}

async function recoveryPassword(token, newPassword)
{
    await client.connect()

    console.log("El token y password que llegan", token, newPassword)

    const user = await users.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() } //Aseguramos que el token no haya expirado.
    })

    console.log("Se encontró usuario:", user)

    if(!user){
        throw new Error('El token es inválido o ha expirado.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    return users.updateOne(
        { _id: new ObjectId(user._id) },
        { 
            $set: { password: hashedPassword },
            $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 }
        }
    )
}

export {
    register,
    login,
    forgotPassword,
    recoveryPassword
}