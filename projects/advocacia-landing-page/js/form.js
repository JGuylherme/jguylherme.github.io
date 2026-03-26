/**
 * Handles contact form submission
 * with visual success feedback.
 *
 */

document.getElementById('cform').addEventListener('submit', function (e) {
  e.preventDefault();

  var btn = document.getElementById('sbtn');
  var txt = document.getElementById('stxt');

  btn.disabled = true;
  txt.textContent = 'Enviando...';

  setTimeout(function () {
    txt.textContent = '✓ Mensagem enviada!';
    btn.style.background = '#16A34A';

    setTimeout(function () {
      txt.textContent = 'Enviar mensagem';
      btn.style.background = '';
      btn.disabled = false;
      document.getElementById('cform').reset();
    }, 3000);
  }, 1400);
});
