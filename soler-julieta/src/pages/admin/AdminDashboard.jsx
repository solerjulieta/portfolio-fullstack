import { useTranslation } from 'react-i18next'
import CompSection from '../../components/CompSection'
import AdminCard from '../../components/AdminCard'
import { useEffect, useState } from 'react'
import cvService from '../../services/cv.service'
import { AcademicCapIcon, ArrowTrendingUpIcon, DocumentArrowDownIcon, FolderIcon } from '@heroicons/react/24/outline'
import projectEventService from '../../services/projectEvent.service'
import TopProjects from '../../components/TopProjects'
import projectsService from '../../services/projects.service'
import educationService from '../../services/education.service'
import DownloadsByRoleChart from '../../components/DownloadsByRoleChart'

export default function AdminDashboard()
{
    const { t, i18n } = useTranslation()
    const [panelInfo, setPanelInfo] = useState([])
    const [topProjects, setTopProjects] = useState([])
    const [downloadsByRole, setDownloadsByRole] = useState([])
    const lang = i18n.language.startsWith('es') ? 'es' : 'en'

    useEffect(() => {
        async function loadCards(){
            const cvTotals = await cvService.getTotals()
            const mostVisited = await projectEventService.getMostVisitedProject()
            const top3 = await projectEventService.getTopVisitedProject()
            const totalProjects = await projectsService.getStats()
            const totalStudies = await educationService.getStats()
            const downloadStats = await cvService.getDownloadsByRoleAndLang()
            setDownloadsByRole(downloadStats)

            const byRoleMap = cvTotals.byRole.reduce((acc, item) => {
                acc[item._id] = item.count 
                return acc
            }, {})

            setTopProjects(top3.projects)

            const cards = [
                {
                    key: "cv-downloads",
                    name: t("dashboard_cv_downloads"),
                    count: cvTotals.total,
                    icon: DocumentArrowDownIcon,
                    backGround: "bg-[#A8D5BA]",
                    trend: {
                        currentLabel: t("dashboard_this_month"),
                        previousLabel: t("dashboard_last_month"),
                        current: cvTotals.monthly.current,
                        previous: cvTotals.monthly.previous,
                        percent: cvTotals.monthly.percent
                    }
                }
            ]

            if(mostVisited.project){
                cards.push({
                    key: "most-visted-project",
                    name: t("dashboard_most_visited_project"),
                    count: mostVisited.project.visits,
                    icon: ArrowTrendingUpIcon,
                    backGround: "bg-[#B9A8D5]",
                    extra: [
                    {
                        label: t("dashboard_project"),
                        value: mostVisited.project.title
                    },
                    {
                        label: t("dashboard_category"),
                        value: mostVisited.project.category?.[lang]
                    }
                ]
                })
            }

            if(totalProjects){
                cards.push({
                    key: "total-projects",
                    name: t("dashboard_total_projects"),
                    count: totalProjects.published,
                    icon: FolderIcon,
                    backGround: "bg-[#90CAF9]",
                    extra: [
                        {
                            label: t("dashboard_archived"),
                            value: totalProjects.archived
                        }
                    ]
                })
            }

            if(totalStudies){
                cards.push({
                    key: "total-studies",
                    name: t("dashboard_total_studies"),
                    count: totalStudies.published,
                    icon: AcademicCapIcon,
                    backGround: "bg-[#FFCC80]",
                    extra: [
                        {
                            label: t("dashboard_archived"),
                            value: totalStudies.archived
                        }
                    ]
                })
            }

            setPanelInfo(cards)
        }
        loadCards()
    }, [])


    return(
        <CompSection className="my-20">
            <h1 className="text-2xl lg:text-4xl">{t("dashboard_title")}</h1>
            <section>
                <ul className="grid grid-cols-1 gap-2 place-items-center lg:grid-cols-2 lg:gap-6 2xl:grid-cols-4 mt-8">
                    {panelInfo?.map((info, i) => (
                        <AdminCard key={i} panelInfo={info} classWidth="w-[300px] lg:w-full" />
                    ))}
                </ul>
                <DownloadsByRoleChart 
                    title={t("dashboard_downloads_by_role")}
                    data={downloadsByRole}
                    t={t}
                />
                <TopProjects 
                    title={t("dashboard_top_projects")}
                    projects={topProjects}
                    lang={lang}
                />
            </section>
        </CompSection>
    )
}