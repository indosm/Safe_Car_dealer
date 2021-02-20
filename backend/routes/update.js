var request = require('request');
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res){
    const jsonFile = fs.readFileSync('./backend/data/token.json','utf8');
    let token = JSON.parse(jsonFile).data.authToken.token;
    let traceprogramID = '8251436548465821173';
    let timestamp = Math.floor(+ new Date() / 1000);
    console.log(timestamp);
    if(token!=undefined){
        var jsonDataObj = {
            "objectId": "Lambda256.stock_1",
            "timestamp": timestamp,
            "userName": "by vscode",
            "eventName": "Test2",
            "data": "JSON.stringify({ key222: value11 })"
          };

        request.post({
            headers: {'content-type': 'application/json', 'Authorization':'Bearer '+token},
            url: 'https://api.luniverse.io/svc/v2/neptune/trace-programs/'+traceprogramID+'/events',
            body: jsonDataObj,
            json: true
        }, function(error, response, body){
            res.json(body);
            let obj = JSON.parse(JSON.stringify(body));
        });
    }
    else{
        console.log('token undefined');
        res.send({'token':token});
    }
});

module.exports = router;