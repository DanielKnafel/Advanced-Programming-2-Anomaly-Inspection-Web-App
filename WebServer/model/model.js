var client;
var resultsRecieved = false;
var results = "";
// anomaly server commands
var Algorithm = 1;
var UploadCSV = 2;
var Detect = 3;
var Results = 4;
var Exit = 6;

// sends data to client line by line.
function sendDataToServer(data) {
    // split data by new line
    var lines = data.split("\n");
    // send data line by line to the server
    for (var i = 0; i< lines.length; i++) {
        client.write(lines[i]);
        client.write("\n");
    }
    client.write("done\n");
}

async function doModelStuffz(algorithm, learnFile, detectFile) {
    await connectToAnomalyServer();
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
    sendDataToServer(learnFile.data.toString());
    sendDataToServer(detectFile.data.toString());
    // detect anomalies
    client.write(Detect + "\n");
    // get results
    client.write(Results + "\n");
    await new Promise(resolve => setTimeout(resolve, 1000));
    //client.write(Exit + "\n");

}

function getResults() {
    results = results.slice(results.search("Results: \n") + 10, results.lastIndexOf("Done"));
    //console.log("res: " + results.slice(results.search("Results: ") + 9, results.lastIndexOf("Done")));
    return results;
}

async function connectToAnomalyServer() {
    var net = require('net');
    client = new net.Socket();
    var isLog = false;
    client.connect(5555, '127.0.0.1', function() {
        console.log("Connected!");
    });

    client.on('data', function(data) {
        //console.log(data.toString());
        // if (data.toString().includes("Results"))
        //     isLog = true;
        // if (isLog)
            results += data.toString();
        // if (data.toString().includes("Done"))
        //     isLog = false;
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
}

module.exports.doModelStuffz = doModelStuffz;
module.exports.getResults = getResults;