const express = require("express");
const app = express();
const model = require("../model/model.js");
const fileUpload = require("express-fileupload")
app.use(fileUpload());
//app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: false }));

function buildHtml(res, result) {
    res.write("<html><body>");
    res.write("<table BORDER=2>");
    // create table headers
    res.write("<TR><TD>Row</TD>");
    res.write("<TD>Features</TD></TR>");
    // for each element in the json, create a TR with its data
    JSON.parse(result).forEach(json => {
            // add data
            res.write("<TR><TD>");
            res.write(json['row']);
            res.write("</TD><TD>");
            res.write(json['features']);
            res.write("</TD></TR>");
    })
    // close tags
    res.write("</table></body></html>");
}

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

app.post("/detect", async (req, res) => {
    if (req.files) {
        // extract data from request
        var algorithm = req.body.algorithm
        var learnFile = req.files.learnFile
        var detectFile = req.files.detectFile
        // wait for model to calculate anomalies and construct an html page
        await model.doModelStuffz(algorithm, learnFile, detectFile).then(result => buildHtml(res, result));
    }
    res.end();
})

app.use(express.static('../view'))
app.use(express.static('node_modules'))

app.listen(8080, () => console.log("Server is running!"));
