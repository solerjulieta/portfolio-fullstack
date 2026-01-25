// src/components/ReactSelectAdapter.jsx

import Select from 'react-select'; // 💡 Importar el componente principal

// Este componente recibirá props de React-Hook-Form Controller (value, onChange, onBlur)
// y las props que le pases tú (options, isMulti, placeholder, etc.)
export default function ReactSelectAdapter({ field, options, isMulti, ...props }) {
    
    const { onChange, onBlur, name } = field

    const handleChange = (selected) => {
        if(isMulti){
            onChange(selected ? selected.map(o => o.value) : [])
        } else {
            onChange(selected ? selected.value : null)
        }
    }

    let selectValue 

    if(isMulti){
        //const currentValues = Array.isArray(field.value) ? field.value : []
        //selectValue = options.filter(opt => currentValues.includes(opt.value))
        selectValue = Array.isArray(field.value)
        ? options.filter(opt => field.value.includes(opt.value))
        : []
    } else {
        selectValue = options.find(opt => opt.value === field.value) || null
    }

    /*15/12
    if(isMulti){
        selectValue = field.value
        ? field.value.map(rhfItem => options.find(
            opt => opt.itemToPersist.es === rhfItem.es && opt.itemToPersist.en === rhfItem.en
        )).filter(item => item !== undefined)
        : []
    } else {
        if (field.value && field.value.es){
            selectValue = options.find(
                opt => opt.itemToPersist.es === field.value.es && opt.itemToPersist.en === field.value.en
            ) || null 
        } else {
            selectValue = null
        }
    }*/

    return (
        <Select
            //{...field} // Pasa { name, ref, onBlur }
            //value={field.value}
            name={name}
            onBlur={onBlur}
            value={selectValue}
            onChange={handleChange}
            options={options}
            isMulti={isMulti}
            // Aquí puedes empezar a agregar tus estilos y adaptaciones de Tailwind
            classNamePrefix="react-select" 
            {...props} // Pasa isMulti, placeholder, etc.
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    boxShadow: 'none',                    
                    borderRadius: '8px',
                    '&:hover': {
                        borderColor: '#e5e7eb'
                    },
                }),
                // 1. Z-INDEX y PORTAL: (Mantener para flotación)
                multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: '#9966cc',
                    borderRadius: '6px',
                }),
                multiValueLabel: (provided) => ({
                    ...provided,
                    // ✅ TEXTO COLOR BLANCO
                    color: 'white',
                }),
                multiValueRemove: (provided) => ({
                    ...provided,
                    color: 'white',
                    // Asegura que el color blanco se mantenga al hacer hover
                    '&:hover': {
                        backgroundColor: '#7a4db1', // Mantén el fondo del tag
                        color: 'white', // Texto blanco al hacer hover
                    },
                }),
                menuPortal: base => ({ ...base, zIndex: 9999 }),
                
                // 2. CORRECCIÓN CLAVE: Estilos aplicados a menuList
                menuList: (provided) => ({
                    ...provided,
                    maxHeight: '190px', // Limita la altura (ej. 5 opciones)
                    overflowY: 'auto',  // Aplica el scroll directo a la lista
                    // Opcional: Para evitar un posible desbordamiento
                    paddingTop: 0, 
                    paddingBottom: 0,
                }),
                
                // 3. ESTILO MENU: Limpiar el overflow redundante
                menu: (provided) => ({
                    ...provided,
                    // Asegúrate de que este contenedor no agregue scroll
                    overflowY: 'visible', 
                }),

                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                    ? '#9966cc'
                    : state.isFocused
                    ? '#9966cc63'
                    : 'white'
                })
                
            }}
        />
    )
}