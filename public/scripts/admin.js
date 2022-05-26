userCards = ''
userId = ''
postType = ''
postArray = ''

function populateUsers(users) {
    console.log(users)
    for (i = 0; i < users.length; i++) {
        userCards += `
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">${users[i].username}</h4>
                <p class="card-text">
                    <fieldset id="user${users[i]._id}" disabled>
                        <label>First Name: </label>
                        <input type="text" id="firstName${users[i]._id}" value="${users[i].firstName}">
                        <br>
                        <label>Last Name: </label>
                        <input type="text" id="lastName${users[i]._id}" value="${users[i].lastName}">
                        <br>`
        if (users[i].age == 'yes') {
            userCards += `
            <label>Over 16 years old: </label>
            <select id="age${users[i]._id}" name="age">
                <option value="yes" selected>Yes</option>
                <option value="no">No</option>
            </select>`
        } else {
            userCards += `
            <label>Over 16 years old: </label>
            <select id="age${users[i]._id}" name="age">
                <option value="yes">Yes</option>
                <option value="no" selected>No</option>
            </select>`
        }
        userCards += `
                        <br>
                        <label>Email: </label>
                        <input type="text" id="email${users[i]._id}" value="${users[i].email}">
                        <br>
                        <label>City: </label>
                        <input type="text" id="city${users[i]._id}" value="${users[i].city}">
                        <br>
                        <label>Province: </label>
                        <input type="text" id="province${users[i]._id}" value="${users[i].province}">
                    </fieldset>
                </p>
                <p>
                    <button class="btn btn-primary edit" id="edit${users[i]._id}" value="${users[i]._id}">Edit User</button>
                    <button class="btn btn-primary confirm" id="confirm${users[i]._id}" value="${users[i]._id}">Confirm</button>
                </p>
                <button class="btn btn-primary getPost" value="${users[i]._id}" id="housing" type="button" data-bs-toggle="collapse" data-bs-target="#posts${users[i]._id}">Housing posts</button>
                <button class="btn btn-primary getPost" value="${users[i]._id}" id="job" type="button" data-bs-toggle="collapse" data-bs-target="#posts${users[i]._id}">Job posts</button>
                <button class="btn btn-primary getPost" value="${users[i]._id}" id="donation" type="button" data-bs-toggle="collapse" data-bs-target="#posts${users[i]._id}">Donation posts</button>
                <button class="btn btn-primary getPost" value="${users[i]._id}" id="community" type="button" data-bs-toggle="collapse" data-bs-target="#posts${users[i]._id}">Community posts</button>
                <div class="collapse" id="posts${users[i]._id}">
                </div>
            </div>
        </div>`
    }
    $("#populate").html(userCards)
    // document.getElementById(`firstName628da92e152a47172a39f0bd`).value = 'abc'
}

function editInfo() {
    userId = $(this).attr('value')
    document.getElementById(`user${userId}`).disabled = false
}

function updateInfo() {
    userId = $(this).attr('value')
    firstName = $(`#firstName${userId}`).val()
    lastName = $(`#lastName${userId}`).val()
    age = $(`#age${userId} option:selected`).val()
    email = $(`#email${userId}`).val()
    city = $(`#city${userId}`).val()
    province = $(`#province${userId}`).val()
    console.log(userId, firstName, lastName, age, email, city, province)
    document.getElementById(`user${userId}`).disabled = true
    $.ajax({
        // url: `https://warm-cove-79874.herokuapp.com/updateUserInfo`,
        url: 'http://localhost:5002/updateUserInfo',
        type: 'PUT',
        data: {
            userId: userId,
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

function populatePosts(posts) {
    console.log(posts)
    $(`#posts${userId}`).empty()
    if (postType == 'housing') {
        urlType = 'housePosts'
    } else if (postType == 'job') {
        urlType = 'jobPosts'
    } else if (postType == 'donation') {
        urlType = 'donationPosts'
    } else if (postType == 'community') {
        urlType = 'communityPosts'
    }
    for (i = 0; i < posts.length; i++) {
        postArray += `
        <div class="card card-body">
            Title: ${posts[i].title}<br>
            <span>URL: <a href="/${urlType}/${posts[i]._id}"> click to go to the page </a></span><br>
            <button class="btn btn-danger delete" id="delete${posts[i]._id}" value="${posts[i]._id}">Delete</button>
        </div>`
    }
    $(`#posts${userId}`).html(postArray)
}

function getPosts() {
    postArray = ''
    userId = $(this).attr('value')
    postType = $(this).attr('id')
    console.log(userId, postType)
    $.ajax({
        // url: `https://warm-cove-79874.herokuapp.com/getPosts/${postType}`,
        url: `http://localhost:5002/getPosts/${userId}/${postType}`,
        type: 'GET',
        success: populatePosts
    })
}


function getUsers() {
    $.ajax({
        // url: `https://warm-cove-79874.herokuapp.com/getAllUsers`,
        url: 'http://localhost:5002/getAllUsers',
        type: 'GET',
        success: populateUsers
    })
}

function setup() {
    getUsers()
    $('body').on('click', '.edit', editInfo)
    $('body').on('click', '.confirm', updateInfo)
    $('body').on('click', '.getPost', getPosts)
}

$(document).ready(setup)