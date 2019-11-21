import * as samlify from 'samlify'
import * as fs from 'fs'
import * as admin from 'firebase-admin'

samlify.setSchemaValidator({
    validate: (response: string) => {
        return Promise.resolve('skipped')
    }
})

// See: https://samlify.js.org/#/sp
const sp = samlify.ServiceProvider({
    metadata: fs.readFileSync(__dirname + '/../metadata.xml')
})
// Download from IdP
const idp = samlify.IdentityProvider({
    metadata: fs.readFileSync(__dirname + '/../idp_metadata.xml')
})

export async function samlOkta(req: any) {
    const result = await sp.parseLoginResponse(idp, 'post', req)
    console.log(JSON.stringify(result, undefined, 2))
    const email = result.extract.nameID
    console.log("username: ", email)

    let user;
    try {
        user = await admin.auth().getUserByEmail(email)
    } catch (err) {
        if (err.code != "auth/user-not-found") throw err

        console.log("create user")
        // Note: attribute statements are required to get firstName and lastName
        user = await admin.auth().createUser({
            email: email,
            displayName: result.extract.attributes.firstName + " " + result.extract.attributes.lastName,
        })
    }
    const customToken = await admin.auth().createCustomToken(user.uid)
    return customToken
}