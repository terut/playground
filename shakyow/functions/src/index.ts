import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as fs from 'fs'
import * as ipaddr from 'ipaddr.js'
import { config } from './config/config'

const databaseURL = config.firebase.databaseURL
const html = fs.readFileSync('./index.html').toString()

export const ipRestriction = functions.https.onRequest((request, response) => {
  const ip = ipaddr.IPv4.parse(request.ip)
  const com = request.path.split("/")[1]

  if (com !== "") {
    console.log("com: ", com)
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: databaseURL
    })
    const firestore = admin.firestore()

    firestore.doc("metadata/" + com).get().then(snapshot => {
      let list = []
      if (snapshot.exists) {
        const meta = snapshot.data()
        if (meta) {
          list = meta.ips
          console.log("ip list: ", meta.ips)
        }
      }

      for (const cidr of list) {
        if (!ip.match(ipaddr.IPv4.parseCIDR(cidr))) {
          console.log("no match ip")
        } else {
          console.log("match ip")
        }
      }
      console.log("ip: ", ip)
      response.status(200).send(html)
    }).catch(err => {
      console.log("err", err)
    })
  } else {
    console.log("ip: ", ip)
    response.status(200).send(html)
  }
})