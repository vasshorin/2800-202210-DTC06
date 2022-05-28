var now = new Date(Date.now());
var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();


// Populate user's own Job post
function populateJobPosts(userJobPost) {
    console.log("Userjobs"+ userJobPost)
    jobPostArray = '<hr>'
    for (i = 0; i < userJobPost.length; i++) {
        jobPostArray += `
        Job Title: ${userJobPost[i].jobTitle}<br>
        Job description: ${userJobPost[i].jobDescription}<br>
        Job City: ${userJobPost[i].city}<br>
        Job Province: ${userJobPost[i].province}<br>
        Posted by: ${userJobPost[i].username}<br>
        Posted at: ${userJobPost[i].time}
        <button id="${userJobPost[i]._id}" class="deleteButtons">Delete</button><hr>`
    }
    $('#ownJobPost').append(jobPostArray)
}


// load events to main div
function loadEventsToJobOwnPosts() {
    $('#ownJobPost').empty()
    $.ajax({
        url: 'https://warm-cove-79874.herokuapp.com/ownJobPost/read',
        type: 'GET',
        success: populateJobPosts
    })
}

// delete post
function deleteEvent() {
    var postId = $(this).attr('id')
    console.log(postId)
    $.ajax({
        url: `https://warm-cove-79874.herokuapp.com/jobPost/delete/${postId}`,
        // url: `http://localhost:5002/jobPost/delete/${postId}`,
        type: 'get',
        success: (x) => {
            console.log(x)
            // redirect to main page
            window.location.href = "/pages/newJobForm.html"
        }
    })
}

// Get user input from form and send to database to create a new post
function submitJobFormBtn() {
    var jobTitle = $("#jobTitle").val();
    var city = $("#city").val();
    var province = $("#province").val();
    var jobDescription = $("#jobDescription").val();
    var jobTimePost = new Date();
    if (jobTitle === "" || city === "" || province === "" || jobDescription === "") {
        alert("Please fill out all fields")
    }
    console.log(jobTitle, jobDescription, city, province, jobTimePost)
    $.ajax({
        url: "https://warm-cove-79874.herokuapp.com/newJobPost/create",
        type: "put",
        data: {
            jobTitle: jobTitle,
            city: city,
            province: province,
            jobDescription: jobDescription,
            time: jobTimePost
        },
        success: (r) => {
            console.log(r)
            loadEventsToJobOwnPosts()
        }
    })
}


function setup() {
    loadEventsToJobOwnPosts()
    $("body").on("click", "#submit", submitJobFormBtn)
    $("body").on("click", ".deleteButtons", deleteEvent)
}

$(document).ready(setup);