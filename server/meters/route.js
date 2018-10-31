const Router = require('koa-router')

const router = new Router()
const controller = require('./controller')

router.get('/meters', controller.list)

module.exports = router