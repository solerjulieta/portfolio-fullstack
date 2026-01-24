import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import LabelForm from "./LabelForm"
//import MultiSelect from "./MultiSelect"
import { useEffect } from "react"
import FormButton from "./FormButton"
import ReactSelectAdapter from "./ReactSelectAdapter"
import { AnimatePresence, motion } from "framer-motion"

export default function AdminForm({ fields, onSubmit, txtButton, isLoading, className, register, handleSubmit, errors, control, currentImage, onDeleteImage })
{
    return(
        <form onSubmit={handleSubmit(onSubmit)} className={`mt-8 border rounded-lg shadow-md bg-white px-6 py-4 ${className}`}>
          <AnimatePresence>
          {fields.map(field => (
            <motion.div 
              key={field.name} 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* multiLang */}
              {field.type === "multiLang" ? (
                <div className="flex flex-col md:flex-row gap-2">
                  <LabelForm
                    labelTxt={`${field.label} (ES)`}
                    inputType="text"
                    register={register(`${field.name}.es`)}
                    //defaultValue={defaultValue?.[field.name]?.es}
                    placeholder="ES"
                    error={errors[field.name]?.es?.message}
                  />
                  <LabelForm
                    labelTxt={`${field.label} (EN)`}
                    inputType="text"
                    register={register(`${field.name}.en`)}
                    //defaultValue={defaultValue?.[field.name]?.en}
                    placeholder="EN"
                    error={errors[field.name]?.en?.message}
                  />
                </div>
              ) : field.type === "multiSelect" ? (
                <Controller 
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <ReactSelectAdapter 
                        field={controllerField} // Pasar las props de RHF Controller
                        options={field.options}
                        isMulti 
                        placeholder="Selecciona habilidades"
                        // Aquí puedes agregar props como className para estilizar el contenedor
                        className="my-3"
                        isDisabled={field.isDisabled}
                    />
                  )}
                />
              ) : field.type === "singleSelect" ? (
                <Controller 
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <ReactSelectAdapter 
                      field={controllerField}
                      options={field.options}
                      placeholder={`Selecciona ${field.label}`}
                      className="my-3"
                    />
                )}
                />
              ) : field.type === "file" ? (
                <div className="flex flex-col md:flex-row md:justify-end md:items-end gap-2">
                  {currentImage && (
                    <div className="w-72 mb-2">
                      <img 
                        src={`http://localhost:3000/img/projects/${currentImage}`}
                        alt="preview"
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  <Controller
                  name="img"
                  control={control}
                  render={({ field }) => (
                    <LabelForm 
                      labelTxt="Imagen"
                      inputType="file"
                      field={field}
                      error={errors.img?.message}
                    />
                  )}
                  />
                  {currentImage && (
                    <button 
                      type="button"
                      onClick={onDeleteImage}
                      className="mb-2 bg-red-600 hover:bg-red-700 text-sm text-white rounded-lg px-4 h-9"
                    >
                      Eliminar imagen
                    </button>
                  )}
                  {/* 
                  <LabelForm 
                    labelTxt={field.label}
                    inputType={field.type}
                    //register={register(field.name)}
                    error={errors[field.name]?.message}
                    onChange={(e) => {
                      field.onChange?.(e.target.files)
                    }}
                  />
                  */}
                </div>
              ) : (
                  <div className="flex flex-col md:flex-row gap-2">
                    <LabelForm
                      labelTxt={field.label}
                      inputType={field.type}
                      register={register(field.name)}
                      //defaultValue={defaultValue?.[field.name]}
                      error={errors[field.name]?.message}
                    />
                  </div>
              )}
            </motion.div>
          ))}
          <FormButton
            btnText={txtButton}
            isLoading={isLoading}
          />
          </AnimatePresence>
        </form>
    )
}