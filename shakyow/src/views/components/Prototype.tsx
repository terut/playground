import React from 'react'
import { Link } from 'react-router-dom'

import * as firebase from 'firebase/app'
import 'firebase/functions'

export const Prototype: React.FC = (props) => {

  const handleSetCustomClaims = async () => {
    // Finally, Move to callback of authentication
    const currentUser = firebase.auth().currentUser
    if (!currentUser) {
      return
    }

    const setCustomClaims = firebase.functions().httpsCallable('setCustomClaims')
    await setCustomClaims()
    await currentUser.getIdToken(true)
  }

  const handleTryIPRestriction = async () => {
    const restriction = firebase.functions().httpsCallable('nextIpRestriction')
    await restriction()
  }


  return (
    <>
      <Link className="button-cancel" to="/">Back</Link>
      <button className="button-primary ml-min" onClick={handleSetCustomClaims}>Try to set CustomClaims</button>
      <button className="button-primary ml-min" onClick={handleTryIPRestriction}>Try IP Restriction</button>
    </>
  )
}