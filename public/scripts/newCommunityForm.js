var now = new Date(Date.now());
var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

// Populate user's own community post
function populateCommunityPosts(userCommunityPost) {
    console.log(userCommunityPost)
    communityPostArray = '<hr>'
    for (i = 0; i < userCommunityPost.length; i++) {
        communityPostArray += `
        Event Title: ${userCommunityPost[i].eventTitle}<br>
        Event Organizer: ${userCommunityPost[i].eventOrganizerName}<br>
        Event Location: ${userCommunityPost[i].eventLocation}<br>
        Event Description: ${userCommunityPost[i].eventDescription}<br>
        Posted by: ${userCommunityPost[i].username}<br>
        Posted at: ${userCommunityPost[i].time}<hr>`
    }
    $('#ownCommunityPost').html(communityPostArray)
}


// load events to main div
function loadEventsToMainDiv() {
    $('#ownPosts').empty()
    $.ajax({
        url: 'http://localhost:5002/ownCommunityPost/read',
        type: 'GET',
        success: populateCommunityPosts
    })
}


// Get user input from form and send to database to create a new post
function submitCommunityFormBtn() {
    var eventTitleVar = $("#eventPostTitle").val();
    var eventOrganizerName = $("#eventPostOrganizer").val();
    var eventLocationVar = $("#eventPostLocation").val();
    var eventDescriptionVar = $("#eventPostBody").val();
    var timeOfEventPost = new Date();

    console.log(eventTitleVar, eventOrganizerName, eventLocationVar, eventDescriptionVar, timeOfEventPost)
    $.ajax({
        url: "http://localhost:5002/newCommunityPostForm/create",
        type: "PUT",
        data: {
            eventTitle: eventTitleVar,
            eventOrganizerName: eventOrganizerName,
            eventLocation: eventLocationVar,
            eventDescription: eventDescriptionVar,
            time: timeOfEventPost
        },
        success: (r) => {
            console.log(r)
            loadEventsToMainDiv()
        }
    })
}


function setup() {
    loadEventsToMainDiv()
    $("body").on("click", "#submit", submitCommunityFormBtn)
}

$(document).ready(setup);