// CONVERT TO EJS HERE


const express = require('express')
const app = express()
const https = require('https')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const {
    isNumber
} = require('util')
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

const housingPostSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    userId: String,
    time: String
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

const housingPostModel = mongoose.model("housingPosts", housingPostSchema)
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

app.listen(process.env.PORT || 5002 || 5005, (err) => {
    if (err)
        console.log(err)
})

// app.listen(5003, function (err) {
//     if (err)
//         console.log(err);
// })


app.use(express.static('./public'))

// function auth(req , res, next) {
//     if (req.session.authenticated) {
//         console.log("authenticated");
//         next()
//     } else {
//         res.redirect("/sign_up.html")
//     }
// }

// app.get('/', function (req, res) {
//     res.send('.public/pages/index.html')

// })

// user ID object
app.get('/userId', function (req, res) {
    console.log(req.session.userobj)
    res.send(req.session.userobj)
})

// CRUD

// Create
app.put('/newHousePost/create', function (req, res) {
    console.log(req.body)
    housingPostModel.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        userId: req.session.userobj._id,
        time: req.body.time
    }, function (err, data) {
        if (err) {
            console.log('Error' + err)
            res.status(500).send()
        } else {
            console.log('Data' + data)
            res.status(200).send()
        }
        res.send('Data inserted!')
    })
})

// Read
// var LoggedInUserID = db.housingPostModel.find({userId})

app.get('/test/read', function (req, res) {
    // console.log(LoggedInUserID)
    // LoggedInUserID   
    housingPostModel.find({}, function (err, testData) {
        // if (userId == req.session.userobj._id) {
        //     res.send(testData)
        // } else {
        //     res.send("You are not logged in!")
        //     console.log("Error" + err)
        // }
        var user = req.session.userId
        // console.log(`user INSIDE TEST/READ: ${user}`)
        if (err) {
            console.log("Error" + err)
            res.status(500).send()
        } else {
            console.log("Data" + testData)
            res.status(200).send(testData + " user INSIDE SEND" + user)
        }
    })
})


app.get('/test/read/users', function (req, res, next) {
    userModel.find({}, function (err, users) {
        if (err) {
            console.log('Error' + err)
            res.status(500).send()
        } else {
            console.log('Data' + users)
            res.status(200).send(users + " user INSIDE SEND" + user)
        }
        var user = req.session.userId

        // user=users.filter((userobj)=>{
        //     return userobj.email == req.body.email
        // })
        // if (user[0].password==req.body.password){
        //     req.session.authenticated = true
        //     req.session.email = req.body.email
        //     req.session.userId = user[0]._id
        //     req.session.userobj = user[0]
        //     // LoggedInUserID = req.session.userId
        //     res.send(+ req.session.userobj + "user id: " + req.session.userId)
        // }

    })
})


// whe nwe visit this route, we're checking
app.post('/login/authentication', function (req, res, next) {
    userModel.find({}, function (err, users) {
        if (err) {
            console.log('Error' + err)
            res.status(500).send()
        } else {
            console.log('Data' + users)
        }

        user = users.filter((userobj) => {
            return userobj.email == req.body.email
        })
        if (user[0].password == req.body.password) {
            req.session.authenticated = true
            req.session.email = req.body.email
            req.session.userId = user[0]._id
            req.session.userobj = user[0]
            // LoggedInUserID = req.session.userId
            res.status(200).send("Successful Login!" + req.session.userobj + "user id: " + req.session.userId)
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
            res.status(500)
        } else {
            console.log('Data' + testData)
            res.status(200).send('Data updated!')
        }
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
        if (err) {
            console.log('Error' + err)
            res.status(200).send()
        } else {
            console.log('Data' + data)
            res.status(500).send("Delete successful!")
        }
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
            res.status(200).send()
        } else {
            console.log('Data' + data)
            res.status(500).send("New user created!")
        }
    })
})