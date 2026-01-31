import CompSection from './CompSection'
import { motion } from 'framer-motion'
import Subtitle from './Subtitle'

export default function ProjectDetail()
{
    return(
        <CompSection className="mt-20">
            <div className="xl:flex xl:items-start">
                <div className="xl:mr-4">
                    <Subtitle subtitle="Marca" />
                </div>
                <div>
                    <h1 className="text-2xl lg:text-4xl mb-5">Donde empieza la identidad</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>
            <div className="flex">
                <div className="xl:mr-4">
                    <Subtitle subtitle="Isologo" />
                </div>
                <div>
                    <h2>Cuando la marca se vuelve forma</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>
            <div className="flex">
                <div className="xl:mr-4">
                    <Subtitle subtitle="Color" />
                </div>
                <div>
                    <h2>Donde la emoción toma color</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>
        </CompSection>
    )

}