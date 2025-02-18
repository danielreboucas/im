import mitt from 'mitt'

type Events = {
  showToast: { severity: string; summary: string; detail: string }
}

export const toastBus = mitt<Events>()
