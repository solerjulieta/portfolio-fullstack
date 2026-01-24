import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts"

export default function DownloadsByRoleChart({ data, title, t })
{
    return (
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="font-semibold mb-4">
                {title}
            </h2>

            <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        barGap={8}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                        <XAxis
                            dataKey="role"
                            tickFormatter={(value) =>
                                value === "dev"
                                    ? t("dashboard_role_dev")
                                    : t("dashboard_role_design")
                            }
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                        />

                        <YAxis
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                            allowDecimals={false}
                        />

                        <Tooltip
                            cursor={{ fill: "rgba(0,0,0,0.04)" }}
                            formatter={(value, name) => [
                                value,
                                name === "es"
                                    ? t("dashboard_lang_es")
                                    : t("dashboard_lang_en")
                            ]}
                        />

                        <Legend
                            formatter={(value) =>
                                value === "es"
                                    ? t("dashboard_lang_es")
                                    : t("dashboard_lang_en")
                            }
                        />

                        {/* Español */}
                        <Bar
                            dataKey="es"
                            radius={[6, 6, 0, 0]}
                            fill="#4CAF50"
                        />

                        {/* Inglés */}
                        <Bar
                            dataKey="en"
                            radius={[6, 6, 0, 0]}
                            fill="#2196F3"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
