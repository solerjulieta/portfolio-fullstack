import { useNavigate } from "react-router-dom"

export default function BackButton()
{
    const navigate = useNavigate()

    return(
        <button 
            className="mr-2 text-txtGrey"
            onClick={() => navigate(-1)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </button>
    )
}