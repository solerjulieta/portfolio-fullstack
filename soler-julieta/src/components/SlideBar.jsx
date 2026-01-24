import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import LiSlidebar from "./LiSlidebar"
import {
  Squares2X2Icon,
  AcademicCapIcon,
  FolderIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import authService from "../services/auth.service"

export default function SliderBar({ isOpen, onClose }) {
  const [activeLink, setActiveLink] = useState("Dashboard")
  const navigate = useNavigate()

  const links = [
    { name: "Dashboard", path: "/admin", icon: Squares2X2Icon },
    { name: "Educación", path: "education", icon: AcademicCapIcon },
    { name: "Projects", path: "projects", icon: FolderIcon },
    { name: "Logout", path: null, icon: ArrowRightEndOnRectangleIcon, type: "action" },
  ]

  const handleLogout = async () => {
    authService
      .logout()
      .then(() => {
        navigate("/admin/login", { state: { logoutSuccess: true } })
      })
      .catch((error) => {
        console.error("Error al cerrar sesión", error)
      })
      .finally(() => {
        onClose()
      })
  }

  return (
    <>
      {/* Sidebar fija en desktop */}
      <div className="hidden md:block fixed top-0 left-0 w-64 h-full bg-white text-black border-e z-30">
        <h2 className="text-lg font-bold mb-6 p-4 mt-12">Menú</h2>
        <ul>
          {links.map((link) => (
            <LiSlidebar
              key={link.name}
              onClick={
                link.name === "Logout"
                  ? handleLogout
                  : () => setActiveLink(link.name)
              }
              liname={link.name}
              icon={link.icon}
              lipath={link.path}
            />
          ))}
        </ul>
      </div>

      {/* Sidebar animada en mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay oscuro */}
            <motion.div
              className="fixed inset-0 bg-gray-900 bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg text-black z-50 block md:hidden"
            >
              <div className="p-4">
                <button
                  className="mb-6 text-black font-bold"
                  onClick={onClose}
                >
                  ✕
                </button>

                <h2 className="text-lg font-bold mb-6">Menú</h2>

                <ul>
                  {links.map((link) => (
                    <LiSlidebar
                      key={link.name}
                      onClick={
                        link.name === "Logout"
                          ? handleLogout
                          : onClose
                      }
                      liname={link.name}
                      icon={link.icon}
                      lipath={link.path}
                    />
                  ))}
                </ul>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
