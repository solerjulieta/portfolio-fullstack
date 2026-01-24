import * as yup from 'yup'

const login = yup.object({
    identifier: yup.string().required("Debes ingresar tu usuario o email.")
    .test(
        "is-valid-identifier",
        "El usuario o email no son válidos",
        (value) => {
            if(!value) return false

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/ // letras, números y guiones bajos, entre 3 y 20 caracteres

            return emailRegex.test(value) || usernameRegex.test(value)
        }
    ),
    password: yup.string().required("La contraseña es requerida.")
})

const forgotPasswordSchema = yup.object({
        identifier: yup.string().required("Debes ingresar tu usuario o email.")
    .test(
        "is-valid-identifier",
        "El usuario o email no son válidos",
        (value) => {
            if(!value) return false

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/ // letras, números y guiones bajos, entre 3 y 20 caracteres

            return emailRegex.test(value) || usernameRegex.test(value)
        }
    ),
})

const recoveryPasswordSchema = yup.object({
    newPassword: yup.string().required("La contraseña es requerida"),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden.').required('Debe confirmar la nueva contraseña.')
})

export{
    login,
    forgotPasswordSchema,
    recoveryPasswordSchema
}