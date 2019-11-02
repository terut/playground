import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Motion, spring } from 'react-motion'
import './Presence.css'
import { Presence, updatePresence } from '../../state/presence'

type Props = {
  presences: { [index: string]: Presence },
  subscribePresence: Function,
  unsubscribePresence: Function,
  updatePresence: Function,
}


export const _Presence: React.FC<Props> = (props: Props) => {
  const { presences, subscribePresence, unsubscribePresence, updatePresence } = props

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

  const [username] = useState(randStr())

  console.log("username: ", username)


  useEffect(() => {
    const subscription = {
      username: username,
      room: roomID
    }

    subscribePresence(subscription)

    return () => {
      console.log("unsubscribe")
      unsubscribePresence(subscription)
    }
  }, [subscribePresence, unsubscribePresence, username])

  const throttle = (fn: (...args: any[]) => void, interval = 500) => {
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
  const handleMouseMove = throttle((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("x,y: ", e.pageX, e.pageY);
    updatePresence({
      room: roomID,
      username: username,
      position: {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      }
    })
  })

  let icons: any = []
  for (const key in presences) {
    console.log("p: ", presences[key])
    const u = presences[key]
    if (username === u.username) {
      continue
    }
    //console.log("change position")
    if (u.position) {
      icons.push(
        <Motion key={key} style={{ x: spring(u.position.x), y: spring(u.position.y) }}>
          {style =>
            <div style={{ transform: `translate(${style.x}px, ${style.y}px)` }}>{u.username}</div>
          }
        </Motion>
      )
    } else {
      icons.push(<div key={key}>{presences[key].username}</div>)
    }
  }

  return (
    <>
      <Link className="button-cancel" to="/">Back</Link>
      <div className="space" onMouseMove={handleMouseMove} >
        {icons}
      </div>
    </>
  )
}