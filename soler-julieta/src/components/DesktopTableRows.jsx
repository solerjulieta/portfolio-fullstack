import AdminActions from "./AdminActions"

export default function DesktopTableRows({
  items,
  lang,
  translateField,
  getItemTitle,
  isArchived,
  navigate,
  handleAction,
  setSelected,
  setShowModal
}) {
  return (
    <>
      {items.map(item => (
        <tr key={item._id}>
          <td className="py-4">
            {getItemTitle(item)}
          </td>

          <td className="py-4 hidden md:table-cell">
            {translateField
              ? translateField(item.category)
              : item.category?.[lang]
            }
          </td>

          <td className="py-4">
            <span
              className="px-2 py-1 rounded-full text-white text-xs"
              style={{ backgroundColor: item.status.admin_color }}
            >
              {translateField(item.status)}
            </span>
          </td>

          <td className="py-4 hidden xl:table-cell">
            {item.created_at
              ? new Date(item.created_at).toLocaleDateString("es-AR")
              : "-"
            }
          </td>

          <td className="py-4">
            <AdminActions
              onEdit={() => navigate(`/admin/${routeBase}/${item._id}/edit`)}
              onArchived={() => handleAction(item._id, "archive")}
              onRestore={() => handleAction(item._id, "restore")}
              onDelete={() => {
                setSelected(item)
                setShowModal(true)
              }}
              isArchived={isArchived}
            />
          </td>
        </tr>
      ))}
    </>
  )
}
