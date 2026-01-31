import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import LanguageButton from './LanguageButton'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import CVButton from './CVButton'

function CompNavbar({ onDownloadCV })
{
    const { t } = useTranslation()
    const { scrollY } = useScroll()
    const background = useTransform(
        scrollY,
        [0, 100],
        //["rgba(0, 183, 255, 0)", "rgb(255, 255, 255)"]
        ["rgba(255, 255, 255, 0)", "rgb(255, 255, 255)"]
    )
    const height = useTransform(scrollY, [0, 100], [60, 60])
    const boxShadow = useTransform(
        scrollY,
        [0, 10],
        ["0px 0px 0px rgba(0,0,0,0)", "0px 2px 10px rgba(0,0,0,0.1)"]
    )
    const [isOpen, setIsOpen] = useState(false)

    const liOptions = [
        { 
            txt: 'menu.home',
            route: '#',
            show: true 
        },
        { 
            txt: 'menu.about',
            route: '#sobre-mi',
            show: true 
        },
        {
            txt: 'menu.education',
            route: '#education',
            show: true
        },
        { 
            txt: 'menu.projects',
            route: '#mis-proyectos',
            show: true 
        },
        { 
            txt: 'menu.contact',
            route: '#contacto',
            show: true 
        },
        { 
            txt: 'menu.cv',
            route: '#', 
            show: false
        },
    ]

    return(
        <motion.nav
            id="navigation"
            style={{
                background,
                height,
                boxShadow
            }}
            className="fixed w-full h-[72px] md:flex items-center justify-center md:py-12"
        >
        <div className="flex h-full items-center justify-between mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
            <a href="">
                <img src="/img/logo-solerjulieta.png" className="h-[26px] lg:h-[28px]" />
            </a>
            <div className="flex lg:items-center lg:flex-row-reverse">
                <div className="relative shrink-0">
                    <LanguageButton />
                </div>

                {/* Botón hamburguesa */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden z-50 ml-2 lg:ml-0"
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                        </svg>
                    )}
                </button>
            

            {/** PC menú */}
            <ul className="hidden md:flex">
                {liOptions
                    .filter(li => li.show)
                    .map(liOption => (
                        <li className="ml-2">
                            <a className="hover:text-[#9966cc] active:text-[#9966cc] pr-[14px] pl-[14px]" href={liOption.route}>
                                {t(liOption.txt)}
                            </a>
                        </li>
                ))}
            </ul>
            </div>
            

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-[59px] left-0 w-screen h-screen bg-white flex flex-col px-8 pt-16 space-y-6 text-[17px] font-semibold md:hidden"
                    >
                        {liOptions.map((liOption, i) => (
                            liOption.txt === 'menu.cv' ? (
                                <CVButton
                                    txtButton={t(liOption.txt)}
                                    onClick={() => {
                                        onDownloadCV()
                                        setIsOpen(false)
                                    }}
                                />
                            ) : (
                                <a
                                    key={i}
                                    href={liOption.route}
                                    onClick={() => setIsOpen(false)}
                                    className="hover:text-[#9966cc] active:text-[#9966cc] flex items-center justify-between"
                                >
                                    {t(liOption.txt)}
                                    <ChevronRightIcon className='h-4' />
                                </a>
                            )
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        </motion.nav>
    )
}

export default CompNavbar