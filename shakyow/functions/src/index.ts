import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as fs from 'fs'
import * as ipaddr from 'ipaddr.js'
import { config } from './config/config'

const databaseURL = config.firebase.databaseURL
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: databaseURL
})

const html = fs.readFileSync(__dirname + '/../index.html').toString()

export const ipRestriction = functions.https.onRequest(async (request, response) => {
  if (!request.ip) {
    response.status(200).send(html)
    return
  }

  const ip = ipaddr.IPv4.parse(request.ip)
  const com = request.path.split("/")[1]

  if (com === "") {
    response.status(200).send(html)
    return
  }

  console.log("com: ", com)

  let list = []
  try {
    const firestore = admin.firestore()
    const snapshot = await firestore.doc("metadata/" + com).get()
    if (snapshot.exists) {
      const meta = snapshot.data()
      if (meta) {
        list = meta.ips
        console.log("ip list: ", meta.ips)
      }
    }
  } catch (err) {
    console.log("err: ", err)
  }

  for (const cidr of list) {
    // check ip address
    if (!ip.match(ipaddr.IPv4.parseCIDR(cidr))) {
      console.log("no match ip")
    } else {
      console.log("match ip")
    }
  }
  console.log("ip: ", ip)
  response.status(200).send(html)
})