import { useTranslation } from 'react-i18next'
import AdminForm from '../../components/AdminForm'
import CompSection from '../../components/CompSection'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPasswordSchema } from '../../schemas/account.schemas'
import ContentCentered from '../../components/ContentCentered'
import { useState } from 'react'
import authService from '../../services/auth.service'
import toast from 'react-hot-toast'
import LinkComponent from '../../components/LinkComponent'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage()
{
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const [formKey, setFormKey] = useState(0)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(forgotPasswordSchema)
    })

    const fields = [
        { name: "identifier", label: `${t("label_user")}`, type: 'text', register: register('identifier') }
    ]

    function handleResetPassword(data){
        console.log("La data enviada desde el front", data)
        setIsLoading(true)
        authService.forgotPassword({ identifier: data.identifier })
        .then(() => {
            setFormKey(prevKey => prevKey + 1)
            toast.success("Te enviamos un email para que recuperes tu contraseña.", {
                duration: 5000,
                style: {
                    border: '1px solid',
                    padding: '16px',
                    color: '#27AE60',
                } 
            })
        })
        .catch((errorData) => {
            const errorKey = errorData.error?.msg || 'forgot_password_error'
            toast.error(t(errorKey), {
                duration: 5000,
                style: {
                    border: '1px solid',
                    padding: '16px',
                    color: '#E74C3C',
                } 
            })
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return(
        <ContentCentered>
            <CompSection className="mt-0 lg:!mt-0 max-w-[600px]">
                <h1 className="text-2xl lg:text-4xl mb-5 xl:leading-none xl:-mt-1">¿Olvidaste tu contraseña?</h1>
                <p>Ingresá tu nombre de usuario o correo electrónico. Recibirás un enlace por email para crear una contraseña nueva.</p>
                <AdminForm 
                    key={formKey}
                    fields={fields}
                    onSubmit={handleResetPassword}
                    schema={forgotPasswordSchema}
                    txtButton="Recuperar mi contraseña"
                    isLoading={isLoading}
                />
                <LinkComponent 
                    txt="Volver al inicio de sesión"
                    linkRoute="/admin/login"
                    LinkIcon={ArrowLeft}
                />
            </CompSection>
        </ContentCentered>
    )
}