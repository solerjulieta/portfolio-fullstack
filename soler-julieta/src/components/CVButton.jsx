export default function CVButton({ txtButton, className, onClick })
{
    return(
        <button
            type="button"
            onClick={onClick} 
            className={`download-cv-btn shadow-lg cursor-pointer ${className}`}
        >
            <span>{txtButton}</span>
        </button>
    )
}