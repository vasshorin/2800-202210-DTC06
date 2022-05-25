async function authenticateUser() {
    email = $('#email').val()
    password = $('#password').val()
    console.log(email, password)
    await $.ajax({
        // url: 'https://warm-cove-79874.herokuapp.com/login/authentication',
        url: 'http://localhost:5002/login/authentication',
        type: 'POST',
        data: {
            email: email,
            password: password
        },
        success: (x) => {
            console.log("extra" + x)
        }
    })
}

function setup() {
    $('body').on('click', '#login', authenticateUser)
}

$(document).ready(setup)