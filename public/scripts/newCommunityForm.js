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
        Posted at: ${userCommunityPost[i].time}
        <button id="${userCommunityPost[i]._id}" class="deleteButtons">Delete</button><hr>`
    }
    $('#ownCommunityPost').append(communityPostArray)
}


// load events to main div
function loadEventsToCommunityOwnPosts() {
    $('#ownCommunityPost').empty()
    $.ajax({
        url: 'http://localhost:5002/ownCommunityPost/read',
        type: 'GET',
        success: populateCommunityPosts
    })
}

// delete post
function deleteEvent() {
    var postId = $(this).attr('id')
    console.log(postId)
    $.ajax({
        // url: `https://warm-cove-79874.herokuapp.com/housePosts/${postId}`,
        url: `http://localhost:5002/ownCommunityPost/delete/${postId}`,
        type: 'get',
        success: (x) => {
            console.log(x)
            console.log("deleted");
            // redirect to main page
            window.location.href = "/pages/newCommunityForm.html"
        }
    })
}


// Get user input from form and send to database to create a new post
function submitCommunityFormBtn() {
    var eventTitleVar = $("#eventPostTitle").val();
    var eventOrganizerName = $("#eventPostOrganizer").val();
    var eventLocationVar = $("#eventPostLocation").val();
    var eventDescriptionVar = $("#eventPostBody").val();
    var timeOfEventPost = new Date();

    if (eventTitleVar === "" || eventOrganizerName === "" || eventLocationVar === "" || eventDescriptionVar === "") {
        alert("Please fill out all fields")
    } else {
        console.log(eventTitleVar, eventOrganizerName, eventLocationVar, eventDescriptionVar, timeOfEventPost)
        $.ajax({
            url: "http://localhost:5002/newCommunityPostForm/create",
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
                loadEventsToCommunityOwnPosts()
            }
        })
}
}


function setup() {
    loadEventsToCommunityOwnPosts()
    $("body").on("click", "#submit", submitCommunityFormBtn)
    $("body").on("click", ".deleteButtons", deleteEvent)    
}

$(document).ready(setup);