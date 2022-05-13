const express = require('express')
const app = express()
const https = require('https')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
// const testSchema = new mongoose.Schema({
//     user: String,
//     text: String
// });
// const testModel = mongoose.model("tests", testSchema);
const housingPostTest = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    // time: String
});

const housingPostModel = mongoose.model("housingPosts", housingPostTest)

app.set('view engine', 'ejs')

app.use(bodyparser.urlencoded({
    extended: true
}))

mongoose.connect("mongodb+srv://andy:andy1993@ucan.gvfrz.mongodb.net/ucan?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// mongoose.connect("mongodb://localhost:27017/timelineDB",
//     { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(process.env.PORT || 5003, (err) => {
    if (err)
        console.log(err)
})

// app.listen(5003, function (err) {
//     if (err)
//         console.log(err);
// })


app.use(express.static('./public'))

// CRUD

// Create
app.put('/test/create', function (req, res) {
    console.log(req.body)
    housingPostModel.create({
        'title': req.body.title,
        'description': req.body.description,
        'price': req.body.price
        // time: req.body.time
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
    housingPostModel.find({}, function (err, testData) {
        if (err) {
            console.log("Error" + err)
        } else {
            console.log("Data" + testData)
        }
        res.send(testData)
    })
})

// Update
app.put('/test/update/:id', function (req, res) {
    console.log(req.body)
    housingPostModel.updateOne({
        '_id': req.body.id
    }, {
        $set: {
            description: req.body.description
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
// app.put('/test/delete/:id', function (req, res) {
//     housingPostModel.deleteOne({
//        _id: req.body.id
//     }, function (err, testData) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + testData);
//         }
//         res.send("Data deleted!");
//     });
// });

app.put('/test/delete/:id', function (req, res) {
    housingPostModel.deleteOne({
        id: req.params.id
    }, function (err, data) {
        if (err) console.log(err);
        else
            console.log(data);
        res.send("All good! Deleted.")
    });
})