var request = require('request');
var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', function(req, res){
    let token = req.token;
    //console.log('auth로 부터 온 token : '+token);
    if(token!=undefined){
        var jsonDataObj = {a:'a'};

        request.get({
            headers: {'content-type': 'application/json', 'Authorization':'Bearer '+token},
            url: 'https://api.luniverse.io/svc/v2/neptune/trace-programs',
            body: jsonDataObj,
            json: true
        }, function(error, response, body){
            res.json(body);
            let obj = JSON.parse(JSON.stringify(body));
            let result = obj.result;
            if(result==true){
                let count = obj.data.tracePrograms.count;
                let traceId = obj.data.tracePrograms.items[0].traceProgramId;
                fs.writeFileSync('./backend/data/token.json',JSON.stringify({token: token,traceId: traceId}));
            }
            else{
                console.log("아마도 IP whitelist일것 같지만. 암튼 문제 발생함");
                console.log(obj);
            }

        });
    }
    else{
        console.log('token undefined');
        res.send({'token':token});
    }
});

module.exports = router;