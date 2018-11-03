window.addEventListener('load', initPiano);
function initPiano() {
  const teclas = document.getElementsByClassName('tecla');
  for (let i = 0; i < teclas.length; i++) {
    teclas[i].addEventListener('mousedown', () => {
      const audio = document.getElementById(this.dataset.audio);
      audio.currentTime = 0;
      audio.play();
    });
  }

  function playKey(key){

  }

  window.addEventListener('keypress', (event) => {
    
  })
  
}
