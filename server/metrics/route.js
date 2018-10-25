const Router = require('koa-router')

const router = new Router()
const controller = require('./controller')

router.get('/metrics', controller.show)

module.exports = router
