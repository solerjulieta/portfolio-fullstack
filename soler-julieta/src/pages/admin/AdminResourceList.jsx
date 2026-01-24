import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
import AdminLayout from "../../components/AdminLayout"
import ConfirmModal from "../../components/ConfirmModal"
import AdminActions from "../../components/AdminActions"
import MobileResourceList from "../../components/MobileResourceList"
import DesktopTableRows from "../../components/DesktopTableRows"
import toast from "react-hot-toast"

export default function AdminResourceList({
  title,
  archivedTitle,
  service,
  routeBase,
  heads,
  panelInfo = [],
  translateField,
}) {
  const location = useLocation()
  const isArchived = location.pathname.includes("archived")
  const navigate = useNavigate()
  const lang = useTranslation().i18n.language

  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    service.getAll().then(setItems)
  }, [])

  const filtered = items.filter(item =>
    isArchived
      ? item.status?.key === "ARCHIVED"
      : item.status?.key !== "ARCHIVED"
  )

  const handleAction = async (id, action) => {
    const call = {
      archive: service.archive,
      restore: service.restore,
      delete: service.delete,
    }[action]

    try {
      const res = await call(id)
      toast.success(res.msg)
      setItems(await service.getAll())
    } catch (err) {
      toast.error(err.error?.msg || "Error inesperado")
    }
  }

  const resolvedPanelInfo = panelInfo.map(info => ({
    ...info,
    count: items.filter(item => item.category?.key === info.key).length
  }))

  const getItemTitle = (item) => {
    if (!item?.title) return ""

    if (typeof item.title === "object") {
      return item.title[lang] ?? item.title.es ?? ""
    }

    return item.title
  }

  // ===== Helpers para mobile =====

  const renderStatus = (item) => (
    <span
      className="px-2 py-1 rounded-full text-white text-xs"
      style={{ backgroundColor: item.status.admin_color }}
    >
      {translateField(item.status)}
    </span>
  )

  const renderActions = (item) => (
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
  )

  const getSubtitle = (item) => {
    const category = translateField
      ? translateField(item.category)
      : item.category?.[lang]

    const date = item.created_at
      ? new Date(item.created_at).toLocaleDateString("es-AR")
      : null

    return `${category}${date ? " • " + date : ""}`
  }

  return (
    <AdminLayout
      title={isArchived ? archivedTitle : title}
      heads={heads}
      panelInfo={!isArchived ? resolvedPanelInfo : []}
      txt={!isArchived ? `Agregar ${title}` : null}
      btnRoute={!isArchived ? "create" : null}
      txtArchived={archivedTitle}
    >
      {filtered.length === 0 && (
        <div className="py-6 text-sm text-txtGrey">
          No hay datos.
        </div>
      )}

      {/* ===== DESKTOP / TABLE ===== */}
      <div className="hidden lg:block">
        <DesktopTableRows
          items={filtered}
          lang={lang}
          translateField={translateField}
          getItemTitle={getItemTitle}
          isArchived={isArchived}
          navigate={navigate}
          routeBase={routeBase}
          handleAction={handleAction}
          setSelected={setSelected}
          setShowModal={setShowModal}
        />
      </div>

      {/* ===== MOBILE / CARDS ===== */}
      <div className="block lg:hidden">
        <MobileResourceList
          items={filtered}
          getTitle={getItemTitle}
          getSubtitle={getSubtitle}
          renderStatus={renderStatus}
          renderActions={renderActions}
        />
      </div>

      <ConfirmModal
        isOpen={showModal}
        title={`Eliminar ${title}`}
        message={`¿Eliminar "${getItemTitle(selected)}"? No se puede deshacer.`}
        confirmBtn="Eliminar"
        onConfirm={() => {
          handleAction(selected._id, "delete")
          setShowModal(false)
        }}
        onCancel={() => setShowModal(false)}
      />
    </AdminLayout>
  )
}
