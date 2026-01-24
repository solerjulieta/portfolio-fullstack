import { Outlet, useLocation } from "react-router-dom";
import CompNavbar from "../../components/CompNavbar";
import SliderBar from "../../components/SlideBar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminTopBar from "../../components/AdminTopBar";

export default function AdminHome()
{
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        if(location.state && location.state.loginSuccess){
            toast.success("¡Bienvenida!", {
                duration: 5000,
                style: {
                    border: '1px solid',
                    padding: '16px',
                    color: '#27AE60',
                }
            })

            window.history.replaceState({}, document.title, location.pathname)
        }
    }, [location.state, location.pathname])

    return(
        <div>
            <AdminTopBar onMenuClick={() => setSidebarOpen(true)} />
            <SliderBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <section className="ml-0 md:ml-64 p-6">
                <Outlet />
            </section>
        </div>
    )
}