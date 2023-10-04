const videoContainer = document.getElementById("videoContainer");
const video = document.querySelector("video");
const playBtn = document.getElementById("playBtn");
const muteBtn = document.getElementById("muteBtn");
const volumeRange = document.getElementById("volumeRange");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeRange = document.getElementById("timeRange");
const screenBtn = document.getElementById("screenBtn");

let userVolume = 0.5;
video.volume = userVolume;

const handlePlayClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMuteClick = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
    volumeRange.value = userVolume;
    video.volume = userVolume;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : userVolume;
  console.log("userVolume", userVolume);
  console.log("volumeRange.value", volumeRange.value);
};

const handleVolumeChange = (event) => {
  userVolume = event.target.value;
  video.volume = event.target.value;
  if (video.volume !== 0) {
    video.muted = false;
    muteBtn.innerText = "Mute";
    video.volume = userVolume;
    event.target.value = userVolume;
  } else {
    muteBtn.innerText = "Unmute";
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
  screenBtn.innerText = document.fullscreenElement
    ? "Enter Fullscreen"
    : "Exit Fullscreen";
};

const handleMouseEnter = () => {
  console.log("mouse enter");
  videoContainer.classList.add("showing");
};

const videoEnded = () => {
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
videoContainer.addEventListener("mouseenter", handleMouseEnter);
video.addEventListener("ended", videoEnded);
