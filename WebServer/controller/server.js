const express = require("express");
const app = express();
const model = require("../model/model.js");
const fileUpload = require("express-fileupload")
app.use(fileUpload());
//app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: false }));

app.post("/", async (req, res) => {
    if (req.files) {
        // extract data from request
        var algorithm = req.body.algorithm
        var learnFile = req.files.learnFile
        var detectFile = req.files.detectFile
        // wait for model to calculate anomalies
        res.write((await model.doModelStuffz(algorithm, learnFile, detectFile)).toString());
    }
    res.end();
})

app.use(express.static('../view'))
app.use(express.static('node_modules'))

app.listen(8080, () => console.log("Server is running!"));
