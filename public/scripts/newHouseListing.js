// Get time and date
var now = new Date(Date.now());
picURL= '';
// Format time to hours, minutes, and seconds
var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();


// Populate user's own house postings
function populatePosts(userPosts) {
    console.log("Userposts" + userPosts)
    postArray = '<hr>'
    for (i = 0; i < userPosts.length; i++) { // for each post in the array, get the following infromation
        postArray += `
        Title: ${userPosts[i].title}<br>
        Price: $${userPosts[i].price}<br>
        Description: ${userPosts[i].description}<br>
        City: ${userPosts[i].city}<br>
        Province: ${userPosts[i].province}<br>
        Posted by: ${userPosts[i].username}<br>
        Posted at: ${userPosts[i].time}
        <button id="${userPosts[i]._id}" class="deleteButtons">Delete</button><hr>`
    }
    $('#ownPosts').html(postArray)
}

// upload profile picture to storage
// part of the codes are reused from 2022 Jan COMP 1800 DTC-14 project
function uploadImage() {
    // get the picture from user input
    var uploadButton = document.getElementById("uploadButton");
    uploadButton.addEventListener("change", uploadFile => {
        var file = uploadFile.target.files[0];
        // upload the picture to storage
        var uploadStorage = firebase.storage().ref("Images/" + now + ".jpeg").put(file)
        uploadStorage.then(() => {
            // Get the URL
            uploadStorage.snapshot.ref.getDownloadURL().then((pictureURL) => {
                console.log('Image URL: ', pictureURL);
                picURL=pictureURL
            })
            return picURL
        })
    })
}

// load events to main div
function loadEventsToMainDiv() {
    $('#ownPosts').empty()
    $.ajax({
        // url:'https://warm-cove-79874.herokuapp.com/ownHousePost/read',
        url: 'http://localhost:5002/ownHousePost/read',
        type: 'GET',
        success: populatePosts
    })
}


// delete post
function deleteEvent() {
    var postId = $(this).attr('id')
    console.log(postId)
    $.ajax({
        // url: `https://warm-cove-79874.herokuapp.com/housePosts/${postId}`,
        url: `http://localhost:5002/housingPost/delete/${postId}`,
        type: 'get',
        success: (x) => {
            console.log(x)
            // redirect to main page
            window.location.href = "/pages/newHouseListing.html"
        }
    })
}

// Get user input from form and send to database to create a new post
function submitForm() {
    var title = $("#postTitle").val();
    var description = $("#postBody").val();
    var price = $("#postPrice").val();
    var city = $("#postCity").val();
    var province = $("#postProvince").val();
    var time = new Date();

    console.log(title, description, price, time)
    if (title === "" || description === "" || price === "" || city === "" || province === "") { // if any of the fields are empty, alert user
        alert("Please fill out all fields")
    } else if (isNaN(price)) { // if price is not a number
        alert("Please enter a vawlid price")
    } else {
        console.log(title, description, price, time)
        $.ajax({
            // url: "https://warm-cove-79874.herokuapp.com/newHousePost/create",
            url: "http://localhost:5002/newHousePost/create",
            type: "put",
            data: {
                title: title,
                description: description,
                price: price,
                city: city,
                province: province,
                time: time,
                image: picURL
            },
            success: (r) => {
                console.log(r)
                // $("main").empty()
                loadEventsToMainDiv()
            }
        })
    }
}

// Setup function
function setup() {
    loadEventsToMainDiv()
    uploadImage()
    $("body").on("click", "#submit", submitForm)
    $("body").on("click", ".deleteButtons", deleteEvent)
}

$(document).ready(setup);