const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(require('./router'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000, () => {
    console.log(`App running on port 3000...`);
});