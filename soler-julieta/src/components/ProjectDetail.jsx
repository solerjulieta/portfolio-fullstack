import CompSection from './CompSection'
import { motion } from 'framer-motion'
import Subtitle from './Subtitle'
import { useEffect, useState } from 'react'
import projectsService from '../services/projects.service'
import { useParams } from 'react-router-dom'
import i18n from '../js/i18n'
import ReactMarkDown from 'react-markdown'
import { Heart, ShieldCheck, Eye, Users } from 'lucide-react'

export default function ProjectDetail()
{
    const { id } = useParams()
    const [project, setProject] = useState()
    const lang = i18n.language || 'es'

    const ICONS = {
        heart: Heart,
        "shield-check": ShieldCheck,
        eye: Eye,
        users: Users
    }

    useEffect(() => {
        projectsService.getById(id)
        .then(data => {
            setProject(data)
            console.log("El subtitulo es", data.caseStudy.subtitle[lang])
        })
    }, [id])

    return(
        <CompSection className="mt-20">
            <motion.h1
                className="text-2xl lg:text-4xl mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {project?.title}
            </motion.h1>
            {project?.caseStudy?.enabled && 
                Array.isArray(project.caseStudy.sections) && (
                    <div className="space-y-16">
                        {project.caseStudy.sections
                        .sort((a, b) => a.order - b.order)
                        .map((section, index) => (
                            <motion.div
                                className="xl:flex xl:items-start"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="xl:mr-4">
                                    <Subtitle subtitle={section.subtitle?.[lang]} />
                                </div>
                                <div>
                                    <h2 className="text-2xl lg:text-4xl mb-6">{section.title?.[lang]}</h2>
                                    <ReactMarkDown 
                                    components={{
                                        p: ({ children }) => (
                                            <p className="text-txtGrey lg:text-lg mb-4 leading-relaxed">
                                                {children}
                                            </p>
                                        ),
                                        strong: ({ children }) => (
                                            <span className="font-bold text-mainViolet">
                                                {children}
                                            </span>
                                        )
                                    }}
                                    >
                                        {section.body?.[lang]}
                                    </ReactMarkDown>
                                    <p>{section.content}</p>
                                    {/* PALETA Y PRINCIPIOS DE COLOR */}
                                    {section.key === "color" && (
                                    <>
                                        {/* PALETA */}
                                        {section.palette && (
                                        <div className="mt-10 space-y-8">

                                            {/* Color principal */}
                                            <div>
                                            <h3 className="text-lg font-semibold mb-4">
                                                {section.palette.primary.label?.[lang]}
                                            </h3>

                                            <div className="flex items-center gap-6 p-4 rounded-xl border border-cardBorder w-fit">
                                                <div
                                                    className="w-24 h-24 rounded-xl shadow-inner"
                                                    style={{ backgroundColor: section.palette.primary.hex }}
                                                />

                                                <div className="space-y-1 text-sm">
                                                    <p className="font-semibold">
                                                        {section.palette.primary.name?.[lang]}
                                                    </p>
                                                    <p>HEX: {section.palette.primary.hex}</p>
                                                    <p>RGB: {section.palette.primary.rgb}</p>
                                                    <p>HSL: {section.palette.primary.hsl}</p>
                                                </div>
                                            </div>
                                            </div>

                                            {/* Colores secundarios */}
                                            <div>
                                            <h3 className="text-lg font-semibold mb-4">
                                                {section.palette.secondaryLabel?.[lang]}
                                            </h3>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                                {section.palette.secondary.map((color, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-4 p-4 rounded-xl border border-cardBorder w-fit"
                                                >
                                                    <div
                                                    className="w-14 h-14 rounded-lg shadow-inner"
                                                    style={{ backgroundColor: color.hex }}
                                                    />

                                                    <div className="text-sm space-y-1">
                                                    <p className="font-semibold">{color.name?.[lang]}</p>
                                                    <p>HEX: {color.hex}</p>
                                                    <p>RGB: {color.rgb}</p>
                                                    <p>HSL: {color.hsl}</p>
                                                    </div>
                                                </div>
                                                ))}
                                            </div>
                                            </div>
                                        </div>
                                        )}

                                        {/* PRINCIPIOS */}
                                        {section.principles && (
                                        <div className="mt-12">
                                            <h3 className="text-lg font-semibold mb-6">
                                            {section.principles.label?.[lang]}
                                            </h3>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                                            {section.principles.items.map((item, i) => {
                                                const Icon = ICONS[item.icon]

                                                return(
                                                    <motion.div
                                                        key={i}
                                                        className="p-6 rounded-2xl border border-cardBorder shadow-sm text-center"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                    >
                                                        {Icon && (
                                                            <Icon className="w-8 h-8 text-mainViolet mx-auto mb-3" />
                                                        )}

                                                        <h4 className="font-semibold mb-2">
                                                            {item.title?.[lang]}
                                                        </h4>

                                                        <p className="text-sm text-txtGrey">
                                                            {item.description?.[lang]}
                                                        </p>
                                                    </motion.div>
                                                )
                                            })}
                                            </div>
                                        </div>
                                        )}
                                    </>
                                    )}
                                    {/* TIPOGRAFÍA */}
                                    {section.typography && (
                                    <div className="mt-12">
                                        <h3 className="text-lg font-semibold mb-6">
                                        {lang === "es" ? "Tipografía" : "Typography"} — {section.typography.fontName}
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                        {section.typography.samples.map((sample, i) => (
                                            <motion.div
                                            key={i}
                                            className="p-6 rounded-2xl border border-cardBorder shadow-sm"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            >
                                            <h4 className="font-semibold mb-2">
                                                {sample.label?.[lang]}
                                            </h4>

                                            <p
                                                className="text-lg mb-4 break-words whitespace-pre-wrap max-w-full"
                                                style={{
                                                fontFamily: section.typography.fontName,
                                                fontWeight:
                                                    sample.weight === "regular" ? 400 :
                                                    sample.weight === "medium" ? 500 :
                                                    sample.weight === "semibold" ? 600 :
                                                    sample.weight === "bold" ? 700 : 400
                                                }}
                                            >
                                                {sample.characters}
                                            </p>

                                            <p className="text-sm text-txtGrey">
                                                {sample.usage?.[lang]}
                                            </p>
                                            </motion.div>
                                        ))}
                                        </div>
                                    </div>
                                    )}

                                    {Array.isArray(section.media) && section.media.length > 0 && (
                                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                            {section.media.map((item, i) => {
                                                if(item.type !== "image") return null
                                                
                                                const isHero = i === 0

                                                return(
                                                    <motion.img 
                                                        key={i}
                                                        src={`/img/projects/${item.src}`}
                                                        alt={item.alt}
                                                        loading="lazy"
                                                        className={`
                                                            w-full 
                                                            rounded-2xl 
                                                            shadow-lg 
                                                            object-cover
                                                            ${isHero ? "xl:col-span-2 xl:h-[420px]" : "xl:h-[240px]"}
                                                        `}
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.4 }}
                                                    />
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )
            }
        </CompSection>
    )

}