var express = require('express');
var app = express();

require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/extra/main.html");
});

var listener = app.listen(process.env.PORT, function(){
    console.log("listening on port " + process.env.PORT + "...");
});