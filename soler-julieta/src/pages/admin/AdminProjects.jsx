import { useEffect, useState } from 'react'
import projectsService from '../../services/projects.service'
import AdminLayout from '../../components/AdminLayout'
import AdminActions from '../../components/AdminActions'
import { WindowIcon, PaintBrushIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import ConfirmModal from '../../components/ConfirmModal'
import AdminResourceList from './AdminResourceList'

export default function AdminProjects()
{
    const { i18n, t } = useTranslation()
    const lang = i18n.language
    const location = useLocation()
    const [selectedProject, setSelectedProject] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const isArchivedPage = location.pathname.includes("archived")

    const [projects, setProjects] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        projectsService.getAll()
        .then(data => {
            setProjects(data)
        })
    }, [])

    const filteredProjects = projects.filter(project => {
        const statusKey = project.status?.key

        if(isArchivedPage){
            return statusKey === "ARCHIVED"
        }

        return statusKey !== "ARCHIVED"
    })

    const pageTitle = isArchivedPage ? "Proyectos archivados" : "Mis proyectos"

    const showAddButton = !isArchivedPage

    const heads = [
        { name: "Proyecto" },
        { name: "Categoría", className: "hidden md:table-cell" },
        { name: "Estado" },
        { name: "Creación", className: "hidden xl:table-cell" },
        { name: "Acciones" },
    ]

    console.log("Los proyectos con key", projects)

    const webCount = projects.filter(e => e.category?.key === "Web").length
    const graphicCount = projects.filter(e => e.category?.key === "Graphic").length

    const panelInfo = [
        { name: "Diseño Web", count: webCount, icon: WindowIcon, backGround: "bg-mainBlue" },
        { name: "Diseño Gráfico", count: graphicCount, icon: PaintBrushIcon, backGround: "bg-[#A8D5BA]"}
    ]

    const panelArchived = [
        { name: "Archivados", count: 0 , icon: "", backGround: "bg-red-200" }
    ]

    const translateField = (field) => {
        if(!field) return "-"
        return field[lang] ?? field.es
    }

    const confirmDelete = (project) => {
        setSelectedProject(project)
        setShowModal(true)
    }

    const handleAction = (id, action) => {
        let serviceCall 

        switch(action) {
            case "archive": serviceCall = projectsService.archive(id); break
            case "restore": serviceCall = projectsService.restore(id); break
            case "delete": serviceCall = projectsService.deleteProject(id); break
        }

        serviceCall
            .then(res => {
                toast.success(res.msg, {
                    duration: 5000,
                    style: {
                        border: '1px solid',
                        padding: '16px',
                        color: '#27AE60',
                    } 
                })
                return projectsService.getAll()
                    .then(data => setProjects(data))
                    .catch(err => toast.error(err.error?.msg || "Error inesperado"))
            })
            .catch(err => {
                toast.error(err.error.msg, {
                    duration: 5000,
                    style: {
                        border: '1px solid',
                        padding: '16px',
                        color: '#E74C3C',
                    }
                })
            })
    }

    return(
        <AdminResourceList 
            title="Mis proyectos"
            archivedTitle="Proyectos Archivados"
            service={projectsService}
            routeBase="projects"
            heads={[
                { name: "Proyecto" },
                { name: "Categoría", className: "hidden md:table-cell"  },
                { name: "Estado" },
                { name: "Creación", className: "hidden xl:table-cell" },
                { name: "Acciones" },
            ]}
            panelInfo={[
                { name: "Diseño Web", key: "Web", count: webCount, icon: WindowIcon, backGround: "bg-mainBlue" },
                { name: "Diseño Gráfico", key: "Graphic", count: graphicCount, icon: PaintBrushIcon, backGround: "bg-[#A8D5BA]"}
            ]}
            translateField={f => f ? f[i18n.language] ?? f.es : "-"}
        />
    )
}