import { useTranslation } from "react-i18next"

export default function FormButton({ isLoading, btnText })
{
    const { t }  = useTranslation()
    
    return(
        <button
            type="submit"
            disabled={isLoading} 
            className={`mt-4 p-2 text-white rounded-md shadow-md bg-mainViolet transition-colors duration-300 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-darkViolet'}`}
        >
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <i className="pi pi-spinner pi-spin mr-2 text-lg"></i>
                    {t(btnText)}
                </span>
            ) : (
                t(btnText)
            )}
        </button>
    )
}