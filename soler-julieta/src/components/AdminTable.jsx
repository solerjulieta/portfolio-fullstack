import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

export default function AdminTable({ tableHeads, children })
{
    return(
        <table className="min-w-full table-auto">
            <thead>
                <tr className="text-xs font-semibold text-txtGrey uppercase">
                    {tableHeads.map((tableHead, i) => (
                        <th key={i} className={`text-left py-3 ${tableHead.className}`}>{tableHead.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-lineGrey text-txtGrey">
                {children}
            </tbody>
        </table>
    )
}