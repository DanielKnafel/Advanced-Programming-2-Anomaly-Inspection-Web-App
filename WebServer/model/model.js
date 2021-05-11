var client;

// sends data to client line by line. converts 'JSON' to 'csv' format
function sendDataToServer(client, data) {
    var keys = Object.keys(data);
    var n = data[keys[0]].length;
    var line = '';
    for (col of keys) {
        line += col + ',';
    }
    line = line.slice(0,-1);
    console.log(line+'\n');
    client.write(line);

    for (var i = 0; i < n; i++) {
        line = '';
        for (col of keys) {
            line += data[col][i] +',';
        }
        line = line.slice(0,-1);
        console.log(line+'\n');
        client.write(line);
    }
    client.write("done");
}

function doModelStuffz(userInput) {
    connectToAnomalyServer();
    client.write(userInput.algorithm);
    sendDataToServer(userInput.train_data);

    //client.destroy();
}

function connectToAnomalyServer() {
    var net = require('net');
    client = new net.Socket();
    client.connect(5555, '127.0.0.1', function() {
        console.log("Connected!");
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        res.send(''+data);
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
}