var now = new Date(Date.now());
var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

// Populate user's own house postings
function populatePosts(userPosts) {
    console.log(userPosts)
    postArray = '<hr>'
    for (i = 0; i < userPosts.length; i++) {
        postArray += `
        Title: ${userPosts[i].title}<br>
        Price: $${userPosts[i].price}<br>
        Description: ${userPosts[i].description}<br>
        Posted by: ${userPosts[i].username}<br>
        Posted at: ${userPosts[i].time}<hr>`
    }
    $('#ownPosts').html(postArray)
}

function loadEventsToMainDiv() {
    $('#ownPosts').empty()
    $.ajax({
        // url:'https://warm-cove-79874.herokuapp.com/ownHousePost/read',
        url: 'http://localhost:5002/ownHousePost/read',
        type: 'GET',
        success: populatePosts
    })
}


// submit form            
// userId: req.session.userobj._id,
function submitForm() {
    var title = $("#postTitle").val();
    var description = $("#postBody").val();
    var price = $("#postPrice").val();
    var time = new Date();

    console.log(title, description, price, time)
    $.ajax({
        // url: "https://warm-cove-79874.herokuapp.com/newHousePost/create",
        url: "http://localhost:5002/newHousePost/create",
        type: "put",
        data: {
            title: title,
            description: description,
            price: price,
            time: time
        },
        success: (r) => {
            console.log(r)
            // $("main").empty()
            loadEventsToMainDiv()
        }
    })
}

// Up to this point.
// function retrieveUserIDfromPosts(userObj2){
    
//     console.log('posts'+ userObj2['userId'])
    
//     console.log('ID is inside retriever' + userID)
// }

// function loadEventsToMainDiv(userObj) {
//     userID = userObj._id;
//     console.log("the userId: " + userObj._id);
//     $.ajax({
//         url: "https://warm-cove-79874.herokuapp.com/test/read",
//         type: "get",
//         success: retrieveUserIDfromPosts
        // success: (r) => {
        //     // console.log(r)
        //     // if (userId == r[i].userId)

        // }
//     })
// }


// Code for display
//  var post = 1;
// for (i = 0; i < r.length; i++) {
//     {
//         $("main").append(`
//     <div id="posts">
//     <div class="post">
//     <div class="post-header">
//     <h1>
//         Post: <span id=title>${r[i].title}</span>
//     </h1>
// </div>
// <div class="post-body">
// <p> Price $<span id=price>${r[i].price}</span></p>
//     <p>
//         ${r[i].description}
//     </p>
//     <hr>

//     <button class="deleteButtons" id="${r[i]["_id"]}"> Delete</button> 
//     <button class="saveButtons" id="${r[i]["_id"]}"> Save</button>
//     <button class="publishButtons" id="${r[i]["_id"]}"> Publish</button>
// </div>
// </div>     
//         `)
//         post++;
//         // console.log("Price: " + r[i].price)   
//         // console.log("Id: " + r[i]["_id"])    
//     }
// }

// delete post
// function deleteEvent(){
//     x = this.id
//     console.log(x)
//     $.ajax({
//         url: `http://localhost:5002/test/delete/${x}`,
//         type: "put",
//         success: (r)=>{
//             console.log(r)
//             $("main").empty()
//             loadEventsToMainDiv()
//         }
//     })
// }

function setup() {
    loadEventsToMainDiv()

    $("body").on("click", "#submit", submitForm)
    // $("body").on("click", ".deleteButtons", deleteEvent)
}

$(document).ready(setup);