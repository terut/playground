import * as admin from 'firebase-admin'

export function createAuth(idToken: admin.auth.DecodedIdToken): Auth {
  const repo = new authRepository()
  return new Auth(repo, idToken)
}

interface CustomClaims{
  ip: string
  target: string
}

class Auth {
  repo: AuthRepository
  claims: admin.auth.DecodedIdToken

  constructor(repo: AuthRepository, idToken: admin.auth.DecodedIdToken) {
    this.repo = repo
    this.claims = idToken
  }

  async setCustomClaims(customClaims: CustomClaims): Promise<boolean> {
    return await this.repo.updateCustomClaims(this.claims, customClaims)
  }
}

interface AuthRepository {
  verify(idToken: string): Promise<admin.auth.DecodedIdToken>
  updateCustomClaims(claims: admin.auth.DecodedIdToken, customClaims: CustomClaims): Promise<boolean>
}

class authRepository {
  async verify(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return await admin.auth().verifyIdToken(idToken)
  }

  async updateCustomClaims(claims: admin.auth.DecodedIdToken, customClaims: CustomClaims): Promise<boolean> {
    try {
      await admin.auth().setCustomUserClaims(claims.sub, customClaims)
      return true
    } catch(err) {
      console.log("cannot update custom claims; ", err)
      return false
    }
  }
}