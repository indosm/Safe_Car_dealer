var request = require('request');
var express = require('express');
var router = express.Router();
var fs = require('fs');
const {Client} = require('pg');

router.post('/', function(req, res){
    const jsonFile = fs.readFileSync('./backend/data/token.json','utf8');
    let token= JSON.parse(jsonFile).token;
    let traceprogramID = '8251436548465821173';
    let timestamp = Math.floor(+ new Date() / 1000);
    console.log(timestamp);
    let update_data = JSON.parse(JSON.stringify(req.body));
    if(token!=undefined){
        var jsonDataObj = {
            "objectId": update_data.car_name,
            "timestamp": timestamp,
            "userName": update_data.username,
            "eventName": update_data.action,
            "data": update_data.data
          };

        request.post({
            headers: {'content-type': 'application/json', 'Authorization':'Bearer '+token},
            url: 'https://api.luniverse.io/svc/v2/neptune/trace-programs/'+traceprogramID+'/events',
            body: jsonDataObj,
            json: true
        }, function(error, response, body){
            res.json(body);
            let obj = JSON.parse(JSON.stringify(body));
            if(obj.result==true){
                const client = new Client({
                    user : 'test1',
                    host : 'localhost',
                    database: 'scdb',
                    password: 'pwd1',
                    port: 5432,
                });

                client.connect();
                const sql = "update cars set cnt=cnt+1 where name = $1";
                const values = [update_data.car_name];
                client.query(sql, values, (err, response) => {
                    if(err){
                        console.log(err.stack);
                        res.json({result: false});
                    } else{
                        res.json({result:true});
                    }
                    client.end();
                });
            }
            else{
                res.send({result:false});
            }
            console.log(obj);
        });
    }
    else{
        console.log('token undefined');
        res.send({'token':token});
    }
});

module.exports = router;