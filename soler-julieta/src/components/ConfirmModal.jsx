import BaseModal from './BaseModal'
import { Dialog, Transition } from '@headlessui/react'

export default function ConfirmModal({
  isOpen,
  title = "Confirmar acción",
  message = "¿Estás seguro/a?",
  confirmBtn = "Aceptar",
  cancelBtn = "Cancelar",
  onConfirm,
  onCancel,
})
{
  return(
    <BaseModal isOpen={isOpen} onClose={onCancel}>
      <Dialog.Title className="text-lg font-semibold mb-4">
        {title}
      </Dialog.Title>
      <p className="text-gray-700 mb-6">{message}</p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          {cancelBtn}
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          {confirmBtn}
        </button>
      </div>
    </BaseModal>
  )
}