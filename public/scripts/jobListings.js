// New branch

// Populate the posts on the page when the page loads.
function populatePosts(posts) {
    console.log(posts)
    postArray = '<hr>'
    for (i = 0; i < posts.length; i++) { // for each post
        postArray += `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${posts[i].jobTitle}</h5>
            <p class="card-text">${posts[i].jobDescription}</p>
            <a href="../jobPosts/${posts[i]._id}" class="btn btn-info">View Details</a>
            <p class="card-text"><small class="text-muted">Posted by: ${posts[i].username} at: ${posts[i].time}</small></p>
          </div>
        </div>`
    }
    $('#posts').html(postArray)
}

function directPost(){
    postId=$(this).attr('id')
    console.log(postId)
    $.ajax({
        url: `https://warm-cove-79874.herokuapp.com/jobPosts/${postId}`,
        // url: `http://localhost:5002/jobPosts/${postId}`,
        type: 'GET',
        success: (x)=>{
            console.log(x)
        }
    })
}

{/* // Ajax call to get all posts from the database and call populatePosts to populate the page, when the page loads. */}
function getPosts() {
    $.ajax({
        url:'https://warm-cove-79874.herokuapp.com/jobPosts/read',
        // url: 'http://localhost:5002/jobPosts/read',
        // type: 'GET',
        success: populatePosts
    })
}

// Opens direct chat with the user who posted the post.
function directChat() {
    otherUserId = $(this).attr('id')
    console.log(otherUserId)
    $.ajax({
        url: `https://warm-cove-79874.herokuapp.com/chat/${otherUserId}`,
        // url: `http://localhost:5002/chat/${otherUserId}`,
        type: 'GET',
        success: (x) => {
            console.log(x)
        }
    })
}

function setup() {
    getPosts()
    $('body').on('click', '.chat', directChat)
    // $('body').on('click', '.btn', directPost)
}

$(document).ready(setup)