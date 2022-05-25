// ------------
// -- CONSTS --
// ------------

const https = require('https')
const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const { CLIENT_RENEG_WINDOW } = require('tls');
const app = express();

const userModel = require('./models/User');
const postModel = require('./models/post');
const { stringify } = require('querystring');
const { totalmem } = require('os');
const { isNumber } = require('util')

const mongoURI = "mongodb+srv://andy:andy1993@ucan.gvfrz.mongodb.net/ucan?retryWrites=true&w=majority"

const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'sessions'
});

// Bodyparser
app.use(
    bodyparser.urlencoded({
      parameterLimit: 100000,
      limit: "50mb",
      extended: true,
    })
  );


// Setting view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));

app.use(session({
    secret: 'ssshhhhh',
    resave: false,
    saveUninitialized: false,
    store: store
}))


// ----------------
// -- MIDDLEWARE --
// ----------------


function isAuth(req, res, next) {
    if (req.sessionID) {
      console.log(req.sessionID);
      next();
    } else {
      console.log("Not authenticated");
      res.redirect("/pages/login.html");
    }
}


app.use(bodyparser.urlencoded({
    extended: true
}))

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/*
 User Login Logout
*/
app.get("/", function (req, res) {
    res.redirect("login");
  });

  

app.get("/login"), function (req, res) {
    console.log("seinding");
    // res.sendFile("/public/pages/logIn.html", { root: __dirname });
    res.sendFile(path.join(__dirname + '/logIn.html'));
}
  


app.use(express.static('./public'))

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
app.post('/newHousePost/create', async function (req, res) {
    const { title, body, type, url } = req.body;
    const user = await userModel.findOne({ _id: req.session.userId });
    console.log(user.posts)
    const random = Math.floor(Math.random() * 100000)
    const ID = `/${type}/${random}`
    console.log(ID)

    if(!user.posts) {
        user.posts = [];
    }

    const post = {
        title: req.body.title,
        body: req.body.body,
        type: req.body.type,
        url: ID
    }

    user.posts.push(post);
    await user.save();
    console.log(user.posts);
    res.redirect('/index.html');    


    

    // console.log(req.body)
    // housingPostModel.create({
    //     title: req.body.title,
    //     description: req.body.description,
    //     price: req.body.price,
    //     userId: req.session.userobj._id,
    //     time: req.body.time
    // }, function (err, data) {
    //     if (err) {
    //         console.log('Error' + err)
    //         res.status(500).send()
    //     } else {
    //         console.log('Data' + data)
    //         res.status(200).send()
    //     }
    //     res.send('Data inserted!')
    // })
})





// Read
// var LoggedInUserID = db.housingPostModel.find({userId})

app.get('/:type/:id', function (req, res) {
    // console.log(LoggedInUserID)
    // LoggedInUserID   
    housingPostModel.find({}, function (err, testData) {
        if (err) {
            console.log("Error" + err)
            res.status(500).send()
        } else {
            console.log("Data" + testData)
            res.status(200).send(testData + " user INSIDE SEND" + user)
        }
    })
})


app.get('/ownposts',isAuth, async  function (req, res) {
    const user = await userModel.findById(req.session.userId);
    const userPosts = user.posts;
    const userLenggth = userPosts.length;
    console.log(userPosts.length);
    for (let i = 0; i <= userPosts.length; i++) {

        res.render('ownposts', {
            userPosts: userPosts,
            userLenggth: userLenggth,
            title: userPosts[i].title,
            body: userPosts[i].body,
            type: userPosts[i].type,
            url: userPosts[i].url
        })
        console.log(userPosts[i]);
    }
})


app.post("/login/authentication", async (req, res) => {
    const { email, password } = req.body;
     // TODO: check if user is an admin, if so, redirect to admin page instead of user page
    if (password === '' || email === '') {
        res.render("login", {
            error: "Please fill in all fields"
        });
        return;
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
        res.redirect(__dirname + "/public/pages/logIn.html");
    } 
    
    const isMatch = await bcrypt.compare(password, user.password);
    

    if(!isMatch) {
        res.redirect("/public/pages/logIn.html");
    } else {
        req.session.isAuth = true;
        req.session.userId = user._id;
        req.session.firstName = user.firstName;
        req.session.lastName = user.lastName;
        req.session.email = user.email;
        req.session.password = user.password;
        req.session.posts = user.posts;
        console.log(req.session);
        res.redirect("/index.html");
    }
});

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

app.post('/signup/create', async function (req, res) {
    let time = new Date();
    console.log(req.body)

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    userModel.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        province: req.body.province,
        city: req.body.city,
        password: hashedPassword,
        time: time,
        admin: false,
        post: []
    }, function (err, data) {
        if (err) {
            console.log('Error' + err)
            res.status(200).send()
        } else {
            console.log('Data' + data)
            res.status(500).send("New user created!")
            res.redirect('/pages/logIn.html')
        }
    })
})


app.listen(process.env.PORT || 5006, (err) => {
    if (err){
        console.log(err)
    } else {
        console.log("Server is running on port 5006")
    }
})