const soundcloudPlayer = document.querySelector("#soundcloud-player");
const soundcloudPlaylist =
  "https://soundcloud.com/qotsa/sets/like-clockwork-2";

let widget;
let widgetReady = false;
let selectedTrackIndex = 0;

const playButtons = document.querySelectorAll(".play-button");

function setActiveTrack(trackIndex) {
  playButtons.forEach((button) => {
    const isActive = Number(button.dataset.trackIndex) === trackIndex;
    button.closest("li").classList.toggle("is-active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "true");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function playSelectedTrack() {
  widget.skip(selectedTrackIndex);
  widget.play();
}

function initPlayer() {
  soundcloudPlayer.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudPlaylist)}&auto_play=true&show_artwork=false&visual=false`;
  widget = SC.Widget(soundcloudPlayer);
  widget.bind(SC.Widget.Events.READY, () => {
    widgetReady = true;
    playSelectedTrack();
  });
}

function selectTrack(trackIndex) {
  selectedTrackIndex = trackIndex;
  setActiveTrack(trackIndex);

  if (!widget) {
    initPlayer();
    return;
  }

  if (widgetReady) {
    playSelectedTrack();
  }
}

playButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectTrack(Number(button.dataset.trackIndex));
  });
});

selectTrack(0);
