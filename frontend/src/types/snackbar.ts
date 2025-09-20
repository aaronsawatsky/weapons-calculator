export type SnackbarType = 'normal' | 'warning' | 'alert'

export interface SnackbarState {
  isShow: boolean
  message: string
  messageType: SnackbarType
}
