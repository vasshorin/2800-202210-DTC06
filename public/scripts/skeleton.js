// check if user is admin
// function checkAdmin() {
//   $.ajax({
//     // url: `https://warm-cove-79874.herokuapp.com/user`,
//     url: 'http://localhost:5002/user',
//     type: 'GET',
//     success: (userobj) => {
//       if (userobj.admin) {
//         $('#admin').html('<a href="../pages/admin.html" id="admin">Admin Dashboard</a>')
//       } else {
//         $('#admin').hide()
//       }
//     }
//   })
// }


// load skeleton to pages
function loadSkeleton() {
  console.log($("#topNavPlaceHolder").load("../skeletons/topNav.html"));
  console.log($(".footer").load("../skeletons/footer.html"));
  console.log($("#bottomNavPlaceHolder").load("../skeletons/bottomNav.html"));
}

// call the functions
function setup() {
  // checkAdmin()
  loadSkeleton();
}

// call the setup function when page is ready
$(document).ready(setup);