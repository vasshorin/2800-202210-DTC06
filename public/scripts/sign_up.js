
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

async function storeNewUser() {
    newFirstName = $('#newFirstName').val()
    newLastName = $('#newLastName').val()
    newAge = $('newAge').val()
    newUserEmail = $('#newUserEmail').val()
    newUsername = $('#newUsername').val()
    newPassword = $('#newPassword').val()
    newLocation = $('#newLocation').val()
    currentTime = new Date()
    console.log(newFirstName, newLastName, newAge, newUserEmail, newUsername, newPassword, newLocation, currentTime)
    await $.ajax({
        url: 'http://localhost:5002/signup/create',
        type: 'PUT',
        data: {
            firstname: newFirstName,
            lastname: newLastName,
            age: newAge,
            email: newUserEmail,
            username: newUsername,
            password: newPassword,
            location: newLocation,
            time: currentTime
        },
        success: (x) => {
            console.log(x)
        }
    })
}

function setup() {
    $("#messageToDisplay").hide();
    $('body').on('click', '#submit', storeNewUser);
}

$(document).ready(setup)