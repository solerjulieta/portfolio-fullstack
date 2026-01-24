export default function MobileResourceCard({
  item,
  title,
  subtitle,
  status,
  actions
}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-lineGrey">
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0">
          <h3 className="text-sm font-medium leading-snug break-words">
            {title}
          </h3>

          {subtitle && (
            <p className="text-xs text-txtGrey mt-1">
              {subtitle}
            </p>
          )}

          <div className="mt-2">
            {status}
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          {actions}
        </div>
      </div>
    </div>
  )
}
