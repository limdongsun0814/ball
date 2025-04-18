import ballAudio from "../audio/ball.mp3";

export default class BallSound {
  static BallSoundInstance = null;
  sound = null;
  buffer = null;
  constructor() {
    this.sound = new (window.AudioContext || window.webkitAudioContext)();
    this.setBuffer();
  }
  static getBallSoundInstance() {
    if (!this.BallSoundInstance) {
      this.BallSoundInstance = new BallSound();
    }
    return this.BallSoundInstance;
  }
  setBuffer() {
    fetch(ballAudio)
      .then((res) => res.arrayBuffer())
      .then((data) => this.sound.decodeAudioData(data))
      .then((buffer) => {
        this.buffer = buffer;
      });
  }
  play() {
    if (!this.buffer) return;
    const source = this.sound.createBufferSource();
    source.buffer = this.buffer;
    source.connect(this.sound.destination);
    source.start();
  }
}
