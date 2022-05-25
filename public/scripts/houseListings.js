function populatePosts(posts) {
    console.log(posts)
    postArray = '<hr>'
    for (i = 0; i < posts.length; i++) {
        postArray += `
        Title: ${posts[i].title}<br>
        Price: $${posts[i].price}<br>
        Description: ${posts[i].description}<br>
        Posted by: ${posts[i].username}<br>
        Posted at: ${posts[i].time}<br>
        <button class="chat" id="${posts[i].userId}">Chat!</button><hr>`
    }
    $('#posts').html(postArray)
}

function getPosts() {
    $.ajax({
        // url:'https://warm-cove-79874.herokuapp.com/housePosts/read',
        url: 'http://localhost:5002/housePosts/read',
        type: 'GET',
        success: populatePosts
    })
}

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
}

$(document).ready(setup)