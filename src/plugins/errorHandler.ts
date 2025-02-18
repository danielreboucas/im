import { toastBus } from './toastBus'

export const useGlobalErrorHandler = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (error: any) => {
    let message = 'Algo de errado aconteceu!'

    if (error.response) {
      message = error.response.data.message || 'Ocorreu um erro!'
    } else if (error.request) {
      message = 'Nenhuma resposta do servidor. Por favor tente novamente.'
    } else {
      message = error.message
    }

    toastBus.emit('showToast', {
      severity: 'error',
      summary: 'Error',
      detail: message,
    })
  }
}
