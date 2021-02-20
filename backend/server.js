const express = require('express');
const app = express();
const api = require('./routes/index');
const auth = require('./routes/authtoken');
const list = require('./routes/get_list');
const update = require('./routes/update');
const traceid = require('./routes/get_traceId');
const history = require('./routes/history');

app.use('/api',api);
app.use(express.json());
app.use('/api/auth',auth, traceid);
app.use('/api/get_list',list);
app.use('/api/update',update);
app.use('/api/history',history);

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');
    next();
});

app.post('/auth',function(req, res){
    
});

const port = 3002;
app.listen(port, ()=>console.log(`Listening on port ${port}`));