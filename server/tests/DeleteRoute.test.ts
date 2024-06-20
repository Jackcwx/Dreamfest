import request from 'supertest'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { connection } from '../db'
import server from '../server'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('Delete an Event', () => {
  it('Delete Event', async () => {
    const before = await request(server).get('/api/v1/schedule/friday')
    const res = await request(server).delete('/api/v1/events/1')
    const after = await request(server).get('/api/v1/schedule/friday')

    expect(before.body.events.length).toBeGreaterThan(after.body.events.length)
    expect(res.status).toStrictEqual(204)
  })
})
