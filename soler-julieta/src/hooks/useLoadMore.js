import { useEffect, useState } from 'react'

/**
 * items: array completo (proyectos, cursos, etc)
 * initialLimit: cuántops mostrar al inicio
 * step: cuántos agregar al hacer "ver más"
 * deps: dependencias que resetean el contador (categoría, breakpoint, etc)
 */

export function useLoadMore(
    items,
    initialLimit,
    step = initialLimit,
    deps = []
) {
    const [visibleCount, setVisibleCount] = useState(initialLimit)

    //Resete cuando cambia categoría o tamaño de pantalla
    useEffect(() => {
        setVisibleCount(initialLimit)
    }, [items, initialLimit, ...deps])

    const loadMore = () => {
        setVisibleCount(prev => prev + step)
    }

    const visibleItems = items.slice(0, visibleCount)
    const hasMore = visibleCount < items.length

    return{
        visibleItems,
        hasMore,
        loadMore
    }
}