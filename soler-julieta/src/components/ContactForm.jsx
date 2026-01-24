import { useTranslation } from 'react-i18next'
import LabelForm from './LabelForm'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getContactSchema } from '../schemas/contact.schemas'
import contactService from '../services/contact.service'
import toast from 'react-hot-toast'
import { useState } from 'react'
import FormButton from './FormButton'
import { motion } from 'framer-motion'

export default function ContactForm()
{
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)

    const FADE_IN_UP = { 
        initial: { y: 20, opacity: 0 }, 
        animate: { y: 0, opacity: 1 } 
    }
    // Usa la misma configuración de viewport que usaste en ContactMe
    const VIEWPORT_SETTINGS = { once: true, amount: 0 }

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(getContactSchema(t))
    })
    
    const onSubmit = (data) => {
        setIsLoading(true)
        console.log("Datos enviados", data)
        contactService.sendEmail(data)
            .then((successData) => {
                toast.success(t(successData.msg), {
                    duration: 5000,
                    style: {
                        border: '1px solid',
                        padding: '16px',
                        color: '#27AE60',
                    }
                })

                setValue('name', '')
                setValue('email', '')
                setValue('message', '')
            })
            .catch((errorData) => {
                const errorKey = errorData.error?.msg || 'form_error_network'

                toast.error(t(errorKey), {
                    style: {
                        border: '1px solid #616161',
                        padding: '16px',
                        color: '#E74C3C',
                    }
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const fields = [
        { name: "name", type: "text", labelKey: "form_name_label" },
        { name: "email", type: "email", labelKey: "form_email_label" },
        { name: "message", type: "textarea", labelKey: "form_message_label" }
    ]

    return(
        <motion.form 
            onSubmit={handleSubmit(onSubmit)} 
            className="mt-5 lg:mt-0 p-8 lg:px-14 shadow-md border-2 rounded-lg"
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="animate"
            viewport={VIEWPORT_SETTINGS}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            {fields.map((field) => (
                <LabelForm
                    labelTxt={t(field.labelKey)}
                    inputType={field.type} 
                    register={register(field.name)}
                    error={errors[field.name]?.message}
                />
            ))}
            <FormButton 
                isLoading={isLoading}
                btnText={isLoading ? "sending_email" : "form_button"}
            />
        </motion.form>
    )
}