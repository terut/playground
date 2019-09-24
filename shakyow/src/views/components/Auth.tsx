import React, { ReactElement } from 'react'
import { Redirect } from 'react-router-dom'

type Props = {
  children: ReactElement
  isLoggedIn: boolean
}

export const _Auth: React.FC<Props> = (props: Props) => {
  const { children, isLoggedIn } = props

  console.log("auth: ", isLoggedIn)

  return isLoggedIn ? children : <Redirect to="/login" />
}