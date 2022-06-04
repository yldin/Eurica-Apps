var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(process.env.APP_NAME);
});

router.get('/me', (req, res, next) => {
  res.send('Hi this eurica!');
});
module.exports = router;
