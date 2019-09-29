import * as firebase from '@firebase/testing'
import * as fs from 'fs'

const projectId = "firestore-emulator-example-" + Date.now()
const rules = fs.readFileSync(__dirname + '/../firestore.rules', 'utf8')

interface Auth {
  uid: string
  ip?: string
  target?: string
}

function authedApp(auth: Auth) {
  return firebase.initializeTestApp({ projectId, auth }).firestore()
}

function adminApp() {
  return firebase.initializeAdminApp({ projectId }).firestore()
}

// testing library is jest.
beforeAll(async () => {
  await firebase.loadFirestoreRules({ projectId, rules })
})

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId })

  const db = adminApp()
  await db.collection('secures').doc('example').set({ msg: 'test1' })
})

afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
})

// ip and target are custom claims
test('example', async () => {
  console.log("example")
  const db = authedApp({ uid: 'myamori', ip: "192.168.23.10", target: "example" })

  await firebase.assertSucceeds(
    db.collection('secures').doc('example').get()
  )
})
