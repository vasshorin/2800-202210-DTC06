const express = require('express')
const app = express()
const https = require('https')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
app.set('view engine', 'ejs')
const {
    isNumber
} = require('util')

var session = require('express-session')

app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true
}))


// Housing Post Database Schema
const housingPostSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    userId: String,
    username: String,
    time: String
});

// User Database Schema
const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    age: String,
    province: String,
    city: String,
    password: String,
    admin: Boolean,
    time: String
})

const housingPostModel = mongoose.model("housingPosts", housingPostSchema)
const userModel = mongoose.model("users", userSchema)       


app.use(bodyparser.urlencoded({
    extended: true
}))

mongoose.connect("mongodb+srv://andy:andy1993@ucan.gvfrz.mongodb.net/ucan?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


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

// Housing Routes

// Create new house posts
app.put('/newHousePost/create', function (req, res) {
    console.log(req.body)
    housingPostModel.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        userId: req.session.userId,
        username: req.session.userobj.username,
        time: req.body.time
    }, function (err, data) {
        if (err) {
            console.log('Error' + err)
        } else {
            console.log('Data' + data)
        }
        res.send('Data inserted!')
    })
})

// Read user's own house posts
app.get('/ownHousePost/read', function (req, res) {

    housingPostModel.find({
        userId: req.session.userId
    }, {}, {
        sort: {
            _id: -1
        }
    }, function (err, data) {

        if (err) {
            console.log("Error" + err)
        } else {
            console.log("Data" + data)
        }
        res.send(data)
    })
})

// Read all house posts
app.get('/housePosts/read', function (req, res) {

    housingPostModel.find({}, {}, {
        sort: {
            _id: -1
        }
    }, function (err, data) {
        if (err) {
            console.log("Error" + err)
        } else {
            console.log("Data" + data)
        }
        res.send(data)
    })
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


// Authenticate user
app.post('/login/authentication', function (req, res, next) {
    userModel.find({}, function (err, users) {
        if (err) {
            console.log('Error' + err)
        } else {
            console.log('Data' + users)
        }

        user = users.filter((userobj) => {
            return userobj.email == req.body.email
        })
        console.log(user)
        if (user[0].password == req.body.password) {
            req.session.authenticated = true
            req.session.email = req.body.email
            req.session.userId = user[0]._id
            req.session.userobj = {
                userId: user[0]._id,
                username: user[0].username,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                email: user[0].email,
                age: user[0].age,
                province: user[0].province,
                city: user[0].city,
                admin: user[0].admin,
                time: user[0].time
            }
            // LoggedInUserID = req.session.userId
            res.send(req.session.userobj)
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


// Create new user
app.post('/signup/create', function (req, res) {
    console.log(req.body)
    userModel.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        province: req.body.province,
        city: req.body.city,
        password: req.body.password,
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



app.listen(process.env.PORT || 5002 || 5005, (err) => {
    if (err)
        console.log(err)
})