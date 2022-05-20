const express = require('express')
const app = express()
const https = require('https')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const { isNumber } = require('util')
// const testSchema = new mongoose.Schema({
//     user: String,
//     text: String
// });
// const testModel = mongoose.model("tests", testSchema);

var session = require('express-session')

app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true
}))

const housingPostTest = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    // time: String
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: String,
    location: String,
    time: String
})

const housingPostModel = mongoose.model("housingPosts", housingPostTest)
const userModel = mongoose.model("users", userSchema)

// app.set('view engine', 'ejs')

app.use(bodyparser.urlencoded({
    extended: true
}))

mongoose.connect("mongodb+srv://andy:andy1993@ucan.gvfrz.mongodb.net/ucan?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// mongoose.connect("mongodb://localhost:27017/timelineDB",
//     { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(process.env.PORT || 5002, (err) => {
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

app.post('/login/authentication', function (req, res, next) {
    userModel.find({}, function (err, users) {
        if (err) {
            console.log('Error' + err)
        } else {
            console.log('Data' + users)
        }
        if (users.filter(user => user.email == req.body.email)[0].password == req.body.password) {
            req.session.authenticated = true
            req.session.email = req.body.email
            res.send("Successful Login!")
        } else {
            req.session.authenticated = false
            res.send("Failed Login!")
        }
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

app.put('/signup/create', function (req, res) {
    console.log(req.body)
    userModel.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        location: req.body.location,
        time: req.body.time
    }, function (err, data) {
        if (err) {
            console.log('Error' + err)
        } else {
            console.log('Data' + data)
        }
        res.send("New user created!")
    })
})
