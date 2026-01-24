import { Link } from 'react-router-dom'

export default function LinkComponent({ txt, linkRoute, LinkIcon })
{

    return(
        <div className='mt-4'>
        <Link
            className="text-sm font-bold text-txtGrey underline flex items-center"
            to={linkRoute}
        >
            {LinkIcon && (
                <LinkIcon className="w-4 h-4" />
            )}
            {txt}
        </Link>
        </div>
    )
}