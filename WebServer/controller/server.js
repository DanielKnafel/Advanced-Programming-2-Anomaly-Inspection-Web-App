const express = require("express");
const app = express();
const model = require("../model/model.js");
const fileUpload = require("express-fileupload")
app.use(fileUpload());
//app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: false }));

app.post("/detect", async (req, res) => {
    if (req.files) {
        // extract data from request
        var algorithm = req.body.algorithm
        var learnFile = req.files.learnFile
        var detectFile = req.files.detectFile
        // wait for model to calculate anomalies
        var promise =  model.doModelStuffz(algorithm, learnFile, detectFile);
        // send anomalies to client
        await promise.then(result => {
            var rows = result.trim().split("\n");
            var arr = []
            rows.forEach(row => {
                var temp = row.split("\t");
                arr.push({
                    row: temp[0],
                    cols: temp[1]
                });
            })
            res.write(JSON.stringify(arr)); 
        });
    }
    res.end();
})

app.use(express.static('../view'))
app.use(express.static('node_modules'))

app.listen(9876, () => console.log("Server is running!"));
