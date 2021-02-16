const express = require('express');
const app = express();
const api = require('./routes/index');
const auth = require('./routes/authtoken').router;

app.use('/api',api);
app.use(express.json());
app.use('/api/auth',auth);

const port = 3002;
app.listen(port, ()=>console.log(`Listening on port ${port}`));