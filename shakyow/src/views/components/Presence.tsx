import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Presence.css'
import { Presence } from '../../state/presence'

type Props = {
  presences: {[index:string]:Presence},
  subscribePresence: Function,
  unsubscribePresence: Function
}


export const _Presence: React.FC<Props> = (props: Props) => {
  const { presences, subscribePresence, unsubscribePresence } = props

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
  const handleMouseMove = throttle((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("x,y: ", e.pageX, e.pageY);
    
    // db.ref('/users/' + username).set({
    //   position: {
    //     x: e.pageX,
    //     y: e.pageY,
    //   }
    // })
  })

  let icons:any = []
  for(const key in presences) {
    console.log("p: ", presences[key])
    //console.log("change position")
    //icons.push(<div key={idx} style={{ position: 'absolute', top: u.position.y, left: u.position.x }}>{u.name}</div>)
    icons.push(<div key={key}>{presences[key].username}</div>)
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