import React, { useEffect } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { Redirect } from 'react-router-dom'
import * as queryString from 'query-string'
import * as H from 'history'
import { isString } from 'util'

type Props = {
  login: Function
  isLoggedIn: boolean
  location: H.Location
}

export const _Login: React.FC<Props> = (props: Props) => {
  const { login, isLoggedIn, location} = props

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

    const sso = async () => {
      console.log("location: ", location)
      const parsed = queryString.parse(location.search)
      console.log("token: ", parsed.token)
      if (!isString(parsed.token)) {
        return
      }

      await firebase.auth().signInWithCustomToken(parsed.token)
      const user = firebase.auth().currentUser
      console.log(JSON.stringify(user, undefined, 2))
      if (user) {
        login({
          id: user.uid,
          displayName: user.displayName,
          avatar: user.photoURL
        })
      }
    }

    handleCallback()
    sso()
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