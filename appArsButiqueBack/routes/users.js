var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/:idUsuario', (req, res) => {
  res.send('esta mierda va')
})

module.exports = router;