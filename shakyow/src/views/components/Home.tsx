import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase/app'
import 'firebase/functions'
import './Home.css'
import { Item } from './Item'
import { Sutra } from '../../state/sutra'
import { firestore } from 'firebase'

type Props = {
  sutras: Sutra[],
  fetchSutras: Function,
  clearContext: Function,
  logout: Function,
}

export const _Home: React.FC<Props> = (props: Props) => {
  const { sutras, fetchSutras, clearContext, logout } = props

  useEffect(() => {
    fetchSutras()

    // Move to saga
    const handleRestriction = async () => {
      const restriction = firebase.functions().httpsCallable('nextIpRestriction')
      await restriction()
    }

    handleRestriction()

    return clearContext()
  },[fetchSutras, clearContext])

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("logout")
    logout()
  }

  const handleReadSecureData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const snapshot = await firebase.firestore().collection('secures').get()
    snapshot.docs.forEach(d => {
      console.log("msg: ", d.data().msg)
    })
  }

  const rows = sutras.map((sutra, index) =>
    <Item key={index} url={sutra.url} description={sutra.description}></Item>
  )

  return (
    <>
      <Link className="button-nav" to="/posts/new">Post</Link>
      <button className="button-cancel ml-min" onClick={handleLogout}>Logout</button>
      <button className="button-primary ml-min" onClick={handleReadSecureData}>ReadSecureData</button>
      <ul>
        { rows }
      </ul>
    </>
  );
}