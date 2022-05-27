// Gets input from the user and sends it to the server to match it with the database to authenticate the user. 
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
            // if user is admin, redirect to admin page
            if (x.admin === true) {
                window.location.href = "/pages/admin.html"
            } else {
                window.location.href = "/index.html"
            }
        }
    })
}

function setup() {
    $('body').on('click', '#login', authenticateUser)
}

$(document).ready(setup)