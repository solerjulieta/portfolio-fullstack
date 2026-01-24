import * as yup from 'yup'

const projectSchema = yup.object().shape({
    title: yup.string().required("El título es requerido."),
    description: yup.object().shape({
        es: yup.string().required("La descripción es requerida."),
        en: yup.string().required("The description is required.")
    }),
    tech: yup.array(),
    demoLink: yup.string().url("Debe ser un link válido.").nullable(),
    githubLink: yup.string().url("Debe ser un link válido.").nullable(),
    category: yup.string().required("La categoría es requerida"),
    status: yup.string().required("El estado es requerido.")
})

export{
    projectSchema
}