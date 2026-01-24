import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function LabelForm({ labelTxt, inputType, register, field, placeholder, defaultValue, error })
{
    const inputRef = useRef(null)
    const [fileName, setFileName] = useState(defaultValue || "Ningún archivo seleccionado") 
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = inputType === "password"
    const currentType = isPassword ? (showPassword ? "text" : "password") : inputType

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    if(inputType === "file"){
        return(
            <label className="flex flex-col mb-2 flex-1">
                {labelTxt}
                <div className="flex items-center gap-2 mt-1 border rounded-lg h-9">
                    <input
                        ref={inputRef} 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const files = e.target.files 
                            field?.onChange(files)
                            if(files?.[0]) setFileName(files[0].name)
                        }}
                        /*
                        {...register} 
                        className="hidden"
                        onChange={e => {
                            const file = e.target.files[0]
                            if(file) setFileName(file.name)
                        }}*/
                    />
                    <span className="bg-mainViolet text-white px-4 h-9 rounded-md cursor-pointer hover:bg-darkViolet flex items-center justify-center" onClick={() => document.querySelector(`#${register.name}`).click()}>
                        Seleccionar archivo
                    </span>
                    <span className="text-sm">{fileName}</span>
                </div>
                <AnimatePresence>
                    {error && 
                        <motion.span 
                            key="error"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="text-red-500 text-xs mt-1"
                        >
                            {error}
                        </motion.span>
                    }
                </AnimatePresence>
            </label>
        )
    }

    if(inputType === "textarea"){
        return(
            <label className="flex flex-col mb-2 flex-1">
                {labelTxt}
                <textarea
                    rows={4} 
                    type={inputType} 
                    {...register} 
                    className={`resize-none mt-1 border rounded-lg p-1.5 focus:shadow-inner focus:shadow-mainViolet focus:outline-none ${error ? "focus:shadow-red-500" : "focus:shadow-mainViolet" }`} 
                    //defaultValue={defaultValue}
                    placeholder={placeholder}
                />
                <AnimatePresence>
                    {error && 
                            <motion.span 
                            key="error"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="text-red-500 text-xs mt-1"
                        >
                            {error}
                        </motion.span>
                    }
                </AnimatePresence>
            </label>
        )
    }

    return(
        <label className="flex flex-col mb-2 flex-1">
            {labelTxt}
                <div className="relative">
                <input 
                    type={currentType} 
                    {...register} 
                    className={`mt-1 w-full border rounded-lg h-9 px-1.5 focus:shadow-inner focus:shadow-mainViolet ${error ? "focus:shadow-red-500" : "focus:shadow-mainViolet" }`} 
                    //defaultValue={defaultValue}
                    placeholder={placeholder}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-0 top-[55%] transform -translate-y-1/2 w-9 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                )}
            </div>
            <AnimatePresence>
                {error && 
                        <motion.span 
                        key="error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="text-red-500 text-xs mt-1"
                    >
                        {error}
                    </motion.span>
                }
            </AnimatePresence>
        </label>

    )
}