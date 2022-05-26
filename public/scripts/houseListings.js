// Populate the posts on the page when the page loads.
function populatePosts(posts) {
    console.log(posts)
    postArray = '<hr>'
    for (i = 0; i < posts.length; i++) { // for each post
        postArray += `
        <a href="../housePosts/${posts[i]._id}" class="btn">"
            Title: ${posts[i].title}<br>
            Price: $${posts[i].price}<br>
            Description: ${posts[i].description}<br>
            Posted by: ${posts[i].username}<br>
            Posted at: ${posts[i].time}
            <hr>
        </a>`
    }
    $('#posts').html(postArray)
}

function directPost(){
    postId=$(this).attr('id')
    console.log(postId)
    $.ajax({
        // url: `https://warm-cove-79874.herokuapp.com/housePosts/${postId}`,
        url: `http://localhost:5002/housePosts/${postId}`,
        type: 'GET',
        success: (x)=>{
            console.log(x)
        }
    })
}

{/* // Ajax call to get all posts from the database and call populatePosts to populate the page, when the page loads. */}
function getPosts() {
    $.ajax({
        // url:'https://warm-cove-79874.herokuapp.com/housePosts/read',
        url: 'http://localhost:5002/housePosts/read',
        type: 'GET',
        success: populatePosts
    })
}

// Opens direct chat with the user who posted the post.
function directChat() {
    otherUserId = $(this).attr('id')
    console.log(otherUserId)
    $.ajax({
        // url: `https://warm-cove-79874.herokuapp.com/chat/${otherUserId}`,
        url: `http://localhost:5002/chat/${otherUserId}`,
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