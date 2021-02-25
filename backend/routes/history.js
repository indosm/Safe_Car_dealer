var request = require('request');
var express = require('express');
var router = express.Router();
var fs = require('fs');
const {Client} = require('pg');

router.get('/:id', function(req, res){
    const jsonFile = fs.readFileSync('./backend/data/token.json','utf8');
    let token= JSON.parse(jsonFile).token;
    let traceId = JSON.parse(jsonFile).traceId;
    console.log("history api로 ",req.params.id,"검색 들어옴");
    const client = new Client({
        user : 'test1',
        host : 'localhost',
        database: 'scdb',
        password: 'pwd1',
        port: 5432,
    });
    let searchID=req.params.id;
    client.connect();
    const sql = "select * from cars where id = $1";
    const values = [req.params.id];
    client.query(sql,values, (err, response) => {
        if(err){
            console.log(err.stack);
            res.json({result: false});
        } else {
            searchID = response.rows[0].name;
            if(token!=undefined){
                var jsonDataObj = {a:'a'};
                console.log('외부 검색에 사용되는 : ',searchID);
                request.get({
                    headers: {'content-type': 'application/json', 'Authorization':'Bearer '+token},
                    url: 'https://api.luniverse.io/svc/v2/neptune/trace-programs/'+traceId+'/events?objectId='+searchID,
                    body: jsonDataObj,
                    json: true
                }, function(error, response, body){
                    let obj = JSON.parse(JSON.stringify(body));
                    let count = obj.data.events.count;
                    const logtable = new Array(count);
                    for (var i=0;i<count;i++){
                        let userName = obj.data.events.items[i].userName;
                        let eventName = obj.data.events.items[i].eventName;
                        let timestamp = obj.data.events.items[i].timestamp;
                        let data = obj.data.events.items[i].data;
                        //console.log(userName, eventName, timestamp, data);
                        const tmp_arr = new Array(4);
                        tmp_arr[0] = userName;
                        tmp_arr[1] = eventName;
                        tmp_arr[2] = timestamp;
                        tmp_arr[3] = data;
                        //console.log('table['+i+'] : '+tmp_arr);
                        logtable[i]=tmp_arr;
                    }
                    res.json({cnt : count,items: obj.data.events.items});
                });
            }
            else{
                console.log('token undefined');
                res.send({'token':token});
            }
        }
        client.end();
    });

});

module.exports = router;