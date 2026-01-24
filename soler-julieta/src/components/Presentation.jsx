import { useTranslation } from 'react-i18next'
import CVButton from './CVButton'

export default function Presentation()
{
    const { t } = useTranslation()

    return(
        <section className="relative h-[500px] xl:h-[600px] w-full flex items-center justify-center shadow-[inset_0_-1px_0_rgba(22,27,59,0.04)] lg:max-w-7xl lg:m-auto lg:justify-between">
            <div
                className="absolute inset-0 z-0"
                style={{
                background: "#ffffff",
                backgroundImage: `
                    radial-gradient(
                    circle at top center,
                    rgba(173, 109, 244, 0.5),
                    transparent 60%
                    )
                `,
                filter: "blur(100px)",
                backgroundRepeat: "no-repeat",
                }}
            />
            <div className="z-10 flex flex-col items-center lg:items-start">
                <h1 className="text-[30px] lg:text-[46px]">Julieta Natalí Soler</h1>
                <p className="text-title text-2xl lg:text-4xl text-txtGrey self-start">
                    <strong 
                        className="flex flex-col"
                        dangerouslySetInnerHTML={{ __html: t("subtitle_presentation")}}
                    />
                </p>
                <CVButton txtButton={t("cv_button")} className="mt-5 w-full lg:w-36" />
            </div>
            <div className="fondo-logo z-20 hidden lg:block lg:self-center">
                <img src="/img/biglogo-solerjulieta.png" className="z-40 w-[500px] h-[500px]" />
            </div>
        </section>
    )
}