import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import educationService from '../../services/education.service'
import AdminActions from '../../components/AdminActions'
import { AcademicCapIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AdminResourceList from './AdminResourceList'

export default function AdminEducation()
{
    const { i18n, t } = useTranslation()
    const lang = i18n.language
    const [studies, setStudies] = useState([])

    useEffect(() => {
        educationService.getAll()
        .then(data => {
            setStudies(data)
        })
    }, [])


    return(
        <AdminResourceList
            title="Mi formación"
            archivedTitle="Formaciones Archivadas"
            service={educationService}
            routeBase="education"
            heads={[
                { name: "Certificado" },
                { name: "Categoría", className: "hidden xl:table-cell" },
                { name: "Estado" },
                { name: "Creación", className: "hidden xl:table-cell" },
                { name: "Acciones" },
            ]}
            panelInfo={[
                { name: "Carreras", key: "Degree", icon: AcademicCapIcon, backGround: "bg-mainBlue" },
                { name: "Cursos", key: "Course", icon: BookOpenIcon, backGround: "bg-[#A8D5BA]" }
            ]}
            translateField={f => f ? f[i18n.language] ?? f.es : "-"}
        />
    )
}