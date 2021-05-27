// const { resolve } = require('path');
var net = require('net');

// anomaly server commands
var Algorithm = 1;
var UploadCSV = 2;
var Detect = 3;
var Results = 4;
var Exit = 6;

// sends data to client line by line.
function sendDataToServer(client, data) {
    // split data by new line
    var lines = data.split("\n");
    // send data line by line to the server
    for (var i = 0; i< lines.length; i++) {
        client.write(lines[i]);
        client.write("\n");
    }
    client.write("done\n");
}

function doSending(client, algorithm, learnFile, detectFile) {
    client.write(Algorithm +" \n");
    // send user selction to server. 1 = Simple, 2 = Hybrid
    if (algorithm == "Simple") {
        client.write("1\n");
    }
    else if (algorithm == "Hybrid") {
        client.write("2\n");
    }

    // start the file uploads
    client.write(UploadCSV + "\n");
    sendDataToServer(client, learnFile.data.toString());
    sendDataToServer(client, detectFile.data.toString());
    // detect anomalies
    client.write(Detect + "\n");
    // get results
    client.write(Results + "\n");
    client.write(Exit + "\n");
}

async function doModelStuffz(algorithm, learnFile, detectFile) {
    var results = "";
    var client;
    await new Promise(function(resolve){
        client = new net.Socket();
        client.on('data', function(data) {
            results += data.toString();
        });
    
        client.on('close', function() {
            console.log('Connection closed');
            resolve();
        });

        client.on("ready", function(){
            doSending(client, algorithm, learnFile, detectFile);
        })

        client.connect(5555, '127.0.0.1', function() {
            console.log("Connected!");
        });
    });
    results = results.slice(results.search("Results: \n") + 10, results.lastIndexOf("Done"));
    return results;
}

module.exports.doModelStuffz = doModelStuffz;