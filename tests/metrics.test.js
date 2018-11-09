/* global describe, test, expect, afterAll */
const prom = require('prom-client')
const supertest = require('supertest')
const app = require('../koa/app')

describe('metrics', () => {

  test('should create correct metrics', async () => {

    const params = {
      timestamp: 1541773720561,
      energyAMilliwattHour: 100,
      energyBMilliwattHour: 0,
      powerAMilliwatt: 500000,
      powerBMilliwatt: 0
    }
    const res = await supertest(app.callback()).post('/metrics').send(params)
    expect(res.status).toEqual(201)
    //expect(res.body.res).toEqual("post")
  })

  test('should get correct metrics', async () => {
    const res = await supertest(app.callback()).get('/metrics')
    expect(res.status).toEqual(200)
    // expect(res.body.res).toEqual("The test article's body")
  })


  afterAll(() => {
    server.close()
  })
})