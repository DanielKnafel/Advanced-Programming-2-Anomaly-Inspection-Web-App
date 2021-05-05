const express = require("express");
const app = express();
const bodyParser = require('body-parser');

var id=0;
var models={};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/test", (req, res) => {
    var net = require('net');
    var client = new net.Socket();
    client.connect(5555, '127.0.0.1', function() {
        console.log("Connected!");
        client.write('Hello, server! Love, Client.\n');
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        client.write('6\n');
        res.send(''+data);

       // client.destroy(); // kill client after server's response
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
});

app.post("/api/model",(req, res) => {
    //console.log("new request");
    //console.log("model_type: "+req.query.model_type);
    //console.log("train_data: ")
    //console.log(req.body.train_data);
    var model = { model_id: id++, upload_time: new Date(), status: "pending" };
    models[model.model_id] = {"model": model, "train_data": req.body.train_data};
    setTimeout(function(){models[model.model_id].model.status="ready";},30*1000)
    res.send(JSON.stringify(model));
})

app.get("/api/model",(req, res) => {
    //console.log("model_id: "+req.query.model_id);
    res.send(JSON.stringify(models[req.query.model_id].model));
})

app.use(express.static('files'))
app.use(express.static('node_modules'))

app.listen(9876, () => console.log("Server is running!"));
