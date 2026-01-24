import { useTranslation } from "react-i18next";
import CompSection from "../../components/CompSection";
import LabelForm from "../../components/LabelForm";
import { useForm } from "react-hook-form";
import { login as loginSchema } from '../../schemas/account.schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import authService from "../../services/auth.service"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LinkComponent from "../../components/LinkComponent";
import ContentCentered from "../../components/ContentCentered";
import AdminForm from "../../components/AdminForm";

export default function LoginPage()
{
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(loginSchema)
    })

    const fields = [
        { name: 'identifier', label: `${t("label_user")}`, type: 'text', register: register('identifier') },
        { name: 'password', label: `${t("label_pass")}`, type: 'password', register: register('password') }
    ]

    useEffect(() => {
        if(location.state && location.state.logoutSuccess){
            toast.success("Se cerró sesión.", {
                duration: 5000,
                style: {
                    border: '1px solid',
                    padding: '16px',
                    color: '#27AE60',
                } 
            })

            window.history.replaceState({}, document.title, location.pathname)
        }
    }, [location.state, location.pathname])

    function onSubmit(data){
        setIsLoading(true)
        authService.login({ identifier: data.identifier, password: data.password })
        .then(({ account }) => {
            navigate("/admin", { state: { loginSuccess: true } })
        })
        .catch((errorData) => {
            const errorKey = errorData.error?.msg || 'login_error'

            toast.error(t(errorKey), {
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
            <CompSection className="flex flex-col items-center mt-0 lg:!mt-0 max-w-[400px]">
                <img src="/icons/logo_login.svg" className="h-[84px] mb-4" />
                <AdminForm
                    fields={fields}
                    onSubmit={onSubmit}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    control={control}
                    txtButton="Acceder"
                    isLoading={isLoading}
                    className="w-full"
                />
                <LinkComponent
                    txt="Olvidé mi contraseña"
                    linkRoute="/admin/forgotpassword"
                />
            </CompSection>
        </ContentCentered>
    )
}