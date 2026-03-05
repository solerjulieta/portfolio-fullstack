import { useNavigate } from "react-router-dom"

export default function BackButton({ label })
{
    const navigate = useNavigate()

    return(
        <button 
            className="flex items-center gap-2 mb-8 text-txtGrey hover:text-mainViolet transition-colors group"
            onClick={() => navigate(-1)}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                className="size-5 group-hover:-translate-x-1 transition-transform"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            {label && <span className="text-sm fond-medium">{label}</span>}
        </button>
    )
}