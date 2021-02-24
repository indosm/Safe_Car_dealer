var request = require('request');
var express = require('express');
var router = express.Router();
var fs = require('fs');
const {Client} = require('pg');

router.get('/', function(req, res){
    let email = req.query.email;
    let pwd = req.query.pwd;
    const client = new Client({
        user : 'test1',
        host : 'localhost',
        database: 'scdb',
        password: 'pwd1',
        port: 5432,
    });

    client.connect();
    const sql = "select * from users where email = $1 and pwd = $2";
    const values = [email, pwd];
    client.query(sql,values, (err, response) => {
        if(err){
            console.log(err.stack);
            res.json({result: false});
        } else{
            let count = response.rowCount;
            console.log(count);
            if(count>0){
                res.json({result:true});
            }
            else{
                res.json({result:false});
            }
        }
        client.end();
    });
});

module.exports = router;