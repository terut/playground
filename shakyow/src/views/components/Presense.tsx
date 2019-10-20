import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import * as firebase from 'firebase/app'
import 'firebase/database'

import './Presense.css'
import { number, func } from 'prop-types'

export const Presense: React.FC = (props) => {
  const db = firebase.database()
  const roomID = "example"

  const randStr = (): string => {
    const len = 5;
    const str = "abcdefghijklmnopqrstuvwxyz";
    let randStr = "";
 
    for (var i = 0; i < len; i++) {
      randStr += str[Math.floor(Math.random() * str.length)];
    }
    return randStr
  }

  const throttle = (fn: (...args: any[])=> void, interval=1000) => {
    let ready: boolean = true

    return (...args: any[]) => {
      if (!ready) {
        return
      }

      ready = false
      fn(...args)
      setTimeout(() => {
        ready = true
      }, interval)
    }
  }

  interface user {
    name: string | null
    position: {
      x: number,
      y: number
    }
  }

  const [username] = useState(randStr())
  const [users, setUsers] = useState<user[]>([])

  useEffect(() => {
    const clear = () => {
      db.ref('/users/' + username).remove()
    }

    db.ref('/users').on('value', (snapshot) => {
      console.log("update!!!!!!!!!")
      let us: user[] = []
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.key !== username) {
          console.log("key: ", childSnapshot.key)
          console.log("username: ", username)
          console.log("position: ", childSnapshot.val())
          us.push({
            name: childSnapshot.key,
            ...childSnapshot.val()
          })
        }
      })
      setUsers(us)
    })

    return clear()
  }, [db])

  console.log("username: ", username)


  const handleMouseMove = throttle((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("x,y: ", e.pageX, e.pageY);
    
    db.ref('/users/' + username).set({
      position: {
        x: e.pageX,
        y: e.pageY,
      }
    })
  })

  let icons:any = []
  users.forEach((u, idx) => {
    console.log("change position")
    icons.push(<div key={idx} style={{ position: 'absolute', top: u.position.y, left: u.position.x }}>{u.name}</div>)
  })

  return (
    <>
      <Link className="button-cancel" to="/">Back</Link>
      <div className="space" onMouseMove={handleMouseMove} >
        {icons}
      </div>
    </> 
  )
}