const express = require("express");
const app = express();
const model = require("../model/model.js");

app.use(express.json({limit: '5mb'}));
// app.use(express.urlencoded({ extended: true }));

app.post("/detect",(req, res) => {
    var userInput = {"algorithm": req.body.algorithm , "train_data": req.body.train_data, "detect_data": req.body.detect_data};
    model.doModelStuffz(userInput);
    res.send(JSON.stringify(model));
})

app.use(express.static('../view'))
app.use(express.static('node_modules'))

app.listen(9876, () => console.log("Server is running!"));
