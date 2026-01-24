import AdminButton from './AdminButton'
import AdminCard from './AdminCard'
import AdminTable from './AdminTable'
import CompSection from './CompSection'
import SecondaryButton from './SecondaryButton'

export default function AdminLayout({ title, heads, children, panelInfo = [], txt, btnRoute, txtArchived })
{
    return(
        <CompSection className="my-20">
            <h1 className="text-2xl lg:text-4xl">{title}</h1>
            <div className="flex flex-col 2xl:flex-row 2xl:items-end lg:justify-between gap-6">
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6 w-fit">
                    {panelInfo?.map((info, i) => (
                        <AdminCard key={i} panelInfo={info} classWidth="w-[250px]" />
                    ))}
                </ul>
                {txt && btnRoute && (
                    <div className="flex flex-col md:items-start lg:flex-row lg:items-center">
                        <SecondaryButton archiveTxt={txtArchived} archiveRoute="archived" />
                        <AdminButton txt={txt} btnRoute={btnRoute} />
                    </div>
                )}
            </div>
            <div className="bg-white rounded-lg px-6 py-4 mt-12 shadow-md overflow-x-auto">
                <AdminTable tableHeads={heads}>
                    {children}
                </AdminTable>
            </div>
        </CompSection>
    )
}