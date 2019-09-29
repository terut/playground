import React, { useEffect } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { Redirect } from 'react-router-dom'

type Props = {
  login: Function
  isLoggedIn: boolean
}

export const _Login: React.FC<Props> = (props: Props) => {
  const { login, isLoggedIn } = props

  // Where is correct layer?
  const provider = new firebase.auth.GoogleAuthProvider()

  // TODO: reconsider dependency of login
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const result = await firebase.auth().getRedirectResult()
        console.log("user: ", result.user)
        if (result.user) {
          login({
            id: result.user.uid,
            displayName: result.user.displayName,
            avatar: result.user.photoURL,
          })
        }
      } catch(err) {
        console.log("err: ", err)
      }
    }

    handleCallback()
  }, [login])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    firebase.auth().signInWithRedirect(provider)
  }

  return !isLoggedIn ?
  (
    <>
      <button className="button-primary" onClick={handleClick}>Login with Google</button>
    </>
  ) : <Redirect to="/" />
}