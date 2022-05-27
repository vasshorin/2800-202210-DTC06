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
const bcrypt = require('bcrypt')
app.set('view engine', 'ejs')
const {
    isNumber
} = require('util')


// Community Post Database Schema
const communityPostSchema = new mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
    username: String,

    eventOrganizerName: String,
    eventTitle: String,
    eventLocation: String,
    eventDescription: String,
    time: String
});

// Job Post Database Schema
const jobPostSchema = new mongoose.Schema({
    jobTitle: String,
    jobDescription: String,
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    city: String,
    province: String,
    time: String,
});

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
    time: String,
    image: String
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
    image: String
})

const communityPostModel = mongoose.model("communityposts", communityPostSchema)
const jobPostModel = mongoose.model("jobposts", jobPostSchema)
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


// Ports for the server -- Moved from below. 
app.listen(process.env.PORT || 5002 || 5005, (err) => {
    if (err)
        console.log(err)
})


// ----------------
// -- MIDDLEWARE --
// ----------------


// global middlware guard.
function isAuth(req, res, next) {
    console.log("This authication triggered.")
    if (req.session.authenticated) {
        console.log("User is authenticated.")
        next();
    } else {
        console.log("User is not authenticated.")
        res.redirect('logIn.html')
    }
}


// --------------------------
// -- DROP-DOWN ROUTES ------
// --------------------------
// Nyan Cat. Running around gif
// make specific routes for each click/redirect, so if they click a button in index.html Job Postings Page, they will have to log in. 
app.get('/pages/newHouseListing', isAuth, function (req, res) {
    // Get user to go to pages/newHouseListing.html
    console.log("/House posting route got accessed!")
    res.redirect('newHouseListing.html')
})

app.get('/pages/newJobForm', isAuth, function (req, res) {
    console.log("/Job form posting route got accessed!")
    res.redirect('jobPostings.html')
})

app.get('/pages/newCommunityForm', isAuth, function (req, res) {
    console.log("/Community form posting got accessed!")
    res.redirect('newCommunityForm.html')
})

// ------ Profile Route --------- 

app.get('/pages/profile', isAuth, function (req, res) {
    console.log(" /Profile page has been accessed ")
    res.redirect('profile.html')
})


// -------------------
// ---- ALL POSTS ----
// -------------------

