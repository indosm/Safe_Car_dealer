var express = require('express');
var router = express.Router();
var fs = require('fs');
var foo = require('./authtoken').token;

router.get('/', function(req, res){
    console.log(foo);
    res.send({name:'indosm', token:foo});
});

module.exports = router;