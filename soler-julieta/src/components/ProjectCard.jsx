import { useTranslation } from 'react-i18next'
import TechTags from './TechTags'
import { Github, Eye, GithubIcon } from 'lucide-react'
import CustomButton from './CustomButton'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import projectEventService from '../services/projectEvent.service'

export default function ProjectCard({ project, index })
{
    const { i18n } = useTranslation()
    const lang = i18n.language?.slice(0,2) || "es"

    //Crear una referencia para observar el elemento
    //const ref = useRef(null)
    //Usar useInView para saber si el elemento es visible
    //const isInView = useInView(ref, { once: true, amount: 0.2 }) //// 'once: true' solo anima la primera vez. 'amount: 0.2' significa que debe ser 20% visible.

    function registerEvent(action){
        console.log("hizo clic", action)
        projectEventService.register({
            projectId: project._id,
            projectType: project.category?.key === "Web" ? "web" : "graphic",
            action,
            lang
        })
    }

    return(
        <motion.div 
            //ref={ref}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            onClick={() => registerEvent("project_view")}
            className="rounded-lg border border-cardBorder shadow h-full flex flex-col mb-4 lg:mb-0"
        >
            <div className="rounded-lg flex flex-col h-full">
                <img src={`/img/projects/${project.img}`} className="rounded-t-lg" />
                <div className="p-[1.5rem] flex-grow flex flex-col">
                    <h3 className="mb-1.5 lg:text-lg">{project.title}</h3>
                    <p className="text-sm lg:text-base text-txtGrey mb-4">{project.description?.[lang]}</p>
                    {project.tech?.[lang] && (
                        <TechTags tags={project.tech?.[lang]} />
                    )}
                    <div className="mt-auto">
                        {project.demo_link && (
                            <CustomButton 
                                hRef={project.demo_link}
                                txt="Demo"
                                Icon={Eye}
                                className="bg-mainViolet text-white hover:bg-darkViolet"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    registerEvent("demo_click")
                                }}
                            />
                        )}
                        {project.github_link && (
                            <CustomButton 
                                hRef={project.github_link}
                                txt="Github"
                                Icon={Github}
                                className="border-2 border-mainViolet/10 text-mainViolet hover:border-darkViolet hover:text-darkViolet"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    registerEvent("github_click")
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

