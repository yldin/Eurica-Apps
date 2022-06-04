
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Eurica' });
});

router.get('/home', (req, res, next) => {
  res.json({
    message: 'This is eurica-apps'
  });
});

module.exports = router;
