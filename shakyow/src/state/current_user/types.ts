export interface CurrentUser {
  id: string
  displayName: string
  avatar: string
}

export interface Context {
  error?: {}
}

export interface CurrentUserState {
  currentUser: CurrentUser | null
  context: Context
}