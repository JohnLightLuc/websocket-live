const router = require('express').Router();
const controller = require("../controllers/index");

/* GET home page. */
router.get('/', controller.index);
router.get('/tracking/:roomeName', controller.position);
router.get('/stop-sharing', controller.stop);



module.exports = router;