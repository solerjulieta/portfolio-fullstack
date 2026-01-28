import { useTranslation } from 'react-i18next'
import CompSection from './CompSection'
import Subtitle from './Subtitle'
import { useEffect, useRef, useState } from 'react'
import educationService from '../services/education.service'
import { motion, AnimatePresence } from "framer-motion"
import AnimateH2 from './AnimateH2'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { ITEMS_PER_SCREEN } from '../constants/layout'
import { useLoadMore } from '../hooks/useLoadMore'
import LoadMoreButton from './LoadMoreButton'

export default function MyEducation() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.slice(0, 2) || "es"

  const [studies, setStudies] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("Degree")
  const [courseSubcategories, setCourseSubcategories] = useState([])
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [hydrated, setHydrated] = useState(false)
  const isBackendRefresh = useRef(false)

  const breakpoint = useBreakpoint()
  const initialLimit = ITEMS_PER_SCREEN[breakpoint]

  async function loadEducationSnapshot(){
    const res = await fetch('/data/portfolio.json')
    if(!res.ok) throw new Error('Snapshot not found')

    const json = await res.json()
    return json.education || []
  }

  function publishOnly(data) {
    return data.filter(
      item => item.status?.key === "PUBLISHED"
    )
  }

  function buildSubcategories(data) {
    const uniqueSubcatsMap = new Map()

    data
      .filter(
        item =>
          item.category?.key === 'Course' &&
          item.subcategory?.es &&
          item.subcategory?.en
      )
      .forEach(item => {
        const key = item.subcategory.en
        if (!uniqueSubcatsMap.has(key)) {
          uniqueSubcatsMap.set(key, item.subcategory)
        }
      })

    setCourseSubcategories(Array.from(uniqueSubcatsMap.values()))
  }

  useEffect(() => {
    let isMounted = true

    async function loadData(){
      //Cargar snapshot primero
      try{
        const snapshot = await loadEducationSnapshot()
        if(!isMounted) return

        const published = publishOnly(snapshot)
        setStudies(published)
        buildSubcategories(published)
        setHydrated(true)
      } catch(err){
        console.warn("No snapshot available", err)
      }

      //Pedir al backend en paralelo
      try{
        const apiData = await educationService.getAll()
        if(!isMounted) return

        const published = publishOnly(apiData)
        isBackendRefresh.current = true
        setStudies(published)
        buildSubcategories(published)
        console.log("Education updated from API")
      } catch(err){
        console.warn("API failed, keeping snapshot", err)
      }


    }
          loadData()

      return () => {
        isMounted = false
      }
  }, [])

  /*
  useEffect(() => {
    educationService.getAll().then(data => {
      const publishedStudies = data.filter(
        item => item.status?.key === "PUBLISHED"
      )

      setStudies(publishedStudies)

      const uniqueSubcatsMap = new Map()
      publishedStudies
        .filter(
          item =>
            item.category.key === 'Course' &&
            item.subcategory?.es &&
            item.subcategory?.en
        )
        .forEach(item => {
          const key = item.subcategory.en
          if (!uniqueSubcatsMap.has(key)) {
            uniqueSubcatsMap.set(key, item.subcategory)
          }
        })

      setCourseSubcategories(Array.from(uniqueSubcatsMap.values()))
    })
  }, [])*/

  const totalDegree = studies.filter(s => s.category?.key === "Degree").length

  const totalCourses = selectedSubcategory
    ? studies.filter(
        s =>
          s.category?.key === "Course" &&
          s.subcategory &&
          s.subcategory[lang] === selectedSubcategory[lang]
      ).length
    : studies.filter(s => s.category?.key === "Course").length

  const filteredStudies = studies.filter(study => {
    const categoryKey = study.category?.key

    if (selectedCategory === "Degree" && categoryKey !== "Degree") return false
    if (selectedCategory === "Course" && categoryKey !== "Course") return false

    if (selectedCategory === 'Course' && selectedSubcategory) {
      return study.subcategory?.[lang] === selectedSubcategory[lang]
    }

    return true
  })

  const {
    visibleItems: visibleStudies,
    hasMore,
    loadMore
  } = useLoadMore(
    filteredStudies,
    initialLimit,
    initialLimit,
    [selectedCategory, selectedSubcategory, breakpoint]
  )

  // ==========================
  // VARIANTS UNIFICADOS
  // ==========================

  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <CompSection
      compId="education"
      className="mt-20 scroll-mt-[90px] lg:scroll-mt-[150px]"
    >
      <motion.div
        variants={sectionVariants}
        initial={hydrated ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
      >
        <div className="grid grid-cols-1 xl:grid-cols-[auto,1fr] xl:items-start xl:gap-y-6 relative">

          {/* SUBTITLE */}
          <motion.div variants={itemVariants} className="xl:mr-4">
            <Subtitle
              subtitle={t("subtitle_education")}
              controlled
              variants={itemVariants}
            />
          </motion.div>

          <div className="w-full">

            {/* TITLE */}
            <AnimateH2
              title={t("title_education")}
              controlled
              variants={itemVariants}
            />

            {/* 1. Tabs de Categorías */}
            <motion.div
              className="flex flex-wrap gap-x-4 mb-6 ul-links"
              variants={itemVariants}
            >
              <button
                onClick={() => {
                  setSelectedCategory("Degree")
                  setSelectedSubcategory(null)
                }}
                className={`text-base lg:text-lg font-bold transition-colors duration-300 ${
                  selectedCategory === "Degree"
                    ? "border-mainViolet text-mainViolet"
                    : "text-txtGrey hover:text-darkViolet"
                }`}
              >
                {t("tech_degrees")} ({totalDegree})
              </button>

              <button
                onClick={() => setSelectedCategory("Course")}
                className={`text-base lg:text-lg font-bold transition-colors duration-300 ${
                  selectedCategory === "Course"
                    ? "border-mainViolet text-mainViolet"
                    : "text-txtGrey hover:text-darkViolet"
                }`}
              >
                {t("Course")} ({totalCourses})
              </button>
            </motion.div>

            {/* 2. Chips */}
            {selectedCategory === "Course" && (
              <motion.div
                className="flex flex-wrap gap-2 mb-8"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className={`py-1 px-3 rounded-full text-sm transition-colors duration-200 ${
                    selectedSubcategory === null
                      ? 'bg-mainViolet text-white font-semibold shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t("all_courses")}
                </button>

                {courseSubcategories.map(subcat => (
                  <button
                    key={subcat.en}
                    onClick={() => setSelectedSubcategory(subcat)}
                    className={`py-1 px-3 rounded-full text-sm transition-colors duration-200 ${
                      selectedSubcategory &&
                      selectedSubcategory.en === subcat.en
                        ? 'bg-mainViolet text-white font-semibold shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {subcat[i18n.language]}
                  </button>
                ))}
              </motion.div>
            )}

            {/* TIMELINE */}
            <div className="relative w-full mt-5">
              <div className="absolute left-5 md:left-1/2 top-0 h-full border-l-2 border-gray-300 md:transform md:-translate-x-1/2 z-0"></div>

              <div className="flex flex-col space-y-16">
                <AnimatePresence initial={false}>
                  {visibleStudies.map((study, index) => {
                    const isLeft = index % 2 === 0
                    const isDegree = study.category?.key === 'Degree'
                    const pointColor = isDegree
                      ? "bg-mainViolet"
                      : "bg-blue-500"
                    const iconClass = isDegree
                      ? 'pi-graduation-cap'
                      : 'pi-book'

                    return (
                      <motion.div
                        //key={study._id || index}
                        key={study.uid}
                        layout
                        initial={hydrated && isBackendRefresh.current ? false : { opacity: 0, x: isLeft ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.15,
                          ease: "easeOut"
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          transition: { duration: 0.2 }
                        }}
                        className={`
                          relative flex items-start w-full 
                          pr-4 
                          md:w-1/2
                          ${
                            isLeft
                              ? "md:pr-12 md:pl-0 md:ml-0 md:self-start"
                              : "md:pl-12 md:pr-0 md:ml-auto md:self-end"
                          }
                        `}
                      >
                        {/* MARKER */}
                        <div
                          className={`
                            absolute w-8 h-8 rounded-full flex items-center justify-center
                            shadow-lg text-white text-lg z-20 top-0
                            ${pointColor}
                            left-5 transform -translate-x-1/2
                            md:transform-none
                            ${isLeft ? "md:-right-4 md:left-auto" : "md:-left-4"}
                          `}
                        >
                          <i className={`pi ${iconClass}`}></i>
                        </div>

                        {/* CARD */}
                        <div
                          className={`
                            flex-1 p-6 rounded-xl shadow-lg bg-white
                            border border-gray-100 z-10
                            ml-[40px]
                            md:ml-0
                          `}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-medium uppercase tracking-wider text-mainViolet bg-mainViolet/10 py-1 px-3 rounded-lg">
                              {study.start} - {study.end || t("current")}
                            </p>

                            {study.mode && (
                              <span
                                className="text-gray-500 text-xs flex items-center py-1 px-2 rounded-full bg-gray-50/50"
                                title={study.mode[lang]}
                              >
                                <i
                                  className={`pi ${
                                    study.mode.en
                                      .toLowerCase()
                                      .includes('virtual') ||
                                    study.mode.en
                                      .toLowerCase()
                                      .includes('online')
                                      ? 'pi-desktop'
                                      : 'pi-building'
                                  } mr-1 text-sm`}
                                ></i>
                                <span className="hidden sm:inline">
                                  {study.mode[lang]}
                                </span>
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 leading-tight">
                            {study.title[lang]}
                          </h3>

                          <p className="text-base text-gray-700 mt-1">
                            {study.institution?.[lang]}
                          </p>

                          {(study.skills?.length > 0 ||
                            study.soft_skills?.length > 0) && (
                            <div className="mt-4 border-t border-gray-100 pt-3">
                              {study.skills?.length > 0 && (
                                <div className="mb-2 flex flex-wrap">
                                  <p className="text-xs font-semibold uppercase text-gray-500 w-full mb-1">
                                    {t("skills")}:
                                  </p>
                                  {study.skills.map(skill => (
                                    <span
                                      key={skill.en}
                                      className="text-xs px-2 py-0.5 mr-1 mt-1 rounded-lg
                                      border-2 border-transparentViolet text-mainViolet font-medium"
                                    >
                                      {skill[lang]}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {study.soft_skills?.length > 0 && (
                                <div className="mb-2 flex flex-wrap">
                                  <p className="text-xs font-semibold uppercase text-gray-500 w-full mb-1">
                                    {t("softskills") || 'Soft Skills'}:
                                  </p>
                                  {study.soft_skills.map(skill => (
                                    <span
                                      key={skill.en}
                                      className="text-xs px-2 py-0.5 mr-1 mt-1 rounded-lg
                                      border-2 border-txtGrey/10 text-txtGrey font-medium"
                                    >
                                      {skill[lang]}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          {study.description?.[lang] && (
                            <p
                              className={`mt-3 text-sm text-gray-600 ${
                                study.skills?.length ||
                                study.soft_skills?.length
                                  ? ''
                                  : 'border-t border-gray-100 pt-3'
                              }`}
                            >
                              {study.description[lang]}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            </div>

            <LoadMoreButton
              show={hasMore}
              onClick={loadMore}
              label={t("see_more")}
            />
          </div>
        </div>
      </motion.div>
    </CompSection>
  )
}
