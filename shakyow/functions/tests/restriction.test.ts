import {
  ipRestriction,
  Meta,
  createIpRestriction
} from '../src/restriction'

const repo = {
  async find(target: string): Promise<Meta> {
    const meta = new Meta()
    meta.ips = ['192.168.11.0/24', '192.168.12.12/32']
    return meta
  }
}

const repoNotFound = {
  async find(target: string): Promise<Meta> {
    const meta = new Meta()
    meta.ips = []
    return meta
  }
}

test('ip not found', async () => {
  //const r1 = new ipRestriction(repo, '')
  //const got1 = await r1.isApplied(undefined)
  //expect(got1).toBeTruthy

  //const r2 = createIpRestriction('')
  //const got2 = await r2.isApplied(undefined)
  //expect(got2).toBeTruthy
})

test('target not found', async () => {
  const r = createIpRestriction('')
  const got1 = await r.isApplied('192.168.1.11')
  expect(got1).toBeFalsy

  const got2 = await r.isApplied('192.168.11.1')
  expect(got2).toBeFalsy
})

test('restriction should be false when CIDRs is empty', async () => {
  const r = new ipRestriction(repoNotFound, '')
  const got = await r.isApplied("192.168.11.1")
  expect(got).toBeFalsy
})

describe('CIDRs is not empty', () => {
  test('ip is included in CIDRs', async () => {
    const r = new ipRestriction(repo, '')
    const got1 = await r.isApplied('192.168.11.23')
    expect(got1).toBeFalsy

    const got2 = await r.isApplied('192.168.12.12')
    expect(got2).toBeFalsy

    const got3 = await r.isApplied('192.168.12.13')
    expect(got3).toBeTruthy

    const got4 = await r.isApplied('192.168.10.10')
    expect(got4).toBeTruthy
  })
})