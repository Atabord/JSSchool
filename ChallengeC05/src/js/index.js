require('babel-polyfill');
const initBookShelfApp = require('./showBooks');
const initEvents = require('./events');

// This function inits the whole application calling initBooks and initEvents
function initApp() {
  initBookShelfApp();
  initEvents();
}

// init the app when the page has loaded.
window.addEventListener('load', initApp);
