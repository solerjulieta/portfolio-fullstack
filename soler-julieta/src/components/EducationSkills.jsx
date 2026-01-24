import { useTranslation } from "react-i18next"

export default function EducationSkills({ skills })
{
    const { i18n } = useTranslation()
    const lang = i18n.language?.slice(0,2) || "es"

    return(
        <ul className="flex flex-wrap text-txtGrey">
            {skills.map((skill, i) => {
                return(
                    <li key={i} className="mr-2 px-1.5 py-1 border-2 rounded-lg my-1 lg:text-sm">
                        <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 size-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>

                        {/*typeof skill === "object" && skill[lang] ? skill[lang] : skill*/}
                        {skill[lang]}

                        </div>
                    </li>
                )
            })}
        </ul>
    )
}