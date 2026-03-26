/**
 * Controls the loading screen animation and hides it once the
 * loading progress reaches 100%.
 * This script should be loaded after the DOM is fully loaded.
 *
*/

(function initLoader() {
  var lcode = document.getElementById('lcode');
  var lfill = document.getElementById('lfill');
  var lpct = document.getElementById('lpct');
  var loader = document.getElementById('loader');

  if (!loader) return;

  var lines = [
    '> carregando módulos...',
    '> conectando servidor...',
    '> autenticando sessão...',
    '> pronto.'
  ];
  var lineIndex = 0;
  var pct = 0;

  /**
   * Adds the "done" class and hides the loader after a short delay.
   */
  function hideLoader() {
    loader.classList.add('done');
    setTimeout(function () { loader.style.display = 'none'; }, 560);
  }

  /**
   * Safety timeout to ensure the loader is hidden
   * even if something fails during loading simulation.
   */
  var safetyTimer = setTimeout(hideLoader, 3500);

  /**
   * Updates loading text messages sequentially.
   */
  var lineTimer = setInterval(function () {
    if (lineIndex < lines.length) {
      if (lcode) lcode.textContent = lines[lineIndex++];
    } else {
      clearInterval(lineTimer);
    }
  }, 480);

  /**
   * Simulates loading progress by incrementing the progress bar
   * with random values until reaching 100%.
   */
  var pctTimer = setInterval(function () {
    pct = Math.min(pct + Math.random() * 14 + 4, 100);
    var rounded = Math.floor(pct);

    if (lpct) lpct.textContent = rounded + '%';
    if (lfill) lfill.style.width = rounded + '%';

    if (pct >= 100) {
      clearInterval(pctTimer);
      clearInterval(lineTimer);
      clearTimeout(safetyTimer);
      if (lpct) lpct.textContent = '100%';
      if (lfill) lfill.style.width = '100%';
      setTimeout(hideLoader, 300);
    }
  }, 85);
}());
