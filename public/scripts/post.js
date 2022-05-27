function directChat() {
    userId = $(this).attr('id')
    title = $(this).attr('value')
    console.log(userId, title)
    // $.ajax({
    //     // url: `https://warm-cove-79874.herokuapp.com/chat/${userId}/${title}`,
    //     url: `http://localhost:5002/chat/${userId}/${title}`,
    //     type: 'GET'
    // })
}

function setup() {
    $('body').on('click', '.chat', directChat)
}

$(document).ready(setup)