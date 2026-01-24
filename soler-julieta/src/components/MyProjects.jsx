import { useTranslation } from 'react-i18next'
import CompSection from './CompSection'
import ProjectCard from './ProjectCard'
import Subtitle from './Subtitle'
import { useEffect, useState } from 'react'
import projectsService from '../services/projects.service'
import { AnimatePresence, motion } from 'framer-motion'
import AnimateH2 from './AnimateH2'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { ITEMS_PER_SCREEN } from '../constants/layout'
import { useLoadMore } from '../hooks/useLoadMore'
import LoadMoreButton from './LoadMoreButton'
import { set } from 'react-hook-form'

export default function MyProjects()
{
    const { t } = useTranslation()
    const [projects, setProjects] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("all")
    const breakpoint = useBreakpoint()
    //const initialLimit = ITEMS_PER_SCREEN[breakpoint]
    const [headerReady, setHeaderReady] = useState(false)
    const baseLimit = ITEMS_PER_SCREEN[breakpoint]

    /*
    const FADE_IN_UP = { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } };
    const VIEWPORT_SETTINGS = { once: true, amount: 0, margin: "0px 0px -150px 0px" }*/
    const sectionVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            y: -24,
            transition: { duration: 0.3, ease: "easeIn" }
        }
    }

    useEffect(() => {
        projectsService.getAll()
        .then(data => {
            const publishedProjects = data.filter(
                item => item.status?.key === "PUBLISHED"
            )
            setProjects(publishedProjects)
            console.log("los proyectos son", publishedProjects)
        })
    }, [])

    const totalGraphic = projects.filter(p => p.category?.key === "Graphic").length
    const totalWeb = projects.filter(p => p.category?.key === "Web").length

    const filteredProjects = selectedCategory === "all"
        ? projects 
        : projects.filter(project => project.category?.key === selectedCategory)

    const initialLimit = 
        selectedCategory === "all"
            ? baseLimit
            : filteredProjects.length

    /**Ver más */
    const {
        visibleItems: visibleProjects,
        hasMore,
        loadMore
    } = useLoadMore(
        filteredProjects,
        initialLimit,
        initialLimit,
        [selectedCategory, breakpoint]
    )

    return(
        <CompSection compId="mis-proyectos" className="relative mt-20 scroll-mt-[90px] lg:scroll-mt-[150px]">
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-120px" }}
            >
            <div className="grid grid-cols-1 xl:grid-cols-[auto,1fr] xl:items-start xl:gap-y-6 relative">
                <div className="xl:mr-4">
                    <Subtitle 
                        subtitle={t("subtitle_projects")} 
                        controlled
                        variants={itemVariants}
                    />
                </div>
                <div>
                    <AnimateH2 
                        title={t("title_projects")} 
                        controlled
                        variants={itemVariants}
                    />
            <motion.ul 
                className="flex flex-wrap gap-x-4 ul-links font-bold mb-6"
                variants={itemVariants}
                onAnimationComplete={() => setHeaderReady(true)}
            >
                <li>
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`transition ${selectedCategory === "all" ? "text-mainViolet" : "text-txtGrey"} hover:text-darkViolet transition-colors duration-300`}
                    >
                        {t("all_projects")}
                        ({projects.length})
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setSelectedCategory("Web")}
                        className={`transition ${selectedCategory === "Web" ? "text-mainViolet" : "text-txtGrey"} hover:text-darkViolet transition-colors duration-300`}
                    >
                        {t("web_projects")}
                        ({totalWeb})
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setSelectedCategory("Graphic")}
                        className={`transition ${selectedCategory === "Graphic" ? "text-mainViolet" : "text-txtGrey"} hover:text-darkViolet transition-colors duration-300`}
                    >
                        {t("graphic_projects")}
                        ({totalGraphic})
                    </button>
                </li>
            </motion.ul>
            <motion.ul 
                className="md:grid md:items-stretch md:grid-cols-2 md:gap-6 xl:gap-4 xl:grid-cols-3 my-4"
            >
                <AnimatePresence mode="sync">
                {headerReady && visibleProjects.map((project, index) => {
                    return(
                        <motion.li 
                            key={project._id}
                            //layout 
                            className="h-full"
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ delay: index * 1 }}
                        >
                            <ProjectCard project={project} index={index} />
                        </motion.li>
                    )
                })}
                </AnimatePresence>
            </motion.ul>
            <LoadMoreButton
                show={hasMore}
                onClick={loadMore}
                label={t("see_more")} 
            />
                </div>
            </div>
            </motion.div>
        </CompSection>
    )
}