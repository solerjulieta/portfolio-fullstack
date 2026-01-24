import { motion } from "framer-motion"

export default function Subtitle({ subtitle, controlled = false, variants })
{
    const defaultVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    }  
    return(
        <motion.div 
            className="subtitle-container"
            variants={variants || defaultVariants}
            initial={controlled ? undefined : "hidden"}
            whileInView={controlled ? undefined : "visible"}
            viewport={controlled ? undefined : { once: true, amount: 0.8 }}
            transition={{ duration: 0.6 }}
        >
            <div className="subtitle-text">{subtitle}</div>
            <div className="subtitle-line"></div>
        </motion.div>
    )
}