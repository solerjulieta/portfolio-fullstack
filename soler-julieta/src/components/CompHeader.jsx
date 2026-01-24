function CompHeader({ children })
{
    return(
        <header className="absolute top-0 left-0 bg-transparent w-full h-[72px] z-50 lg:max-w-7xl lg:mx-auto">
            {children}
        </header>
    )
}

export default CompHeader