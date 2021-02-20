var request = require('request');
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/:id', function(req, res){
    const jsonFile = fs.readFileSync('./backend/data/token.json','utf8');
    let token= JSON.parse(jsonFile).token;
    let traceId = JSON.parse(jsonFile).traceId;
    if(token!=undefined){
        var jsonDataObj = {a:'a'};

        request.get({
            headers: {'content-type': 'application/json', 'Authorization':'Bearer '+token},
            url: 'https://api.luniverse.io/svc/v2/neptune/trace-programs/'+traceId+'/events?objectId='+req.params.id,
            body: jsonDataObj,
            json: true
        }, function(error, response, body){
            res.json(body);
            let obj = JSON.parse(JSON.stringify(body));
            let count = obj.data.events.count;
            const logtable = new Array(count);
            for (var i=0;i<count;i++){
                let userName = obj.data.events.items[i].userName;
                let eventName = obj.data.events.items[i].eventName;
                let timestamp = obj.data.events.items[i].timestamp;
                let data = obj.data.events.items[i].data;
                console.log(userName, eventName, timestamp, data);
                const tmp_arr = new Array(4);
                tmp_arr[0] = userName;
                tmp_arr[1] = eventName;
                tmp_arr[2] = timestamp;
                tmp_arr[3] = data;
                console.log('table['+i+'] : '+tmp_arr);
                logtable[i]=tmp_arr;
            }
            console.log('logtable : '+logtable);
            console.log(logtable[1][2]);
        });
    }
    else{
        console.log('token undefined');
        res.send({'token':token});
    }
});

module.exports = router;