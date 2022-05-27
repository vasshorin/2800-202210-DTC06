user = ''
pictureURL = ''

function populateUserInfo(userobj) {
    $('#firstNameInput').val(userobj.firstName)
    $('#lastNameInput').val(userobj.lastName)
    $('#ageInput').val(userobj.age)
    $('#emailInput').val(userobj.email)
    $('#cityInput').val(userobj.city)
    $('#provinceInput').val(userobj.province)
    if (userobj.image != null) {
        $('#profilePicture').html(`<img src="${userobj.image}" class="rounded-circle border border-dark border-1 mx-auto d-block" style="width: 150px">`)
    }
    console.log(userobj)
    user = userobj
}

function getUserobj() {
    $.ajax({
        url: `https://warm-cove-79874.herokuapp.com/user`,
        // url: 'http://localhost:5002/user',
        type: 'GET',
        success: populateUserInfo
    })
    return user
}

// upload profile picture to storage
// part of the codes are reused from 2022 Jan COMP 1800 DTC-14 project
function uploadProfile() {
    // get the picture from user input
    var uploadButton = document.getElementById("uploadButton");
    uploadButton.addEventListener("change", uploadFile => {
        var file = uploadFile.target.files[0];
        // upload the picture to storage
        var uploadStorage = firebase.storage().ref("profile_pictures/" + user.userId + ".jpeg").put(file)
        uploadStorage.then(() => {
            // Get the URL
            uploadStorage.snapshot.ref.getDownloadURL().then((pictureURL) => {
                console.log('profile picture URL: ', pictureURL);
                $.ajax({
                    url: `https://warm-cove-79874.herokuapp.com/uploadProfilePic`,
                    // url: 'http://localhost:5002/uploadProfilePic',
                    type: 'PUT',
                    data: {
                        userId: user.userId,
                        pictureURL: pictureURL
                    },
                    success: (msg) => {
                        console.log(msg)
                    }
                })
            })
        })
    })
}

// Allow user to edit their info
function editInfo() {
    document.getElementById('personalInfoFields').disabled = false
}

// Upadte user's info to db
function updateInfo() {
    document.getElementById('personalInfoFields').disabled = true
    firstName = $('#firstNameInput').val()
    lastName = $('#lastNameInput').val()
    age = $('#ageInput option:selected').val()
    email = $('#emailInput').val()
    city = $('#cityInput').val()
    province = $('#provinceInput').val()
    console.log(firstName, lastName, age, email, city, province)
    $.ajax({
        url: `https://warm-cove-79874.herokuapp.com/updateUserInfo`,
        // url: 'http://localhost:5002/updateUserInfo',
        type: 'PUT',
        data: {
            userId: null,
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email,
            city: city,
            province: province
        },
        success: (msg) => {
            alert(msg)
        }
    })
}

function setup() {
    getUserobj()
    uploadProfile()
    $('body').on('click', '#edit', editInfo)
    $('body').on('click', '#save', updateInfo)
}

$(document).ready(setup)