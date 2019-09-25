import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as fs from 'fs'

const databaseURL = "xxxxxxx"
const html = fs.readFileSync('./index.html').toString()

export const ipRestriction = functions.https.onRequest((request, response) => {
  const ip = ""
  const com = request.path.split("/")[1]

  if (com !== "") {
    console.log("com: ", com)
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: databaseURL
    })
    const firestore = admin.firestore()

    firestore.doc("metadata/" + com).get().then(snapshot => {
      if (snapshot.exists) {
        const data = snapshot.data()
        if (data) {
          data.ips
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