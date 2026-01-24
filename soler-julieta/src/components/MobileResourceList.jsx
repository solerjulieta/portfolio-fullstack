import MobileResourceCard from "./MobileResourceCard"

export default function MobileResourceList({
  items,
  getTitle,
  getSubtitle,
  renderStatus,
  renderActions
}) {
  return (
    <div className="space-y-3">
      {items.map(item => (
        <MobileResourceCard
          key={item._id}
          item={item}
          title={getTitle(item)}
          subtitle={getSubtitle(item)}
          status={renderStatus(item)}
          actions={renderActions(item)}
        />
      ))}
    </div>
  )
}
