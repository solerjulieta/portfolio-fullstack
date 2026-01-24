import { Link } from 'react-router-dom'

export default function LiSlidebar({ liname, icon: Icon, lipath, onClick })
{
    if (lipath === null) {
        return (
            <li
                // Ejecutamos la función de deslogueo (handleLogout) en el clic del <li>
                onClick={onClick} 
                className="hover:text-mainViolet hover:bg-mainViolet hover:bg-opacity-10 hover:font-bold border-s-4 border-s-transparent hover:border-s-mainViolet text-black py-2 px-4 cursor-pointer"
            >
                <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-2" />
                    {liname}
                </div>
            </li>
        )
    }
    
    return(
        <li
            className="hover:text-mainViolet hover:bg-mainViolet hover:bg-opacity-10 hover:font-bold border-s-4 border-s-transparent hover:border-s-mainViolet text-black py-2 px-4"
        >
            <Link to={lipath} className="flex items-center">
                <Icon className="h-5 w-5 mr-2" />
                {liname}
            </Link>
        </li>
    )
}