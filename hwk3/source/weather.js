let white = document.getElementsByClassName("white_display")[0];
let purple = document.getElementsByClassName("purple_display")[0];

function toggleWhite() {
    white.style.display = "flex";
    purple.style.display = "none";
    if (white.classList.contains("open_white")) {
        white.classList.remove("open_white");
    }
    white.classList.add("open_white");
}

function togglePurple() {
    purple.classList.add("open_purple");
    white.classList.remove("open_white");
    purple.style.display = "flex";
    white.style.display = "none";
}