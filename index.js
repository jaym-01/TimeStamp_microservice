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
        let res_date;

        if(req.params.date == null){
            res_date = new Date();
            res.json({"unix": Date.now(), "utc": res_date.toUTCString()});
        }
        else{
            res_date = new Date(req.params.date);
            if(res_date.toUTCString() == "Invalid Date"){
                res_date = new Date(req.params.date * 1);
                res.json({"unix": res_date.valueOf(), "utc": res_date.toUTCString()});

                if(res_date.toUTCString() == "Invalid Date"){
                    res.json({error:"Invalid Date"});
                }
            }
            res.json({"unix": Date.parse(req.params.date), "utc": res_date.toUTCString()});
        }

        
    }
    catch(err){
        res.json({error:"Invalid Date"})
    }
});

var listener = app.listen(process.env.PORT, function(){
    console.log("listening on port " + process.env.PORT + "...");
});