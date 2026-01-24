import { PencilSquareIcon, TrashIcon, ArchiveBoxArrowDownIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function AdminActions({ onEdit, onDelete, onArchived, onRestore, isArchived })
{
    return(
        <td>
            {!isArchived ? (
                <>
                    <button
                        onClick={onEdit}
                        className="mr-1.5 hover:text-[#4caf50]"
                    >
                        <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onArchived}
                        className="hover:text-[#607d8b]"
                    >
                        <ArchiveBoxArrowDownIcon className="w-5 h-5" />
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={onRestore}
                        className="mr-1.5 hover:text-[#4caf50]"
                    >
                        <ArrowPathIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="hover:text-[#ef5350]"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </>
            )}
        </td>
    )
}