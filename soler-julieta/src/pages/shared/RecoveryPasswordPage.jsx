import { useState } from 'react'
import CompSection from '../../components/CompSection'
import ContentCentered from '../../components/ContentCentered'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import AdminForm from '../../components/AdminForm'
import { recoveryPasswordSchema } from '../../schemas/account.schemas'
import { useNavigate, useParams } from 'react-router-dom'
import authService from '../../services/auth.service'
import toast from 'react-hot-toast'

export default function RecoveryPasswordPage()
{
    const { token } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [formKey, setFormKey] = useState(0)
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(recoveryPasswordSchema)
    })

    const fields = [
        { name: "newPassword", label: "Nueva contraseña", type: "password", register: register('newPassword') },
        { name: "confirmPassword", label: "Confirmar contraseña", type: "password", register: register('confirmPassword') },
    ]

    function handleRecoveryPassword(data){
        console.log("Las contraseñas son ", token , data)
        setIsLoading(true)
        authService.recoveryPassword(token, data)
        .then(() => {
            setFormKey(prevKey => prevKey + 1)
            console.log("La contraseña fue restablecida")
            toast.success("¡Contraseña reestablecida! Redirigiendo al inicio de sesión...", {
                duration: 5000,
                style: {
                    border: '1px solid',
                    padding: '16px',
                    color: '#27AE60',
                }
            })
            setTimeout(() => navigate('/admin/login'), 3000)
        })
        .catch((errorData) => {
            const errorKey = errorData.error?.msg || 'recovery_password_error'
            toast.error(errorKey, {
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
            <CompSection className="mt-0 lg:!mt-0 lg:w-[600px]">
                <h1 className="text-2xl lg:text-4xl mb-5 xl:leading-none xl:-mt-1">Establecer nueva contraseña</h1>
                <AdminForm 
                    key={formKey}
                    fields={fields}
                    onSubmit={handleRecoveryPassword}
                    schema={recoveryPasswordSchema}
                    txtButton="Confirmar"
                    isLoading={isLoading}
                />
            </CompSection>
        </ContentCentered>
    )
}