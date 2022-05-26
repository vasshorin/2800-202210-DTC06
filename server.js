// ---------------
// -- CONSTANTS --
// ---------------

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
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    city: String,
    province: String,
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

app.get('/', function (req, res) {
    res.send('/index.html')
})

// -------------------
// -- HOUSING POSTS --
// -------------------

// Create new house posts
app.put('/newHousePost/create', function (req, res) {
    console.log(req.body)
    housingPostModel.create({
        title: req.body.title,
        description: req.body.description,
        city: req.body.city,
        province: req.body.province,
        price: req.body.price,
        userId: req.session.userId,
        username: req.session.userobj.username,
        firstName: req.session.userobj.firstName,
        lastName: req.session.userobj.lastName,
        email: req.session.userobj.email,
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
        userId: req.session.userId // Find all posts by userId of the currently logged in user
    }, {}, {
        sort: {
            _id: -1 // Sort posts by descending order (latest first)
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
            _id: -1 // Sort posts by descending order (latest first)
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

// direct to specific post
app.get('/housePosts/:postId', function (req, res) {
    housingPostModel.findById(req.params.postId, function (err, post) {
        if (err) {
            console.log("Error" + err)
        } else {
            console.log("Data" + post)
        }
        res.render('housing', {
            title: post.title,
            price: post.price,
            description: post.description,
            firstName: post.firstName,
            email: post.email,
            userId: post.userId,
            city: post.city,
            province: post.province
        })
    })
})

// --------------
// -- USERS --
// --------------


// LOGIN USER
app.post('/login/authentication', function (req, res, next) {
    userModel.find({}, function (err, users) { // find all users
        if (err) {
            console.log('Error' + err)
        } else {
            console.log('Data' + users)
        }

        user = users.filter((userobj) => {
            return userobj.email == req.body.email // find user with email matching the one entered
        })
        console.log(user)
        if (user[0].password == req.body.password) {
            req.session.authenticated = true
            req.session.email = req.body.email
            req.session.userId = user[0]._id
            req.session.userobj = { // create user object to store in session with the following data
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



// ---------------
// -- SIGNUP --
// ---------------

// Create new user
app.post('/signup/create', function (req, res) {
    console.log(req.body)
    userModel.create({ // Creat new signup user
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

// -----------
// -- LOGOUT--
// -----------
app.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});


// ---------------
// -- ADMIN --
// ---------------

// Ports for the server
app.listen(process.env.PORT || 5002 || 5005, (err) => {
    if (err)
        console.log(err)
})





// --------------------------------------------------------------------
// -- UNUSED FOR NOW --
// --------------------------------------------------------------------
// Update
// app.put('/test/update/:id', function (req, res) {
//     console.log(req.body)
//     housingPostModel.updateOne({
//         '_id': req.body.id
//     }, {
//         $set: {
//             description: req.body.description
//         }
//     }, function (err, testData) {
//         if (err) {
//             console.log('Error' + err)
//             res.status(500)
//         } else {
//             console.log('Data' + testData)
//             res.status(200).send('Data updated!')
//         }
//     })
// })

// app.put('/test/delete/:id', function (req, res) {
//     housingPostModel.deleteOne({
//         id: req.params.id
//     }, function (err, data) {
//         if (err) {
//             console.log('Error' + err)
//             res.status(200).send()
//         } else {
//             console.log('Data' + data)
//             res.status(500).send("Delete successful!")
//         }
//     });
// })
