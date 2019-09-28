import * as functions from 'firebase-functions'
import * as fs from 'fs'
import { createIpRestriction } from './restriction'

const html = fs.readFileSync(__dirname + '/../index.html').toString()

export const ipRestriction = functions.https.onRequest(async (request, response) => {
  const target = request.path.split("/")[1]
  console.log("target: ", target)

  const restriction = createIpRestriction(target)
  if (await restriction.isApplied(request.ip)) {
    console.log("ip restriction is applied")
  }

  console.log("ip: ", request.ip)
  response.status(200).send(html)
})