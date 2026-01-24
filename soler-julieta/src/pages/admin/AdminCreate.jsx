import { useParams } from 'react-router-dom'
import CompSection from '../../components/CompSection'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import AdminForm from '../../components/AdminForm'
import { isValidElement, useEffect, useState } from 'react'
import skillsService from '../../services/skills.service'
import { educationSchema } from '../../schemas/education.schema'
import { projectSchema } from '../../schemas/project.schema'
import educationCategoriesService from '../../services/educationCategories.service'
import projectCategoriesService from '../../services/projectCategories.service'
import statusService from '../../services/status.service'
import technologiesService from '../../services/technologies.service'
import projectsService from '../../services/projects.service'
import toast from 'react-hot-toast'
import educationService from '../../services/education.service'
import BackButton from '../../components/BackButton'

export default function AdminCreate()
{
    const { collection } = useParams()
    const [skills, setSkills] = useState([])
    const [categories, setCategories] = useState([])
    const [status, setStatus] = useState([])
    const [techs, setTechs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const schema = collection === "education" ? educationSchema : projectSchema
    const title = collection === "education" ? "Añadir formación" : "Añadir nuevo proyecto"

    const { register, handleSubmit, formState: { errors }, watch, control, unregister, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const formatOptions = (data) => data.map(item => ({
        value: item._id,
        label: item.es,
        meta: item
    }))

    useEffect(() => {
        if(collection === "education"){
            skillsService.getAll()
            .then(data => {
                setSkills(formatOptions(data))
            })
            educationCategoriesService.getAll()
            .then(data => {
                setCategories(formatOptions(data))
            })
        } else {
            projectCategoriesService.getAll()
            .then(data => {
                setCategories(formatOptions(data))
            })

            technologiesService.getAll()
            .then(data => {
                setTechs(formatOptions(data))
            })
        }
        statusService.getAll()
        .then(data => {
            setStatus(formatOptions(data))
        })
    }, [collection])

    // La lógica condicional se mantiene
    const selectedCategoryId = watch('category')
    const selectedCategoryObj = categories.find(
        c => c.value === selectedCategoryId
    )
    const isWebDesignCategory = selectedCategoryObj?.meta?.en === "Web Design"
    //const isWebDesignCategory = selectedCategory && selectedCategory.es === "Diseño Web"

    useEffect(() => {
        if(!isWebDesignCategory){
            unregister('tech')
        }
    }, [isWebDesignCategory, unregister])

    const fields =
    collection === "education"
    ? [
        { name: "title", label: "Título", register: register('title'), type: "multiLang" },
        { name: "institution", label: "Intitución", register: register('institution'), type: "multiLang" },
        { name: "mode", label: "Modalidad", register: register('mode'), type: "multiLang" },
        { name: "start", label: "Inicio", register: register('start'), type: "number" },
        { name: "end", label: "Fin", register: register('end'), type: "number" },
        { name: "skills", label: "Habilidades", register: register('skills'), type: "multiSelect", options: skills },
        { name: "category", label: "Categoría", register: register('category'), type: "singleSelect", options: categories },
        { name: "status", label: "Estado", register: register('status'), type: "singleSelect", options: status },
    ] : [
        { name:"img", label: "Imagen", register: register('img'), type: "file", accept: "image/*" },
        { name: "title", label: "Título", register: register('title'), type: "text" },
        { name: "description", label: "Descripción", register: register('description'), type: "multiLang" },
        { name: "category", label: "Categoría", register: register('category'), type: "singleSelect", options: categories },
        ...(isWebDesignCategory ? [{ name: "tech", label: "Tecnologías", register: register('tech'), type: "multiSelect", options: techs }] : []),
        //{ name: "tech", label: "Tecnologías", register: register('tech'), type: "multiSelect", options: techs, isHidden: !isWebDesignCategory, isDisabled: !isWebDesignCategory },
        { name: "github_link", label: "Github", register: register("github_link"), type: "url" },
        { name: "demo_link", label: "Demo", register: register("demo_link"), type: "url" },
        { name: "status", label: "Estado", register: register('status'), type: "singleSelect", options: status },
    ]

    const CREATE_CONFIG = {
        projects: {
            service: projectsService.create,
            preparedData: (data) => {
                const formData = new FormData()

                if(data.img?.[0]){
                    formData.append('img', data.img[0])
                }

                const isReferenceField = ['status']

                Object.entries(data).forEach(([key, value]) => {
                    if(key === 'img') return 

                    if (isReferenceField.includes(key)) {
                        // RHF ya debería darte el ID
                        if (Array.isArray(value)) {
                            value.forEach(v => formData.append(`${key}[]`, v))
                        } else {
                            formData.append(key, value)
                        }
                        return
                    }

                    if(typeof value === 'object'){
                        formData.append(key, JSON.stringify(value))
                    } else if(value !== undefined && value !== null){
                        formData.append(key, value)
                    }
                })
                return formData
            }
        },
        education: {
            service: educationService.create,
            preparedData: (data) => data
        }
    }

    function create(data){
        setIsLoading(true)
        
        const config = CREATE_CONFIG[collection]

        const payload = config.preparedData(data)

        config.service(payload)
        .then(res => {
            toast.success(res.msg, {
                duration: 5000,
                style: {
                    border: '1px solid',
                    padding: '16px',
                    color: '#27AE60',
                } 
            })
            reset()
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
        .finally(() => {
            setIsLoading(false)
        })
    }

    return(
        <CompSection>
            <div className="flex items-center">
                <BackButton />
                <h1 className="text-2xl lg:text-4xl">{title}</h1>
            </div>
            <AdminForm 
                fields={fields}
                onSubmit={handleSubmit(create)}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                control={control}
                txtButton="Crear"
                isLoading={isLoading}
            />
        </CompSection>
    )
}