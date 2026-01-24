import { ArchiveIcon } from "lucide-react"
import { Link } from "react-router-dom"

export default function SecondaryButton({ archiveRoute, archiveTxt })
{
    return(
        <Link
            to={archiveRoute}
            className="flex items-center hover:shadow-inner hover:shadow-mainViolet mt-4 p-3 shadow-md rounded-lg border-[1.5px] border-mainViolet text-mainViolet lg:mr-2"
        >
            <ArchiveIcon className="h-4 w-4 mr-1" />
            {archiveTxt}
        </Link>
    )
}