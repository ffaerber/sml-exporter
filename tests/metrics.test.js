/* global describe, test, expect, afterAll */
const prom = require('prom-client')
const supertest = require('supertest')
const app = require('../server/app')


beforeAll(() => {
  const gauge = new prom.Gauge({
    name: 'gauge_name',
    help: 'gauge_help'
  });
  gauge.set(1000, 1234324)
  gauge.set(2000, 1234326)
})

describe('metrics', () => {

  test('should get correct metrics', async () => {
    const res = await supertest(app.callback()).get('/metrics')
    expect(res.status).toEqual(200)

    const res2 = await supertest(app.callback()).get('/metrics')
    expect(res2.status).toEqual(200)

    // expect(res.body.res).toEqual("The test article's body")
  })

  afterAll(() => {
    server.close()
  })
})