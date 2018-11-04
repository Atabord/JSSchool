// This function initialize piano functions
function initPiano() {
  // Adding Listeners to mouse events over the piano
  const teclas = document.getElementsByClassName('tecla');
  for (let i = 0; i < teclas.length; i += 1) {
    teclas[i].addEventListener('mousedown', function () {
      this.classList.add('tecla_activa');
      const audio = document.getElementById(this.dataset.audio);
      audio.currentTime = 0;
      audio.play();
    });
    teclas[i].addEventListener('mouseup', function () {
      this.classList.remove('tecla_activa');
    });
  }

  // GetPianoKey function returns the audio id an the key id
  // Depending on the key pressed on the keyboard
  function getPianoKey(key) {
    const pianoKeys = {
      KeyZ: ['audioDoc', 'keyDoc'],
      KeyX: ['audioRec', 'keyRec'],
      KeyC: ['audioMic', 'keyMic'],
      KeyV: ['audioFac', 'keyFac'],
      KeyB: ['audioSolc', 'keySolc'],
      KeyN: ['audioLac', 'keyLac'],
      KeyM: ['audioSic', 'keySic'],
      KeyD: ['audioDos', 'keyDos'],
      KeyF: ['audioRes', 'keyRes'],
      KeyG: ['audioMis', 'keyMis'],
      KeyH: ['audioFas', 'keyFas'],
      KeyJ: ['audioSols', 'keySols'],
      KeyK: ['audioLas', 'keyLas'],
      KeyL: ['audioSis', 'keySis'],
      KeyQ: ['audioDocsost', 'keyDocsost'],
      KeyW: ['audioRecsost', 'keyRecsost'],
      KeyE: ['audioFacsost', 'keyFacsost'],
      KeyR: ['audioSolcsost', 'keySolcsost'],
      KeyT: ['audioLacsost', 'keyLacsost'],
      KeyY: ['audioDossost', 'keyDossost'],
      KeyU: ['audioRessost', 'keyRessost'],
      KeyI: ['audioFassost', 'keyFassost'],
      KeyO: ['audioSolssost', 'keySolssost'],
      KeyP: ['audioLassost', 'keyLassost'],
    };
    return pianoKeys[key];
  }

  // Adding Event listener to the keyboard events
  window.addEventListener('keydown', (event) => {
    const keyPressed = event.code;
    const pianoKey = getPianoKey(keyPressed);
    if (pianoKey) {
      const audioId = pianoKey[0];
      const pianoKeyId = pianoKey[1];
      const pianoKeyPressed = document.getElementById(pianoKeyId);
      pianoKeyPressed.classList.add('tecla_activa');
      const audioToPlay = document.getElementById(audioId);
      audioToPlay.currentTime = 0;
      audioToPlay.play();
    }
  });

  // Removing some styles when the key is unpressed
  window.addEventListener('keyup', (event) => {
    const keyUnpressed = event.code;
    const pianoKey = getPianoKey(keyUnpressed);
    if (pianoKey) {
      const pianoKeyUnpressedId = pianoKey[1];
      const pianoKeyUnpressed = document.getElementById(pianoKeyUnpressedId);
      pianoKeyUnpressed.classList.remove('tecla_activa');
    }
  });
}

// Initialize piano functions only when the whole page has loaded
window.addEventListener('load', initPiano);
