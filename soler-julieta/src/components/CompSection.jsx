export default function CompSection({ compId, className, children })
{
    return(
        <section id={compId} className={`mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 lg:mt-40 ${className}`}>
            {children}
        </section>
    )
}