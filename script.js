const soundcloudPlayer = document.querySelector("#soundcloud-player");
const soundcloudPlaylist =
  "https://soundcloud.com/qotsa/sets/like-clockwork-2";
let widget;
let widgetReady = false;
let selectedTrackIndex;

function playSelectedTrack() {
  if (widgetReady && selectedTrackIndex !== undefined) {
    widget.skip(selectedTrackIndex);
    widget.play();
  }
}

document.querySelectorAll(".play-button").forEach((button) => {
  button.addEventListener("click", () => {
    selectedTrackIndex = Number(button.dataset.trackIndex);
    soundcloudPlayer.hidden = false;
    if (!widget) {
      soundcloudPlayer.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudPlaylist)}&auto_play=false&show_artwork=false&visual=false`;
      widget = SC.Widget(soundcloudPlayer);
      widget.bind(SC.Widget.Events.READY, () => {
        widgetReady = true;
        playSelectedTrack();
      });
      return;
    }

    playSelectedTrack();
  });
});
