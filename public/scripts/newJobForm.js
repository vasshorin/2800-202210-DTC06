var now = new Date(Date.now());
var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();


// Populate user's own Job post
function populateJobPosts(userJobPost) {
    console.log(userJobPost)
    jobPostArray = '<hr>'
    for (i = 0; i < userJobPost.length; i++) {
        jobPostArray += `
        Event Title: ${userJobPost[i].eventTitle}<br>
        Event Organizer: ${userJobPost[i].eventOrganizerName}<br>
        Event Location: ${userJobPost[i].eventLocation}<br>
        Event Description: ${userJobPost[i].eventDescription}<br>
        Posted by: ${userJobPost[i].username}<br>
        Posted at: ${userJobPost[i].time}<hr>`
    }
    $('#ownJobPost').append(jobPostArray)
}


// load events to main div
function loadEventsToJobOwnPosts() {
    $('#ownJobPost').empty()
    $.ajax({
        url: 'http://localhost:5002/ownJobPost/read',
        type: 'GET',
        success: populateJobPosts
    })
}


// Get user input from form and send to database to create a new post
function submitJobFormBtn() {
    var eventTitleVar = $("#eventPostTitle").val();
    var eventOrganizerName = $("#eventPostOrganizer").val();
    var eventLocationVar = $("#eventPostLocation").val();
    var eventDescriptionVar = $("#eventPostBody").val();
    var timeOfEventPost = new Date();

    console.log(eventTitleVar, eventOrganizerName, eventLocationVar, eventDescriptionVar, timeOfEventPost)
    $.ajax({
        url: "http://localhost:5002/newJobPostForm/create",
        type: "put",
        data: {
            eventTitle: eventTitleVar,
            eventOrganizerName: eventOrganizerName,
            eventLocation: eventLocationVar,
            eventDescription: eventDescriptionVar,
            time: timeOfEventPost
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
}

$(document).ready(setup);