app.get('/getPosts/:userId/:type', function (req, res) {
    if (req.params.type == 'housing') {
        model = housingPostModel
    } else if (req.params.type == 'job') {
        model = jobPostModel
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
// - COMMUNITY POSTS -
// -------------------

// -> Links to newCommunityForm.html
app.put('/newCommunityPostForm/create', function (req, res) {
    console.log(req.body)
    communityPostModel.create({
        userId: req.session.userId,
        username: req.session.userobj.username,
        firstName: req.session.userobj.firstName,
        lastName: req.session.userobj.lastName,
        email: req.session.userobj.email,

        eventTitle: req.body.eventTitle,
        eventOrganizerName: req.body.eventOrganizerName,
        eventLocation: req.body.eventLocation,
        eventDescription: req.body.eventDescription,
        time: req.body.time,
    }, function (err, data) {
        if (err) {
            console.log('Error' + err)
            res.status(500).send()
        } else {
            console.log('Data' + data)
            res.status(200).send('Data inserted!')
        }
    })
})

// Read own Community Post
app.get('/ownCommunityPost/read', function (req, res) {

    communityPostModel.find({
        userId: req.session.userId // Find all posts by userId of the currently logged in user
    }, {}, {
        sort: {
            _id: -1 // Sort Community Posts
        }
    }, function (err, data) {

        if (err) {
            console.log("Error" + err)
            res.status(500).send()
        } else {
            console.log("Data" + data)
            res.status(200).send(data)
        }
    })
})

// Read all comunity posts
app.get('/communityPost/read', function (req, res) {

    communityPostModel.find({}, {}, {
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
app.get('/communityPost/:postId', function (req, res) {
    communityPostModel.findById(req.params.postId, function (err, post) {
        if (err) {
            console.log("Error" + err)
        } else {
            console.log("Data" + post)
        }
        res.render('communityPost', {
            title: post.eventTitle,
            description: post.eventDescription,
            firstName: post.firstName,
            lastName: post.lastName,
            email: post.email,
            organizer: post.eventOrganizerName,
            location: post.eventLocation,
            userId: post.userId,
        })
    })
})

// Delete own Community Post
app.get('/ownCommunityPost/delete/:postId', function (req, res) {
    communityPostModel.findByIdAndDelete(req.params.postId, function (err, data) {
        if (err) {
            console.log("Error" + err)
            res.status(500).send()
        } else {
            console.log("Data" + data)
            res.status(200).send('Data deleted!')
        }
    })
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
        time: req.body.time,
        image: req.body.image
    }, function (err, data) {
        if (err) {
            console.log('Error' + err)
        } else {
            console.log('Data' + data)
        }
        res.send('Data inserted!')
    })
})

// Delete specific house post
app.get('/housingPost/delete/:postId', function (req, res) {
    housingPostModel.findByIdAndDelete(req.params.postId, function (err, data) {
        if (err) {
            console.log('Error' + err)
        } else {
            console.log('Data' + data)
        }
        res.send('Data deleted!')
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
            province: post.province,
            image: post.image
        })
    })
})

// --------------
// -- JOBS POSTS -
// --------------

// Create new job posts
app.put('/newJobPost/create', function (req, res) {
    console.log(req.body)
    jobPostModel.create({
        jobTitle: req.body.jobTitle,
        jobDescription: req.body.jobDescription,
        city: req.body.city,
        province: req.body.province,
        userId: req.session.userId,
        username: req.session.userobj.username,
        firstName: req.session.userobj.firstName,
        lastName: req.session.userobj.lastName,
        email: req.session.userobj.email,
        time: req.body.time
    }, function (err, data) {
        if (err) {
            console.log('Error' + err)
            res.status(500).send()
        } else {
            console.log('Data' + data)
            res.status(200).send('Data inserted!')
        }
    })
})

// Read own job posts
app.get('/ownJobPost/read', function (req, res) {
    
        jobPostModel.find({
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

// Read all job posts
app.get('/jobPosts/read', function (req, res) {

    jobPostModel.find({}, {}, {
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
app.get('/jobPosts/:postId', function (req, res) {
    jobPostModel.findById(req.params.postId, function (err, post) {
        if (err) {
            console.log("Error" + err)
        } else {
            console.log("Data" + post)
        }
        res.render('job', {
            title: post.jobTitle,
            description: post.jobDescription,
            firstName: post.firstName,
            lastName: post.lastName,
            email: post.email,
            userId: post.userId,
            city: post.city,
            province: post.province
        })
    })
})


// delete specific job post
app.get('/jobPost/delete/:postId', function (req, res) {
    jobPostModel.findByIdAndDelete(req.params.postId, function (err, data) {
        if (err) {
            console.log('Error' + err)
        } else {
            console.log('Data' + data)
        }
        res.send('Data deleted!')
    })
})






// --------------
// ---- CHAT ----
// --------------

// direct to chat with the post owner
app.get('/chat/:titleAndotherUserId', function (req, res) {
    paramsArray = req.params.titleAndotherUserId.split("&")
    title = paramsArray[0]
    otherUserId = paramsArray[1]
    userModel.findById(
        otherUserId,
        function (err, receiverUser) {
            if (err) {
                console.log("Error" + err)
            } else {
                console.log("Data" + receiverUser)
            }
            res.render('directChat', {
                'senderId': req.session.userobj.userId,
                'senderName': req.session.userobj.username,
                'senderEmail': req.session.userobj.email,
                'senderImage': req.session.userobj.image,
                'receiverId': receiverUser._id,
                'receiverName': receiverUser.username,
                'receiverEmail': receiverUser.email,
                'receiverImage': receiverUser.image,
                'title': title
            })
        })
})

// direct to chat inbox
app.get('/chat', function (req, res) {
    if (req.session.userobj.image != null) {
        image = req.session.userobj.image
    } else {
        image = 'https://firebasestorage.googleapis.com/v0/b/ucan-8aa2e.appspot.com/o/Images%2FUCAN_logo.png?alt=media&token=59c60c9d-b06a-47b7-86ef-f5cbb3b49bc3'
    }
    res.render('chat', {
        'senderId': req.session.userobj.userId,
        'senderName': req.session.userobj.username,
        'senderEmail': req.session.userobj.email,
        'senderImage': image
    })
})

// --------------
// -- USERS --
// --------------


// // LOGIN USER
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

        if (user.length == 0 || user == null || user == undefined || user == '') { // if no user found
            res.send('No user found')
        }

        console.log(user)
        if (!user) { // if password is incorrect
            res.send('Incorrect password')
        }
        if (user[0].password != req.body.password ) {
            res.send('Invalid email or password')
        } else if (user[0].password == req.body.password) {
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
                time: user[0].time,
                image: user[0].image
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
    }, async function (err, users) {
        if (err) {
            console.log('Err' + err)
        } else {
            console.log('Data' + users)
        }
        for (i = 0; i < users.length; i++) {
            users[i].password = await bcrypt.hash(users[i].password, 12)
        }
        res.send(users)
    })
})

// UPDATE USERS INFO
app.put('/updateUserInfo', function (req, res) {
    if (req.body.userId == '') {
        userId = req.session.userId
    } else {
        userId = req.body.userId
    }
    userModel.updateOne({
        _id: userId
    }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            city: req.body.city,
            province: req.body.province
        }
    }, function (err, user) {
        if (err) {
            console.log('Error' + err)
            res.status(500)
        } else {
            console.log('Data' + user)
            res.status(200).send('User info updated!')
        }
    })
})

// UPLOAD PROFILE PICTURE
app.put('/uploadProfilePic', function (req, res) {
    userModel.updateOne({
        _id: req.body.userId
    }, {
        $set: {
            image: req.body.pictureURL,
        }
    }, function (err, testData) {
        if (err) {
            console.log('Error' + err)
            res.status(500)
        } else {
            console.log('Data' + testData)
            res.status(200).send('Picture uploaded!')
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
        image: null,
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