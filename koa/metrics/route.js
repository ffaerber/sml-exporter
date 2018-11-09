const Router = require('koa-router')

const router = new Router()
const controller = require('./controller')

router.get('/metrics', controller.show)
router.post('/metrics', controller.create)

module.exports = router