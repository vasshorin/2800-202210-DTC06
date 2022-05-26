
// function passwordTrigger(){
//     // Populate on click.
//     $("#messageToDisplay").show(); 
//     var userPasswordInput = document.getElementById("psw");
//     var letter = document.getElementById("letter");
//     var capital = document.getElementById("capital");
//     var number = document.getElementById("number");
//     var length = document.getElementById("length");

//     // When the user clicks on the password field, show the message box
//     userPasswordInput.onfocus = function() {
//     document.getElementById("messageToDisplay").style.display = "block";
//     }

//     // When the user clicks outside of the password field, hide the message box
//     userPasswordInput.onblur = function() {
//     document.getElementById("messageToDisplay").style.display = "none";
//     }

//     // When the user starts to type something inside the password field
//     userPasswordInput.onkeyup = function() {
//     // Validate lowercase letters
//     var lowerCaseLetters = /[a-z]/g;
//     if(userPasswordInput.value.match(lowerCaseLetters)) {  
//         letter.classList.remove("invalid");
//         letter.classList.add("valid");
//     } else {
//         letter.classList.remove("valid");
//         letter.classList.add("invalid");
//     }
    
//     // Validate capital letters
//     var upperCaseLetters = /[A-Z]/g;
//     if(userPasswordInput.value.match(upperCaseLetters)) {  
//         capital.classList.remove("invalid");
//         capital.classList.add("valid");
//     } else {
//         capital.classList.remove("valid");
//         capital.classList.add("invalid");
//     }

//     // Validate numbers
//     var numbers = /[0-9]/g;
//     if(userPasswordInput.value.match(numbers)) {  
//         number.classList.remove("invalid");
//         number.classList.add("valid");
//     } else {
//         number.classList.remove("valid");
//         number.classList.add("invalid");
//     }
    
//     // Validate length
//     if(userPasswordInput.value.length >= 8) {
//         length.classList.remove("invalid");
//         length.classList.add("valid");
//     } else {
//         length.classList.remove("valid");
//         length.classList.add("invalid");
//     }
//     }
// }

// FELIX YOU NEED TO WORK ON THIS AGAIN

// Get user input from form and send to database to create a new user object
async function storeNewUser() {
    username= $('#username').val()
    firstName = $('#firstName').val()
    lastName = $('#lastName').val()
    email = $('#email').val()
    age = $('#age').val()
    province=$('#province').val()
    city=$('#city').val()
    password = $('#password').val()
    time = new Date()
    await $.ajax({
        // url: 'https://warm-cove-79874.herokuapp.com/signup/create',
        url: 'http://localhost:5002/signup/create',
        type: 'POST',
        data: {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            age: age,
            province: province,
            city: city,
            password: password,
            time: time
        },
        success: (x) => {
            console.log(x)
            // redirect to login page
            window.location.href = "/pages/login.html" // redirect to login page
        }
    })
}

function setup() {
    // $("#messageToDisplay").hide();
    $('body').on('click', '#submit', storeNewUser);
}

$(document).ready(setup)
