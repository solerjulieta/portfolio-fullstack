import CompSection from './CompSection'
import CVButton from './CVButton'
import Subtitle from './Subtitle'
import { useTranslation } from 'react-i18next'
import SocialButtons from './SocialButtons'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AboutMe({ onDownloadCV })
{
    const { t } = useTranslation()
    const [isCVModalOpen, setIsCVModalOpen] = useState(false)

    // 2. Definir las variantes de los elementos hijos (para fade-in y subida)
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, ease: "easeOut" } 
        },
    }

    // 3. Definir la variante del contenedor (para el stagger)
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            // stagggerChildren hace que los hijos se animen secuencialmente
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.1, 
            },
        },
    }

    return(
        <CompSection compId="sobre-mi" className="mt-20 scroll-mt-[90px] lg:scroll-mt-[150px] lg:flex lg:items-center">
                <motion.picture
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
                    className="flex justify-center lg:block"
                >
                    <source 
                        media="(min-width: 768px)"
                        srcSet="img/pc-soler-julieta.png"
                    />
                    <img src="/img/mb-soler-julieta.png" alt="Julieta Soler" className="mb-5 lg:mb-0 lg:mr-32 lg:self-center" /> 
                </motion.picture>

                {/* Este es el contenedor clave que necesita 'lg:relative' y 'lg:flex' para su contenido */}
                <motion.div 
                    className="xl:flex xl:items-start xl:relative"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                > 
                    {/* Contenedor del subtítulo - se posiciona absolutamente en desktop */}
                    <motion.div 
                        variants={itemVariants}
                        className="xl:mr-4"
                    >
                        {/* El Subtitle ahora tiene la clase 'desktop-subtitle-text' para aplicar los estilos de rotación y línea */}
                        <Subtitle subtitle={t("subtitle_about")} />
                    </motion.div>
                    
                    {/* Contenido principal del about me */}
                    <div> {/* Ajusta este padding-left para dar espacio al subtítulo vertical */}
                        <motion.h2 
                            className="text-2xl lg:text-4xl mb-5"
                            variants={itemVariants}
                        >
                            {t("title_about")}</motion.h2>
                        <motion.p 
                            className="text-txtGrey lg:w-[500px] xl:w-[600px] lg:text-lg" 
                            dangerouslySetInnerHTML={{ __html: t("bio_about") }}
                            variants={itemVariants}
                        />
                        <motion.ul 
                            className="mt-5 flex items-center"
                            variants={itemVariants}
                        >
                            <li className="mr-2">
                                <SocialButtons 
                                    hRef="https://www.linkedin.com/in/julieta-soler"
                                    srcIcon="/icons/linkedin_1.svg"
                                    imgClassName="w-6 h-6"
                                />
                            </li>
                            <li className="mr-2">
                                <SocialButtons 
                                    hRef="https://github.com/solerjulieta"
                                    srcIcon="/icons/github.svg"
                                    imgClassName="w-6 h-6"
                                />
                            </li>
                            <li>
                                <CVButton 
                                    txtButton={t("cv_button")} 
                                    className="mb-4 w-40 lg:w-36 transition delay-150 duration-300 ease-in-out hover:scale-[1.02]"
                                    onClick={() => onDownloadCV} 
                                />
                            </li>
                        </motion.ul>
                    </div>
                </motion.div>
        </CompSection>
    )
}