import * as functions from 'firebase-functions'
import * as fs from 'fs'
import { createIpRestriction } from './restriction'
import { createAuth } from './custom_claim'
import { samlOkta } from './saml'

const html = fs.readFileSync(__dirname + '/../index.html').toString()

// For proxy from hosting
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

// Call directlly
export const nextIpRestriction = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    return
  }

  console.log("ip: ", context.auth.token.ip)
  console.log("target: ", context.auth.token.target)

  const restriction = createIpRestriction(context.auth.token.target)
  if (await restriction.isApplied(context.rawRequest.ip)) {
    console.log("ip restriction is applied")
  }

  return
})

export const setCustomClaims = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    return
  }

  const idToken = context.auth.token
  const auth = createAuth(idToken)

  const result = await auth.setCustomClaims({
    ip: context.rawRequest.ip || '192.168.23.10',
    target: "example",
  })

  if (result) {
    console.log('succeeded to set CustomClaims')
  } else {
    console.log('failed to set CustomClaims')
  }
})

export const saml = functions.https.onRequest(async (request, response) => {
  //const message = request.body.SAMLResponse
  //const samlResponse = Buffer.from(message, 'base64').toString('utf8')
  //console.log(samlResponse)
  const customToken = await samlOkta(request)

  response.redirect('http://localhost:5000/login/?token='+customToken)
})