import { useTranslation } from 'react-i18next'
import CompSection from './CompSection'

export default function FoundMe()
{
    const { t } = useTranslation()

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
            txt: 'menu.projects',
            route: '#mis-proyectos',
            show: true 
        },
    ]

    return(
        <div className='mt-20 lg:mt-40 bg-gray-50 border-t border-gray-200'>
        <CompSection className="scroll-mt-[90px] lg:scroll-mt-[150px] lg:pl-[40px] mt-10 lg:!mt-20">
                <ul className="flex flex-col lg:flex-row lg:justify-between">
                    <li>
                        <h3 className="mb-4 lg:text-lg">{t("li_contact")}</h3>
                        <ul>
                            <li className="hover:text-mainViolet mb-2">
                                <a href="mailto:solerjulietanatali@gmail.com" target="_blank" className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 lg:size-5 mr-1.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                                solerjulietanatali@gmail.com
                                </a>
                            </li>
                            <li className="flex mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 lg:size-5 mr-1.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                Córdoba, Argentina
                            </li>
                            <li className="hover:text-mainViolet">
                                <a href="" target="_blank" className="flex mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 lg:size-5 mr-1.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                                {t("cv_button")}
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h3 className="mb-4 lg:text-lg">{t("li_media")}</h3>
                        <ul className="flex">
                            <li className="mr-1">
                                <a href="https://www.linkedin.com/in/julieta-soler" target="_blank" className="flex mb-4 w-10 h-10 bg-white border-2 rounded-full flex items-center justify-center shadow-inner hover:shadow-mainViolet">
                                    <img src="/icons/linkedin_1.svg" className="w-5 h-5" />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/solerjulieta" target="_blank" className="flex mb-4 w-10 h-10 bg-white border-2 rounded-full flex items-center justify-center shadow-inner hover:shadow-mainViolet">
                                    <img src="/icons/github.svg" className="w-5 h-5" />
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h3 className="mb-4 lg:text-lg">{t("li_quick")}</h3>
                        <ul>
                            {liOptions.map((liOption, i) => (
                                <li className="hover:text-mainViolet">
                                    <a href={liOption.route}>{t(liOption.txt)}</a>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="mt-4 lg:mt-0">
                        <h3 className="lg:text-lg mb-4">{t("li_tech")}</h3>
                        <ul>
                            <li className="flex">
                                React.js
                            </li>
                            <li className="flex">
                                Tailwind CSS
                            </li>
                            <li className="flex">
                                Node.js
                            </li>
                            <li className="flex">
                                Mongo DB
                            </li>
                        </ul>
                    </li>
                </ul>
                <hr className="border-t border-gray-300 my-8" />
                <footer className="text-center mb-8">
                    <p className="text-sm">&copy; 2025 Julieta Natalí Soler. {t("all_rights")}</p>
                </footer>
        </CompSection>
        </div>
    )
}