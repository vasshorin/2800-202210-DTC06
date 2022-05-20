var now = new Date(Date.now());
var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
// let userId = ''

// function storeUserObj (userObj){
//     userId = userObj._id
//     return userId
// }

userId = null


// Current user ID
function getUserId(){
    $.ajax({
        url: "http://localhost:5002/userId",
        type: "GET",
        success: loadEventsToMainDiv
    })
        // success: (userObj)=>{
        //     userId = userObj
        // }
        // })
        // return userId
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
        url: "http://localhost:5002/newHousePost/create",
        type: "put",
        data: {
            title: title,
            description: description,
            price: price,
            time: time
        }, success: (r)=>{
            console.log(r)
            $("main").empty()
            loadEventsToMainDiv()
        }
    })
}

function loadEventsToMainDiv(userObj) {
    userID = userObj._id;
    console.log("the userId: " + userObj._id);
    var post = 1;
    // $.ajax({
    //     url: "http://localhost:5002/userId",
    //     type: "GET",
    //     success: storeUserObj
    //     userId = userObj._id
    //     })

    $.ajax({
        url: "http://localhost:5002/test/read",
        type: "get",
        success: (r)=>{
            // console.log(r)
            // if (userId == r[i].userId)
            for( i = 0 ; i < r.length; i++ ){
                {
                $("main").append(`
                <div id="posts">
                <div class="post">
                <div class="post-header">
                <h1>
                    Post: <span id=title>${r[i].title}</span>
                </h1>
            </div>
            <div class="post-body">
            <p> Price $<span id=price>${r[i].price}</span></p>
                <p>
                    ${r[i].description}
                </p>
                <hr>

                <button class="deleteButtons" id="${r[i]["_id"]}"> Delete</button> 
                <button class="saveButtons" id="${r[i]["_id"]}"> Save</button>
                <button class="publishButtons" id="${r[i]["_id"]}"> Publish</button>
            </div>
        </div>     
                    `)
                    post++;  
                    // console.log("Price: " + r[i].price)   
                    // console.log("Id: " + r[i]["_id"])    
            }
        }
           
        }
    })

}

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
    getUserId()
    // loadEventsToMainDiv()

    $("body").on("click", "#submit", submitForm)
    // $("body").on("click", ".deleteButtons", deleteEvent)
}





$(document).ready(setup);

