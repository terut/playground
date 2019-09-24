import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { Item } from './Item'
import { Sutra } from '../../state/sutra'

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

    return clearContext()
  },[fetchSutras, clearContext])

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("logout")
    logout()
  }

  const rows = sutras.map((sutra, index) =>
    <Item key={index} url={sutra.url} description={sutra.description}></Item>
  )

  return (
    <>
      <Link className="button-nav" to="/posts/new">Post</Link>
      <button className="button-cancel ml-min" onClick={handleLogout}>Logout</button>
      <ul>
        { rows }
      </ul>
    </>
  );
}