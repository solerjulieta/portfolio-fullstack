export default function CustomButton({ hRef, className, txt, Icon, target = "_blank", onClick })
{
    return(
        <a 
            href={hRef} 
            className={`mt-4 rounded-md p-2 shadow-md flex items-center justify-center cursor-pointer transition-colors duration-300 ${className}`}
            target={target}
            onClick={onClick}
        >
            {Icon && (
                <Icon 
                    size={20}
                    strokeWidth={1.5}
                    className="mr-1"
                />
            )}
            {txt}
        </a>
    )
}