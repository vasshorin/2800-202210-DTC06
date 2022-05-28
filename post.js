function directChat() {
    userId = $(this).attr('id')
    title = $(this).attr('value')
    console.log(userId, title)
}

function setup() {
    $('body').on('click', '.chat', directChat)
}

$(document).ready(setup)