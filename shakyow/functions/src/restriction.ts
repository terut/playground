import { firestore } from './firestore'
import * as ipaddr from 'ipaddr.js'

interface IpRestriction {
  target: string
  isApplied(ip: string): Promise<boolean>
}

export function createIpRestriction(target: string): IpRestriction {
  if (!target) {
    // Null Object
    return {
      target: target,
      isApplied: async (ip: string) => {
        if (!target) {
          console.log("target not found")
          return false
        }
        console.log("ip not found")
        return true
      }
    }
  } else {
    const repo = new metaRepository(firestore())
    return new ipRestriction(repo, target)
  }
}

type CIDR = [ipaddr.IPv4, number]

export class ipRestriction implements IpRestriction {
  repo: MetaRepository
  target: string
  private cidrs?: CIDR[]

  constructor(repo: MetaRepository, target: string) {
    this.repo = repo
    this.target = target
  }

  async isApplied(ipStr: string): Promise<boolean> {
    if (!ipStr) {
      console.log("taraget found, but ip not found")
      return true
    }
    const cidrs = await this.CIDRs()

    if (cidrs.length < 1) {
      console.log("CIDRs not found")
      return false
    }

    const ip = ipaddr.IPv4.parse(ipStr)
    return cidrs.every(cidr => { return !ip.match(cidr) })
  }

  private async CIDRs(): Promise<CIDR[]> {
    if (this.cidrs) return this.cidrs

    const meta = await this.repo.find(this.target)
    this.cidrs = meta.ips.map<CIDR>(ip => { return ipaddr.IPv4.parseCIDR(ip) })

    return this.cidrs
  }
}

export class Meta {
  ips: string[]

  constructor() {
    this.ips = []
  }
}

interface MetaRepository {
  find(target: string): Promise<Meta>
}

export class metaRepository {
  database: FirebaseFirestore.Firestore

  constructor(database: FirebaseFirestore.Firestore) {
    this.database = database
  }

  async find(target: string): Promise<Meta> {
    const meta = new Meta()
    try {
      const snapshot = await this.database.doc("metadata/" + target).get()
      if (snapshot.exists) {
        const data = snapshot.data()
        if (data) {
          meta.ips = data.ips
          console.log("ip list: ", data.ips)
        }
      }
    } catch (err) {
      console.log("err: ", err)
    }
    return meta
  }
}