const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const video = document.querySelector("video");
const playBtn = document.getElementById("playBtn");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("muteBtn");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volumeRange");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeRange = document.getElementById("timeRange");
const screenBtn = document.getElementById("screenBtn");
const screenBtnIcon = screenBtn.querySelector("i");

let controlsTimeout;
let controlsMovementTimeout;
let userVolume = 0.5;
video.volume = userVolume;

const handlePlayClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused
    ? "fas fa-play fa-lg"
    : "fas fa-pause fa-lg";
};
const handlePlayKeydown = (event) => {
  if (event.code === "Space") {
    handlePlayClick();
    event.preventDefault();
  }
};

const handleMuteClick = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
    volumeRange.value = userVolume;
    video.volume = userVolume;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute fa-lg"
    : "fas fa-volume-up fa-lg";
  volumeRange.value = video.muted ? 0 : userVolume;
  console.log("userVolume", userVolume);
  console.log("volumeRange.value", volumeRange.value);
};
const handleMuteKeydown = (event) => {
  if (event.code === "KeyM") {
    handleMuteClick();
  }
};

const handleVolumeChange = (event) => {
  userVolume = event.target.value;
  video.volume = event.target.value;
  if (video.volume !== 0) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-up fa-lg";
    video.volume = userVolume;
    event.target.value = userVolume;
  } else {
    muteBtnIcon.classList = "fas fa-volume-mute fa-lg";
    userVolume = 0.5;
  }
  console.log("userVolume", userVolume);
  console.log("volumeRange.value", volumeRange.value);
};

const timeFormat = (time) =>
  new Date(time * 1000).toISOString().substring(14, 19);

const handleLoadedmetadata = () => {
  totalTime.innerText = timeFormat(Math.floor(video.duration));
  timeRange.max = Math.floor(video.duration);
};
const handleTimeupdate = () => {
  currentTime.innerText = timeFormat(Math.floor(video.currentTime));
  timeRange.value = Math.floor(video.currentTime);
};

const handleTimeChange = (event) => {
  video.currentTime = event.target.value;
};

const handleScreenClick = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
  screenBtnIcon.classList = document.fullscreenElement
    ? "fas fa-expand fa-lg"
    : "fas fa-compress fa-lg";
};
const handleScreenKeydown = (event) => {
  if (event.code === "KeyF") {
    handleScreenClick();
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const videoEnded = () => {
  playBtnIcon.classList = "fas fa-reply fa-lg";
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedmetadata);
video.addEventListener("timeupdate", handleTimeupdate);
timeRange.addEventListener("input", handleTimeChange);
screenBtn.addEventListener("click", handleScreenClick);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("ended", videoEnded);
video.addEventListener("click", handlePlayClick);
document.addEventListener("keydown", handlePlayKeydown);
document.addEventListener("keydown", handleMuteKeydown);
document.addEventListener("keydown", handleScreenKeydown);
