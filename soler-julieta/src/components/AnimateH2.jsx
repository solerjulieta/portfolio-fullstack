import { motion } from "framer-motion"

export default function AnimateH2({ title, controlled = false, variants, className = "" })
{
    const defaultVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 20, opacity: 1 }
    }

    const VIEWPORT_SETTINGS = { once: true, amount: 0, margin: "0px 0px -150px 0px" }

    return(
        <motion.h2 
            className="text-2xl lg:text-4xl mb-5 xl:leading-none xl:-mt-1"
            variants={variants || defaultVariants}
            initial={controlled ? undefined : "hidden"}
            whileInView={controlled ? undefined : "visible"}
            viewport={controlled ? undefined : VIEWPORT_SETTINGS}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            {title}
        </motion.h2>
    )
}