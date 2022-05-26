// ---------------
// -- CONSTANTS --
// ---------------

const express = require('express')
const app = express()
const https = require('https')
const bodyparser = require('body-parser')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose')
app.set('view engine', 'ejs')
const {
    isNumber
} = require('util')





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
    time: String,
    admin: Boolean
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



app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: false,
    resave: false,
    store: new MongoDBSession({
        uri: "mongodb+srv://andy:andy1993@ucan.gvfrz.mongodb.net/ucan?retryWrites=true&w=majority",
        collection: 'sessions'
    })
}))

app.use(express.static('./public'))


// ----------------
// -- MIDDLEWARE --
// ----------------
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/pages/login.html');
    }
};

app.get('/', function (req, res) {
    res.send('/index.html')
})


// -------------------
// ---- ALL POSTS ----
// -------------------

app.get('/getPosts/:userId/:type', function (req, res) {
    if (req.params.type == 'housing') {
        model = housingPostModel
    } else if (req.params.type == 'job') {
        model = jobPostModel
    } else if (req.params.type == 'donation') {
        model = donationPostModel
    } else if (req.params.type == 'community') {
        model = communityPostModel
    }
    console.log(req.params.userId)
    model.find({
        userId: req.params.userId
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

// -------------------
// -- HOUSING POSTS --
// -------------------

// Create new house posts
app.put('/newHousePost/create', isAuth, function (req, res) {
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

// SEND USER INFO TO CLIENT
app.get('/user', function (req, res) {
    res.send(req.session.userobj)
})

// SEND USERS TO ADMIN DASHBOARD
app.get('/getAllUsers', function (req, res) {
    userModel.find({
        admin: false
    }, function (err, users) {
        if (err) {
            console.log('Err' + err)
        } else {
            console.log('Data' + users)
        }
        res.send(users)
    })
})

// UPDATE USERS INFO
app.put('/updateUserInfo', function (req, res) {
    userModel.updateOne({
        _id: req.body.userId
    }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            city: req.body.city,
            province: req.body.province
        }
    }, function (err, testData) {
        if (err) {
            console.log('Error' + err)
            res.status(500)
        } else {
            console.log('Data' + testData)
            res.status(200).send('User info updated!')
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
        time: req.body.time,
        admin: false
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
        res.redirect("/index.html");
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