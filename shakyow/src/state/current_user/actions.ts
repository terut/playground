import { CurrentUser } from './types'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = (user: CurrentUser) => ({
  type: LOGIN as typeof LOGIN,
  payload: user
})

export const logout = () => ({
  type: LOGOUT as typeof LOGOUT
})

export type CurrentUserActionTypes =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>