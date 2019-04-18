let up_slider = document.getElementById("up_arrow");
let white = document.getElementsByClassName("white_display")[0];
let purple = document.getElementsByClassName("purple_display")[0];

function toggle() {
    if (white.style.display != "flex") {
        white.style.display = "flex";
        white.className = "slidein";
        purple.style.display = "none";
    } else {
        white.style.display = "none";
        white.classList.remove("slidein");
        purple.style.display = "flex";
    }
}