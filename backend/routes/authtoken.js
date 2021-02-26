var request = require('request');
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next){
    const jsonFile = fs.readFileSync('./backend/data/data.json','utf8');
    let key = JSON.parse(jsonFile).key;
    let sec = JSON.parse(jsonFile).sec;
    var jsonDataObj = {"accessKey": key, "secretKey": sec, "expiresIn": 600};

    request.post({
        headers: {'content-type': 'application/json', 'accept': 'application/json'},
        url: 'https://api.luniverse.io/svc/v2/auth-tokens',
        body: jsonDataObj,
        json: true
    }, function(error, response, body){
        let obj = JSON.parse(JSON.stringify(body));
        let token=false;
        if(obj.result==true){
            token = obj.data.authToken.token;
            req.token = token;
            next();
        }
        else{
            res.send({result:false});
        }
    });
    
});
module.exports = router;