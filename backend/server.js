const express = require('express');
const cors = require('cors');
const app = express();
const api = require('./routes/index');
const auth = require('./routes/authtoken');
const list = require('./routes/get_list');
const update = require('./routes/update');
const traceid = require('./routes/get_traceId');
const history = require('./routes/history');

app.use(cors());

app.use('/api',api);
app.use(express.json());
app.use('/api/auth',auth, traceid);
app.use('/api/get_list',list);
app.use('/api/update',update);
app.use('/api/history',history);

const port = 3001;
app.listen(port, ()=>console.log(`Listening on port ${port}`));