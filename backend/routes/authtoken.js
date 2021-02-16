var request = require('request');
var express = require('express');
var router = express.Router();
var fs = require('fs');

let token;
let i=0;

router.get('/', function(req, res){
    let key = 'P5av...';
    let sec = 'zTGb...';
    const jsonFile = fs.readFileSync('./backend/data/data.json','utf8');
    key = JSON.parse(jsonFile).key;
    sec = JSON.parse(jsonFile).sec;
    console.log(key);
    console.log(sec);
    var jsonDataObj = {"accessKey": key, "secretKey": sec, "expiresIn": 200};

    request.post({
        headers: {'content-type': 'application/json', 'accept': 'application/json'},
        url: 'https://api.luniverse.io/svc/v2/auth-tokens',
        body: jsonDataObj,
        json: true
    }, function(error, response, body){
        res.json(body);
        let obj = JSON.parse(JSON.stringify(body));
        token=false;
        if(obj.result==true){
            token = obj.data.authToken.token;
            //localStorage.setItem('token', obj.data.authToken.token);
        }
        console.log(token);
        //exports.token = i;
        //console.log(token);
        //console.log(obj.data.authToken.token);
    });
});
module.exports = {router,token};