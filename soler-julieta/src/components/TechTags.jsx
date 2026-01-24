import {
    SiReact,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiTailwindcss,
    SiJavascript,
    SiHtml5,
    SiCss3,
    SiPhp,
    SiMysql
} from 'react-icons/si'

const iconMap = {
    "React": SiReact,
    "Node.js": SiNodedotjs,
    "Express": SiExpress,
    "MongoDB": SiMongodb,
    "TailwindCSS": SiTailwindcss,
    "JavaScript": SiJavascript,
    "HTML": SiHtml5,
    "CSS": SiCss3,
    "PHP": SiPhp,
    "MySQL": SiMysql
}

export default function TechTags({ tags })
{
    return(
        <ul className="flex flex-wrap text-sm mb-2">
            {tags.map((tag, index) => {
                const Icon = iconMap[tag]

                return(
                    <li 
                        key={index}
                        className="mr-1.5 last:mr-0 mb-1 flex items-center px-1.5 py-1 rounded-lg text-txtGrey border-2 border-txtGrey/10"
                    >
                    {Icon && <Icon className="text-sm" />}
                        <span className="ml-1 text-xs">{tag}</span>
                    </li>
                )
            })}
        </ul>
    )
}