// get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector(".fullscreen");

// build our functions
function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icons = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icons;
}

function skipbtns() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = ` ${percent}% `;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleFullscreen() {
    video.requestFullscreen();
}

// hook up the event listeners
toggle.addEventListener("click",togglePlay);
video.addEventListener("click",togglePlay);
video.addEventListener("play",updateButton);
video.addEventListener("pause",updateButton);
video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach(button => button.addEventListener("click",skipbtns));

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
fullScreen.addEventListener("click", handleFullscreen);

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => mouseDown = true);
progress.addEventListener("mouseup", () => mouseDown = false);

