import * as yup from 'yup'

const educationSchema = yup.object().shape({
    title: yup.object().shape({
        es: yup.string().required("El título en español es requerido."),
        en: yup.string().required("El título en inglés es requerido.")
    }),
    institution: yup.object().shape({
        es: yup.string().required("La institución en español es requerida."),
        en: yup.string().required("La institución en inglés es requerida.")
    }),
    start: yup.number().required("La fecha de inicio es requerida.").min(1994, "Debe ser un año válido"),
    end: yup.number().required("La fecha de fin es requerida.").min(1994, "Debe ser un año válido").when("start", (start, schema) => schema.min(start, "El fin debe ser posterior al inicio.")),
    skills: yup.array(),
    category: yup.string().required("La categoría es requerida."),
    status: yup.string().required("El estado es requerido.")
})

export{
    educationSchema,
}