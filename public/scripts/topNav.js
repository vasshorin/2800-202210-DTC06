// direct to previous page in history
function goBack() {
    history.back();
}

// call the functions
function setup(){
    goBack();
}

// call the setup function when page is ready
$(document).ready(setup);