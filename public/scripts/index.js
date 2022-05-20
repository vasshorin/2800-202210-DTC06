// styling for strictly uCAN logo
var throttle = false;
var throttleTwo = false; 
// Letter U
function changeLetterU(evt) {
    if (!throttle && evt.detail === 1) {
        colorChanger = $(evt.target).css({'background': '-webkit-linear-gradient(0deg, rgba(142,202,230,1) 54%, rgba(255,183,3,1) 57%)','-webkit-background-clip': 'text'  , '-webkit-text-fill-color': 'transparent'})
        throttle = true;
        setTimeout(function () {
            colorChanger = $(evt.target).css({'background': 'rgb(36, 191, 234)','-webkit-background-clip': 'text'  , '-webkit-text-fill-color': 'transparent'})
            throttle = false;
        }, 2500);
    }
}
// Letters CAN
function changeLetterCAN(evt){
    if (!throttleTwo && evt.detail === 1) {
        colorChanger = $(evt.target).css({'background': '-webkit-linear-gradient(0deg, rgba(216,6,33,1) 54%, rgba(255,255,255,1) 57%)','-webkit-background-clip': 'text'  , '-webkit-text-fill-color': 'transparent'})
        throttleTwo = true;
        setTimeout(function () {
            colorChanger = $(evt.target).css({'background': 'rgb(36, 191, 234)','-webkit-background-clip': 'text'  , '-webkit-text-fill-color': 'transparent'})
            throttleTwo = false;
        }, 2500);
    }
}

function setup() {
    $(".home .content").on('click', '.spanDifferenceTwo', changeLetterU);
    $(".home .content").on('click', '.spanDifferenceThree', changeLetterCAN);
}

$(document).ready(setup);