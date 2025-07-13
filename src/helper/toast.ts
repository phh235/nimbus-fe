import { toast } from "sonner"

interface ToastOptions {
  description?: string
  duration?: number
}

export function toastSuccess(message: string, options?: ToastOptions) {
  toast.success(message, {
    description: options?.description,
    duration: options?.duration ?? 3000,
  })
}

export function toastError(message: string, options?: ToastOptions) {
  toast.error(message, {
    description: options?.description,
    duration: options?.duration ?? 3000,
  })
}

export function toastWarning(message: string, options?: ToastOptions) {
  toast.warning(message, {
    description: options?.description,
    duration: options?.duration ?? 3000,
  })
}

export function toastInfo(message: string, options?: ToastOptions) {
  toast.info(message, {
    description: options?.description,
    duration: options?.duration ?? 3000,
  })
}
