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

app.get('/api/:date?', (req, res) => {
    try{
        let unix_out;
        let utc_out;

        if(req.params.date == null){
            unix_out = Date.now();
            utc_out = (new Date()).toUTCString();
        }
        else{

            let para = req.params.date;

            //checks if it is a unix timestamp or now
            if((new Date(para)).toUTCString() == "Invalid Date"){
                //if it is - it must be multiplied by 1
                para = req.params.date * 1;

                //if still invalid - then invalid input
                if((new Date(para)).toUTCString() == "Invalid Date"){
                    throw new Error();
                }
            }
            unix_out = (new Date(para)).valueOf();
            utc_out = (new Date(para)).toUTCString();
        }

        res.json({"unix": unix_out, "utc": utc_out});
    }
    catch(err){
        res.json({error:"Invalid Date"})
    }
});

var listener = app.listen(process.env.PORT, function(){
    console.log("listening on port " + process.env.PORT + "...");
});