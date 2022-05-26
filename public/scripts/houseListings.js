// New branch

// Populate the posts on the page when the page loads.
function populatePosts(posts) {
    console.log(posts)
    postArray = '<hr>'
    for (i = 0; i < posts.length; i++) { // for each post
        postArray += `
        <div class="card">
        <div class="card-body">
        <h5 class="card-title"><b>Title: ${posts[i].title}</b></h5>
        <img class="card-img-top" src="https://picsum.photos/seed/picsum/500/500?random=6" alt="Card image cap">
        <p class="card-text felix-test">Description: ${posts[i].description} </p>
        <a href="../housePosts/${posts[i]._id}" class="btn btn-warning">View Post</a>
        <p class="card-text"><small class="text-muted">Posted by: ${posts[i].username} at: ${posts[i].time}</small></p>
        </div>
        </div>
        `
    }
    $('#posts').html(postArray)
}

//  <p class="card-text">Description: ${posts[i].description}</p>

{/* 
 <div class="row">
    <div class="col-12">
<div class="card-deck">
    <div class="card">
        <img class="card-img-top" src="https://picsum.photos/300/200?random=4" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
    </div>
    <div class="card">
        <img class="card-img-top" src="https://picsum.photos/300/200?random=5" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional
                content.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
    </div>
    <div class="card">
        <img class="card-img-top" src="https://picsum.photos/300/200?random=6" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                additional content. This card has even longer content than the first to show that equal
                height action.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
    </div>
</div>
</div>
</div>
</div> */}

{/* <a href="../housePosts/${posts[i]._id}" class="btn">"
Title: ${posts[i].title}<br>
Price: $${posts[i].price}<br>
Description: ${posts[i].description}<br>
Posted by: ${posts[i].username}<br>
Posted at: ${posts[i].time}
<hr>
</a>
<div class="card-body">
<h5 class="card-title">Card title</h5>
<p class="card-text">This is a wider card with supporting text below as a natural lead-in to
    additional content. This content is a little bit longer.</p>
<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
</div> */}

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