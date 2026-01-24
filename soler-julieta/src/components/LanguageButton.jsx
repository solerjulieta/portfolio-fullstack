import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GlobeAltIcon, CheckIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function LanguageButton()
{
    const { i18n } = useTranslation()
    const currentLang = i18n.language?.slice(0,2) || "es"
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen((prev) => !prev)

    const handleLanguageChange = async (langCode) => {
        if(langCode === currentLang) return 

        await i18n.changeLanguage(langCode)

        toast.success(
            langCode === 'es'
                ? 'Idioma cambiado a Español'
                : 'Language changed to English',
            { id: 'language-change' }
        )
        setIsOpen(false)
    }

    const languages = [
        { code: "es", label: "Español" },
        { code: "en", label: "English" }
    ]

    return(
        <div className="relative">
            <button
                onClick={toggleMenu}
                className='flex items-center gap-2 px-3 py-1 bg-transparent rounded-full border border-lineGrey lg:border-lineGrey shadow-sm hover:bg-gray-100 transition'
            >
                <GlobeAltIcon className="w-6 h-6 text-lineGrey" />
                <span className='text-sm font-medium text-lineGrey uppercase hidden lg:block'>
                    {currentLang}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3 text-lineGrey">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-gray-100 p-2 shadow-md z-10">
                    {languages.map((lang) => (
                        <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        disabled={lang.code === currentLang}
                        className={`flex items-center justify-between w-full px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-white transition ${
                            lang.code === currentLang ? "cursor-default text-gray-500" : ""
                        }`}   
                        >
                            <span>{lang.label}</span>
                            {lang.code === currentLang && <CheckIcon className="w-4 h-4" /> }
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}