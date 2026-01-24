export default function LoadMoreButton({ show, onClick, label }) 
{
    if (!show) return null

    return (
        <div className="flex justify-center mt-8">
        <button
            onClick={onClick}
            className="
            px-6 py-2 rounded-full
            border border-mainViolet
            text-mainViolet font-semibold
            hover:bg-mainViolet hover:text-white
            transition
            "
        >
            {label}
        </button>
        </div>
    )
}
