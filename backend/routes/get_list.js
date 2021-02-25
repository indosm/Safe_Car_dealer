var request = require('request');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const {Client} = require('pg');

router.get('/', function(req, res){
    const client = new Client({
        user : 'test1',
        host : 'localhost',
        database: 'scdb',
        password: 'pwd1',
        port: 5432,
    });

    client.connect();

    client.query("select * from cars", (err, response) => {
        if(err){
            console.log(err.stack);
            res.json({result: false});
        } else{
            let count = response.rowCount;
            console.log(count,response.rows);
            res.json({cnt:count, items:response.rows});
        }
        client.end();
    });
});
router.get('/:id',function(req,res){
    const client = new Client({
        user : 'test1',
        host : 'localhost',
        database: 'scdb',
        password: 'pwd1',
        port: 5432,
    });

    client.connect();
    const sql = "select name from cars where id = $1";
    const values = [req.params.id];
    client.query(sql, values, (err, response) => {
        if(err){
            console.log(err.stack);
            res.json({result: false});
        } else{
            let count = response.rowCount;
            console.log(count,response.rows);
            res.json({cnt:count, items:response.rows});
        }
        client.end();
    });
});

module.exports = router;