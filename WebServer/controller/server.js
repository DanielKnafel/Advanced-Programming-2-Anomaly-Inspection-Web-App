const express = require("express");
const app = express();

var id=0;
var models={};
var client;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/test", (req, res) => {
    var net = require('net');
    client = new net.Socket();
    client.connect(5555, '127.0.0.1', function() {
        console.log("Connected!");
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        //client.write('6\n');
        res.send(''+data);

       // client.destroy(); // kill client after server's response
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
});

function sendModelToAnomalyServer(train_data) { // {A: [1,2,3], B: [4,5,6]} 
    var keys = Object.keys(train_data);
    var n = train_data[keys[0]].length;
    var line = '';
    for (col of keys) {
        line += col+ ',';
    }
    line = line.slice(0,-1);
    console.log(line+'\n');
    // client.write(line);

    for (var i = 0; i < n; i++) {
        line = '';
        for (col of keys) {
            line += train_data[col][i] +',';
        }
        line = line.slice(0,-1);
        console.log(line+'\n');
        // client.write(line);
    }
    // client.write("done");
}

app.post("/api/model",(req, res) => {
    //console.log("new request");
    //console.log("model_type: "+req.query.model_type);
    //console.log("train_data: ")
    //console.log(req.body.train_data);
    var model = { model_id: id++, upload_time: new Date(), status: "pending" };
    models[model.model_id] = {"model": model, "train_data": req.body.train_data};
    sendModelToAnomalyServer(req.body.train_data);
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
