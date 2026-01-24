export default function SocialButtons({ hRef, target="_blank", srcIcon, imgClassName })
{
    return(
        <a 
            href={hRef}
            target={target}
            className="flex mb-4 w-12 h-12 bg-white border-2 rounded-full flex items-center justify-center shadow-inner cursor-pointer hover:shadow-mainViolet transition-colors duration-300"
        >
            <img src={srcIcon} className={imgClassName} />
        </a>
    )
}