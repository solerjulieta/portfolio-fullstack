import { AcademicCapIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

export default function AdminCard({ panelInfo, classWidth })
{
    const Icon = panelInfo.icon
    const trend = panelInfo.trend
    const colorTrend =  trend?.percent >= 0
        ? "text-green-600"
        : "text-red-600"

    const TrendIcon = 
        trend?.percent > 0
            ? ArrowTrendingUpIcon
            : ArrowTrendingDownIcon

    return(
        <li className={`bg-white rounded-lg shadow-md p-4 mt-14 flex flex-col justify-between ${classWidth}`}>
            <div className={`rounded-full -mt-12 w-16 h-16 p-2 flex justify-center items-center ${panelInfo.backGround}`}>
                <Icon className="w-7 h-7 text-white" />
            </div>
            <div className="text-right">
                <h2 className="text-txtGrey font-normal -mt-6" >{panelInfo.name}</h2>
                <p className="font-bold text-2xl">{panelInfo.count}</p>
            </div>

            {panelInfo.extra?.length > 0 && (
                <>
                    <hr
                        className="my-3 h-px border-0 opacity-25 bg-gradient-to-r from-transparent via-txtGrey/40 to-transparent"
                    />
                    <ul className="text-txtGrey/60 text-sm flex justify-between flex-wrap">
                        {panelInfo.extra.map((item, i) => (
                            <li 
                                key={i}
                            >
                                <span>{item.label}:</span>
                                <span className="ml-1">{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {trend && (
                <>
                    <hr
                        className="my-3 h-px border-0 opacity-25 bg-gradient-to-r from-transparent via-txtGrey/40 to-transparent"
                    />
                    {trend.percent !== null && (
                        <p
                            className="text-right text-sm font-medium text-txtGrey/70 flex items-center mb-1 justify-center"
                        >
                            <TrendIcon className={`w-4 h-4 mr-1 ${colorTrend}`} />
                                <span className={`text-bold ${colorTrend}`}>
                                {Math.abs(trend.percent)}%</span> que {trend.previousLabel.toLowerCase()}
                        </p>
                    )}
                    <div className="flex justify-between text-sm text-txtGrey/60">
                        <span>
                            {trend.currentLabel}: {trend.current}
                        </span>
                        <span>
                            {trend.previousLabel}: {trend.previous}
                        </span>
                    </div>
                </>
            )}
        </li>
    )
}