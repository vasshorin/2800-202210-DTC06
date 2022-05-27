

// load skeleton to pages
function loadSkeleton() {
  console.log($("#topNavPlaceHolder").load("../skeletons/topNav.html"));
  console.log($(".footer").load("../skeletons/footer.html"));
  console.log($("#bottomNavPlaceHolder").load("../skeletons/bottomNav.html"));
}

// call the functions
function setup() {
  loadSkeleton();
}

// call the setup function when page is ready
$(document).ready(setup);