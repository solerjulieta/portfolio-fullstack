import { useTranslation } from "react-i18next"
import AdminTable from "./AdminTable"

export default function TopProjectsTable({ projects, lang })
{
  const { t } = useTranslation()
  const maxVisits = Math.max(...projects.map(p => p.visits))

  const BAR_COLORS = [
    "bg-[#4CAF50]",
    "bg-[#2196F3]",
    "bg-[#9C27B0]" 
  ]

  const tableHeads = [
    { name: t("dashboard_project") },
    { name: t("dashboard_category") },
    { name: t("dashboard_views") },
    { name: t("dashboard_popularity") },
  ]



  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6">
      <h2 className="font-semibold mb-4">{t("dashboard_top_projects")}</h2>

      <AdminTable tableHeads={tableHeads}>
        {projects.map((project, index) => {
          const percent = Math.round((project.visits / maxVisits) * 100)

          return(
            <tr 
              key={project.id}
              className="py-6 text-sm text-txtGrey"
            >
              <td className="py-6 text-sm text-txtGrey">
                {project.title}
              </td>
              <td className="py-6 text-sm text-txtGrey">
                {project.category?.[lang]}
              </td>
              <td className="py-6 text-sm font-semibold text-txtGrey">
                {project.visits}
              </td>
              <td>
                <div className="h-2 bg-gray-100 rounded">
                    <div
                      className={`h-2 rounded ${BAR_COLORS[index]} ?? "bg-gray-400"`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
              </td>
            </tr>
          )
        })}
      </AdminTable>
    </div>
  )
}
