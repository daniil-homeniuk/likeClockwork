const soundcloudPlayer = document.querySelector("#soundcloud-player");
const soundcloudPlaylist =
  "https://soundcloud.com/qotsa/sets/like-clockwork-2";

let widget;
let widgetReady = false;
let selectedTrackIndex = 0;

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

  if (!widget) {
    initPlayer();
    return;
  }

  if (widgetReady) {
    playSelectedTrack();
  }
}

document.querySelectorAll(".play-button").forEach((button) => {
  button.addEventListener("click", () => {
    selectTrack(Number(button.dataset.trackIndex));
  });
});

selectTrack(0);
