let white = document.getElementsByClassName("white_display")[0];
let purple = document.getElementsByClassName("purple_display")[0];

function toggleWhite() {
    white.style.display = "flex";
    purple.style.display = "none";
    white.classList.add("slidein");
}

function togglePurple() {
    purple.style.display = "flex";
    white.style.display = "none";
    setTimeout(5);
}