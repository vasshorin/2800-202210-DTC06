const express = require('express')
const app = express()
const https = require('https')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const testSchema = new mongoose.Schema({
    user: String,
    text: String
});
const testModel = mongoose.model("tests", testSchema);

app.set('view engine', 'ejs')

app.use(bodyparser.urlencoded({
    extended: true
}))

mongoose.connect("mongodb+srv://andy:andy1993@ucan.gvfrz.mongodb.net/ucan?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(process.env.PORT || 5000, (err) => {
    if (err)
        console.log(err)
})

app.use(express.static('./public'))

// CRUD

// Create
app.put('/test/create', function (req, res) {
    console.log(req.body)
    testModel.create({
        user: req.body.user,
        text: req.body.text
    }, function (err, testData) {
        if (err) {
            console.log('Error' + err)
        } else {
            console.log('Data' + testData)
        }
        res.send('Data inserted!')
    })
})

// Read
app.get('/test/read', function (req, res) {
    testModel.find({}, function (err, testData) {
        if (err) {
            console.log("Error" + err)
        } else {
            console.log("Data" + testData)
        }
        res.send(testData)
    })
})

// Update
app.put('/test/update', function (req, res) {
    console.log(req.body)
    testModel.updateOne({
        _id: req.body.id
    }, {
        $set: {
            text: req.body.text
        }
    }, function (err, testData) {
        if (err) {
            console.log('Error' + err)
        } else {
            console.log('Data' + testData)
        }
        res.send('Data updated!')
    })
})

// Delete
app.get('/test/delete', function (req, res) {
    testModel.remove({
        _id: req.body.id,
    }, function (err, testData) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + testData);
        }
        res.send("Data deleted!");
    });
});