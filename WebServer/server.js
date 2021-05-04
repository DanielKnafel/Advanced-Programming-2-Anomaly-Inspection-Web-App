const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(200).json({"Connected to" : req.ip});

    var net = require('net');
    var client = new net.Socket();
    client.connect(5555, '127.0.0.1', function() {
        console.log("Connected!");
        client.write('Hello, server! Love, Client.');
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        client.destroy(); // kill client after server's response
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
});

app.listen(1337, () => console.log("Serever is running!"));
