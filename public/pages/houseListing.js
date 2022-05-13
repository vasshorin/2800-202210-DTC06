var now = new Date(Date.now());
var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

function loadEventsToMainDiv() {
    var post = 1;
    $.ajax({
        url: "http://localhost:5003/test/read",
        type: "get",
        success: (r)=>{
            console.log(r)
            for( i = 0 ; i < r.length; i++  ){
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
                    console.log("Price: " + r[i].price)   
                    console.log("Id: " + r[i]["_id"])    
            }
           
        }
    })
}
// <p> at time <span id="time">${r[i].time}</span></p>
{/* <h2>Price $ <span id="price>${r[i].price}</span><h2>  */}

// submit form
function submitForm() {
    var title = $("#postTitle").val();
    var description = $("#postBody").val();
    var price = $("#postPrice").val();
    // var time = formatted;
    $.ajax({
        url: "http://localhost:5003/test/create",
        type: "put",
        data: {
            title: title,
            description: description,
            price: price,
        }, success: (r)=>{
            console.log(r)
            $("main").empty()
            loadEventsToMainDiv()
        }
    })
}

// delete post
function deleteEvent(){
    x = this.id
    console.log(x)
    $.ajax({
        url: `http://localhost:5003/test/delete/${x}`,
        type: "put",
        success: (r)=>{
            console.log(r)
            $("main").empty()
            loadEventsToMainDiv()
        }
    })
}









function setup() {
    console.log("setup")
    loadEventsToMainDiv()

    $("#submit").on("click", submitForm)
    $("body").on("click", ".deleteButtons", deleteEvent)
}





$(document).ready(setup);