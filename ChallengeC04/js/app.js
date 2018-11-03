window.addEventListener('load', initPiano);
function initPiano() {
  const teclas = document.getElementsByClassName('tecla');
  for (let i = 0; i < teclas.length; i++) {
    teclas[i].addEventListener('mousedown', function() {
      this.classList.add("tecla-activa");
      const audio = document.getElementById(this.dataset.audio);
      audio.currentTime = 0;
      audio.play();
    });
    teclas[i].addEventListener('mouseup', function() {
        this.classList.remove("tecla-activa");
    })
  }

  function getPianoKey(key){
    const pianoKeys = {
        'KeyA': 'audio-doc',
        'KeyS': 'audio-rec',
        'KeyD': 'audio-mic',
        'KeyF': 'audio-fac',
        'KeyX': 'audio-solc',
        'KeyC': 'audio-lac',
        'KeyV': 'audio-sic',
        'KeyB': 'audio-dos',
        'KeyN': 'audio-res',
        'KeyM': 'audio-mis',
        'KeyH': 'audio-fas',
        'KeyJ': 'audio-sols',
        'KeyK': 'audio-las',
        'KeyL': 'audio-sis',
        'KeyQ': 'audio-docsost',
        'KeyW': 'audio-recsost',
        'KeyE': 'audio-facsost',
        'KeyR': 'audio-solcsost',
        'KeyT': 'audio-lacsost',
        'KeyY': 'audio-dossost',
        'KeyU': 'audio-ressost',
        'KeyI': 'audio-fassost',
        'KeyO': 'audio-solssost',
        'KeyP': 'audio-lassost'
    };
    return pianoKeys[key];
  }

  window.addEventListener('keydown', (event) => {
    let keyPressed = event.code;
    // console.log(keyPressed)
    const audioId = getPianoKey(keyPressed);
    if(audioId) {
        const audioToPlay = document.getElementById(audioId);
        audioToPlay.currentTime = 0;
        audioToPlay.play();
    }
  });
  
}
