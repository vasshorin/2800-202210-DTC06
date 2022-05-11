const express = require('express')
const app = express()
const https = require('https')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const unicornSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    dob: Date,
    loves: [String],
    gender: String
});
const unicornModel = mongoose.model("unicorns", unicornSchema);

app.set('view engine', 'ejs')

app.use(bodyparser.urlencoded({
    extended: true
}))

mongoose.connect("mongodb+srv://andy:andy1993@ucan.gvfrz.mongodb.net/unicorns?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.listen(process.env.PORT || 5000, (err) => {
    if (err)
        console.log(err)
})

app.use(express.static('./public'))

app.get('/', function (req, res) {
    unicornModel.find({
        weight: {
            $gt: 500
        }
    }, function (err, unicorns) {
        if (err) {
            console.log("Error" + err)
        } else {
            console.log("Data" + unicorns)
        }
        res.send(unicorns)
    })
})