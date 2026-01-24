import { useTranslation } from 'react-i18next'
import EducationSkills from './EducationSkills'

export default function AcademicCard({ study })
{
    const { t } = useTranslation()
    const { i18n } = useTranslation()
    const lang = i18n.language?.slice(0,2) || "es"

    const subcategoryColors = {
        Web: "border-mainBlue",
        Software: "border-[#A8D5BA]",
        Idioma: "border-[#FFD8A8]",
        Especializaciones: "border-[#F7B2BD]",
        Lenguajes: "border-[#A8D8F0]"
    }

    const subcatKey = study.subcategory?.es || ""

    return(
        <li className="rounded-lg border border-cardBorder shadow lg:w-[600px] mb-4">
            <div className={`border-e-8 rounded-lg px-4 py-4 h-full ${ subcategoryColors[subcatKey] || "border-mainYellow"}`}>
                <div className="flex items-center">
                    {study.category === "degree" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                    )}
                    <h3 className="ml-2 lg:text-lg">{study.title?.[lang]}</h3>
                </div>
                <p className="mb-3">{study.institution?.[lang]}</p>
                <div className="flex text-txtGrey">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    <p className="ml-2 lg:text-sm">{study.start} - {study.end}</p>
                </div>
                <div className="flex text-txtGrey">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                    </svg>
                    <p className="ml-2 lg:text-sm">{study.mode[lang]}</p>
                </div>
                {study?.skills && (
                    <>
                        <h4 className="mt-3 mb-1 text-txtGrey">{t("title_skills")}</h4>
                        <EducationSkills skills={study.skills} />
                    </>
                )}
                {study?.soft_skills && (
                    <>
                        <h4 className="mt-3 mb-1 text-txtGrey">{t("title_soft")}</h4>
                        <EducationSkills skills={study.soft_skills} />
                    </>
                )}
            </div>
        </li>
    )
}