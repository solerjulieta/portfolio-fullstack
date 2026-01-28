import { Dialog } from "@headlessui/react"
import BaseModal from "./BaseModal"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function CVDownloadModal({ isOpen, onClose }) {
  const { t, i18n } = useTranslation()
  const [role, setRole] = useState("dev")
  const defaultLang = i18n.language.startsWith("en") ? "en" : "es"
  const [lang, setLang] = useState(defaultLang)
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const detectedLang = i18n.language.startsWith("en") ? "en" : "es"
    setLang(detectedLang)
  }, [i18n.language, isOpen])

  const handleDownload = () => {
    window.location.href = `${API_URL}/api/cv/download?role=${role}&lang=${lang}`
    onClose()
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <Dialog.Title className="text-lg font-bold mb-4">
        {t("cv_modal_title")}
      </Dialog.Title>

      {/* Perfil */}
      <div className="mb-4">
        <p className="font-medium mb-2 font-semibold">{t("cv_modal_profile")}</p>
        <label className="block">
          <input type="radio" checked={role === "dev"} onChange={() => setRole("dev")} />
          <span className="ml-2">{t("cv_modal_dev")}</span>
        </label>
        <label className="block">
          <input type="radio" checked={role === "design"} onChange={() => setRole("design")} />
          <span className="ml-2">{t("cv_modal_graph")}</span>
        </label>
      </div>

      {/* Idioma */}
      <div className="mb-6">
        <p className="font-medium mb-2 font-semibold">{t("cv_modal_language")}</p>
        <label className="block">
          <input type="radio" checked={lang === "es"} onChange={() => setLang("es")} />
          <span className="ml-2">{t("cv_modal_es")}</span>
        </label>
        <label className="block">
          <input type="radio" checked={lang === "en"} onChange={() => setLang("en")} />
          <span className="ml-2">{t("cv_modal_en")}</span>
        </label>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          {t("cv_modal_cancel")}
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded bg-mainViolet text-white hover:bg-darkViolet"
        >
          {t("cv_modal_download")}
        </button>
      </div>
    </BaseModal>
  )
}
