import { useParams } from "react-router-dom";
import CompSection from "../../components/CompSection";
import { useEffect, useState } from "react";
import educationService from "../../services/education.service";
import projectsService from "../../services/projects.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { educationSchema } from "../../schemas/education.schema";
import { projectSchema } from "../../schemas/project.schema";
import AdminForm from "../../components/AdminForm";
import skillsService from "../../services/skills.service";
import BackButton from "../../components/BackButton";
import statusService from "../../services/status.service";
import projectCategoriesService from "../../services/projectCategories.service";
import educationCategoriesService from "../../services/educationCategories.service";
import technologiesService from "../../services/technologies.service";
import { useMemo } from "react";
import toast from 'react-hot-toast'
import ConfirmModal from "../../components/ConfirmModal";

export default function AdminEdit()
{
    const { collection, id } = useParams()
    const [data, setData] = useState(null)
    const [skills, setSkills] = useState([])
    const [status, setStatus] = useState([])
    const [categories, setCategories] = useState([])
    const [techs, setTechs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [removeImage, setRemoveImage] = useState(false) 

    const schema = collection === "education" ? educationSchema : projectSchema
    
    const form = useForm({
        resolver: yupResolver(schema)
    })

    const { register, handleSubmit, formState: { errors }, reset, control } = form

    useEffect(() => {
        const service = 
        collection === "education" 
        ? educationService
        : projectsService

        service.getById(id)
            .then(data => {
                setData(data)
            })
    }, [collection, id])

    async function refreshProject() {
        const updated = await projectsService.getById(id)
        setData(updated)
        reset(updated) // si querés actualizar el form
    }

    /*
    useEffect(() => {
        if(collection === "education" && data){
            skillsService.getByCategory(data.subcategory)
                .then(setSkills)
        }
    }, [collection, data])*/

    useEffect(() => {
        let promises = []

        if(collection === "education"){
            promises = [
                skillsService.getAll(),
                educationCategoriesService.getAll(),
                statusService.getAll()
            ]
        }

        if(collection === "projects"){
            promises = [
                statusService.getAll(),
                projectCategoriesService.getAll(),
                technologiesService.getAll()
            ]
        }

        Promise.all(promises)
        .then((results) => {
            if(collection === "education"){
                const [ skills, categories, status ] = results
                setSkills(skills)
                setCategories(categories)
                setStatus(status)
            }
            if(collection === "projects"){
                const [ status, categories, techs ] = results
                setStatus(status)
                setCategories(categories)
                setTechs(techs)
            }
        })
    }, [collection])

    const statusOptions = status.map(s => ({
        value: s._id.toString(),
        label: s.es
    }))

    const categoryOptions = categories.map(c => ({
        value: c._id.toString(),
        label: c.es
    }))

    const techOptions = techs.map(t => ({
        value: t._id.toString(),
        label: t.es
    }))

    const skillsOptions = skills.map(s => ({
        value: s._id.toString(),
        label: s.es
    }))

    const preparedData = useMemo(() => {
        if(!data) return null

        if(collection == "education"){
            return{
                ...data,
                status: data.status?._id?.toString() ?? data.status,
                category: data.category?._id?.toString() ?? data.category,
                skills: Array.isArray(data.skills)
                    ? data.skills.map(s => 
                            typeof s === "object" ? s._id?.toString() : s?.toString()
                        )
                    : []
            }
        }

        if(collection === "projects"){
            return{
                ...data,
                tech: Array.isArray(data.tech)
                    ? data.tech.map(t => 
                        typeof t === "object" ? t._id?.toString() : t
                    )
                    : []
            }
        }

        return data
    }, [data, collection])

    function hasNewImage(imgField){
        return imgField instanceof FileList && imgField.length > 0
    }

    function arrayChanged(original = [], current = []){
        if(original.length !== current.length) return true 
        return original.some(v => !current.includes(v))
    }

    const optionsReady =
    collection === "education"
        ? skillsOptions.length > 0 &&
          categoryOptions.length > 0 &&
          statusOptions.length > 0
        : categoryOptions.length > 0 &&
          statusOptions.length > 0

    
    useEffect(() => {
        if(!preparedData || !optionsReady) return 
        reset(preparedData)
    }, [preparedData, optionsReady, reset])


    const fields = 
    collection === "education"
    ? [
        { name: "title", label: "Título", type: "multiLang" },
        { name: "institution", label: "Intitución", type: "multiLang" },
        { name: "mode", label: "Modalidad", type: "multiLang" },
        { name: "start", label: "Inicio", type: "number" },
        { name: "end", label: "Fin", type: "number" },
        { name: "skills", label: "Habilidades", type:"multiSelect", options: skillsOptions },
        { name: "category", label: "Categoría", type: "singleSelect", options: categoryOptions },
        { name: "status", label: "Estado", type: "singleSelect", options: statusOptions },
    ] : [
        { name:"img", label: "Imagen", type: "file", accept: "image/*" },
        { name: "title", label: "Título", type: "text" },
        { name: "description", label: "Descripción", type: "multiLang" },
        { name: "category", label: "Categoría", type: "singleSelect", options: categoryOptions },
        //{ name: "tech", label: "Tecnologías", type:"multiSelect" },
        ...(data?.category === "web" ? [
            { name: "github_link", label: "Github", type: "url" },
            { name: "demo_link", label: "Demo", type: "url" }
        ] : []),
        { name: "status", label: "Estado", type: "singleSelect", options: statusOptions }
    ]

    const EDIT_CONFIG = {
        education: {
            service: educationService.edit,
            editedData: (data) => data
        },
        projects: {
            service: projectsService.edit,
            editedData: (data) => {
                const formData = new FormData()

                if(hasNewImage(data.img)){
                    formData.append('img', data.img[0])
                }

                //formData.append('img', data.img[0])
                const originalTech = preparedData?.tech || []
                const currentTech = data.tech || []

                Object.entries(data).forEach(([key, value]) => {
                    if(key === "img") return

                    if(key === "tech"){
                        if(arrayChanged(originalTech, currentTech)){
                            currentTech.forEach(t => formData.append("tech[]", t))
                        }
                        return
                    }

                    if(key === "status" && value){
                        formData.append("status", value)
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
        }
    }

    function edit(data){
        setIsLoading(true)

        const config = EDIT_CONFIG[collection]
        const payload = config.editedData(data)

        /*
        for (let pair of payload.entries()) {
            console.log(pair[0], pair[1])
        }*/

       if(payload instanceof FormData){
        for (let pair of payload.entries()){
            console.log(pair[0], pair[1])
        }
       } else {
        console.log(payload)
       }

        config.service(id, payload)
        .then(res => {
            toast.success(res.msg, {
                duration: 5000,
                style: {
                    border: '1px solid',
                    padding: '16px',
                    color: '#27AE60',
                } 
            })
            // 🆕 Refrescar data
            refreshProject()
        })
        .catch(err => {
            toast.error(err.error.msg || 'Hubo un error al intentar editar.', {
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

    function handleConfirmDeleteImage(){
        setShowDeleteModal(false)

        projectsService.deleteImg(id)
        .then(res => {
            toast.success(res.msg, {
                duration: 5000,
                style: {
                    border: '1px solid',
                    padding: '16px',
                    color: '#27AE60',
                } 
            })
            // 🆕 Refrescar data
            refreshProject()
        })
        .catch(err => {
            toast.error(err.error.msg || 'Hubo un error al intentar editar.', {
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
        <CompSection>
            {data ? (
                <>
                    <div className="flex items-center">
                        <BackButton />
                        {preparedData ? (
                            <h1 className="text-2xl lg:text-4xl">Editar {preparedData.title.es}</h1>
                        ) : (
                            <h1 className="text-2xl lg:text-4xl">Editar {data.title}</h1>
                        )}
                    </div>
                    <AdminForm 
                        fields={fields}
                        //defaultValue={preparedData ? preparedData : data}
                        onSubmit={handleSubmit(edit)}
                        register={register}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        control={control}
                        txtButton="Guardar"
                        currentImage={data?.img}
                        onDeleteImage={() => setShowDeleteModal(true)}
                        isLoading={isLoading}
                    />
                </>
            ) : (
                <p>Cargando..</p>
            )}
            {showDeleteModal && (
                <ConfirmModal 
                    isOpen={showDeleteModal}
                    onConfirm={handleConfirmDeleteImage}
                    onCancel={() => setShowDeleteModal(false)}
                    title="¿Eliminar imagen?"
                    message="¿Segura que querés eliminar esta imagen?"
                    confirmBtn="Eliminar"
                    cancelBtn="Cancelar"
                />
            )}
        </CompSection>
    )
}