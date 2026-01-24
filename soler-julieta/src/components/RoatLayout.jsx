import { Toaster } from "react-hot-toast"

export default function RoatLayout({ children, toasterPosition })
{
    const defaultClass = "mt-[62px] lg:mt-24"
    const finalClass = toasterPosition || defaultClass

    return(
        <>
            {children}
            <Toaster 
                position="top-right"
                containerClassName={finalClass}
                fontFamily= "Montserrat, sans-serif"
            />
        </>
    )
}