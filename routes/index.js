const router = require('koa-router')()
const indexControllers = require('../controllers/index')


router.get('/', indexControllers.index)

module.exports = router
