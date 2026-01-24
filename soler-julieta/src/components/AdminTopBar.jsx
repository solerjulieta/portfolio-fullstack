import { Menu, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { UserCircleIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import LanguageButton from "./LanguageButton"

export default function AdminTopBar({ onMenuClick }) 
{
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header 
            className={`
                fixed top-0 left-0 md:left-64 right-0 h-14 z-50
                flex items-center justify-end px-6
                transition-all duration-200
                ${scrolled
                ? "bg-white border-b shadow-sm"
                : "bg-transparent border-b border-transparent"}
            `}
        >
        <div className="flex items-center gap-4">
            {/* Ver portfolio */}
            <button
                onClick={() => window.open("/", "_blank")}
                className="flex items-center text-sm text-txtGrey hover:text-black"
            >
                Portfolio
            </button>

            <LanguageButton />

            {/* Perfil dropdown */}
            <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-2">
                    <UserCircleIcon className="w-6 h-6 text-txtGrey" />
                </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                <Menu.Item>
                    {({ active }) => (
                    <button
                        className={`w-full text-left px-4 py-2 text-sm ${active && "bg-gray-100"}`}
                        onClick={() => navigate("/admin/profile")}
                    >
                        Mi perfil
                    </button>
                    )}
                </Menu.Item>

                <Menu.Item>
                    {({ active }) => (
                    <button
                        className={`w-full text-left px-4 py-2 text-sm ${active && "bg-gray-100"}`}
                        onClick={() => navigate("/admin/security")}
                    >
                        Seguridad
                    </button>
                    )}
                </Menu.Item>

                <div className="border-t my-1" />

                <Menu.Item>
                    {({ active }) => (
                    <button
                        className={`w-full text-left px-4 py-2 text-sm text-red-600 ${active && "bg-red-50"}`}
                        onClick={() => navigate("/admin/logout")}
                    >
                        Cerrar sesión
                    </button>
                    )}
                </Menu.Item>
                </Menu.Items>
            </Transition>
            </Menu>
                <div className="flex justify-end">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden z-50 ml-2 lg:ml-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                        </svg>
                    </button>
                </div>
        </div>
        </header>
    )
}
