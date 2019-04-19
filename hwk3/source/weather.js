let white = document.getElementsByClassName("white_display")[0];
let purple = document.getElementsByClassName("purple_display")[0];

function toggle() {
    if (white.classList.contains("open")) {
        white.classList.add("closed");
        white.classList.remove("open");
    } else {
        white.classList.remove("closed");
        white.classList.add("open");
    }
}