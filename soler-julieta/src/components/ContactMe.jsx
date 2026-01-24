import { useTranslation } from 'react-i18next'
import CompSection from './CompSection'
import Subtitle from './Subtitle'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getContactSchema } from '../schemas/contact.schemas'
import ContactForm from './ContactForm'
import AnimateH2 from './AnimateH2'
import { motion, stagger } from 'framer-motion'

export default function ContactMe()
{
    const { t } = useTranslation()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(getContactSchema(t))
    })

    /*
    const FADE_IN_UP = { 
        initial: { y: 20, opacity: 0 }, 
        animate: { y: 0, opacity: 1 } 
    }
    const VIEWPORT_SETTINGS = { once: true, amount: 0 }*/

    const sectionVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }

    return(
        <CompSection compId="contacto" className="mt-20 scroll-mt-[90px] lg:scroll-mt-[150px]">
            <motion.div 
                className="grid grid-cols-1 xl:grid-cols-[auto,1fr] xl:items-start xl:gap-y-6 relative"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-120px" }}
            >
                <div className="xl:mr-4">
                    <Subtitle 
                        subtitle={t("subtitle_contact")} 
                        controlled
                        variants={itemVariants}
                    />
                </div>
                <div>
                    <AnimateH2 
                        title={t("title_contact")}
                        controlled
                        variants={itemVariants} 
                    />
                    <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
                        <div className="text-txtGrey lg:text-lg">
                            <motion.h3 
                                className="text-bold mb-4"
                                variants={itemVariants}
                            >
                                {t("h3_contact")}
                            </motion.h3>
                            <motion.p 
                                className="mb-2"
                                dangerouslySetInnerHTML={{ __html: t("p1_contact") }}
                                variants={itemVariants}
                            />
                            <motion.p 
                                dangerouslySetInnerHTML={{ __html: t("p2_contact") }}
                                variants={itemVariants}
                            />
                        </div>
                        <motion.div variants={itemVariants}>
                            <ContactForm />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </CompSection>
    )
}