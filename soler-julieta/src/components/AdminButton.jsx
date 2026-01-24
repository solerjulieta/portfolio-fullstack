import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function AdminButton({ txt, btnRoute })
{
    return(
        <Link
            to={btnRoute}
            className="mt-4 p-3 shadow-md flex items-center rounded-lg text-white bg-mainViolet transition-colors duration-300 hover:bg-darkViolet"
        >
            <Plus className="h-4 w-4 mr-1" />
            {txt}
        </Link>
    )
}