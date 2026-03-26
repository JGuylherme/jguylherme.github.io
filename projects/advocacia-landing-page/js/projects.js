/**
 * * Filters project cards based on selected category tabs.
 * Handles active tab styling and smooth visibility transitions
 * when showing or hiding project cards.
 * 
 */

function filterP(btn, cat) {
  document.querySelectorAll('.tab').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  document.querySelectorAll('.pc').forEach(function (card) {
    var visible = cat === 'all' || card.dataset.cat === cat;

    card.style.transition = 'opacity .3s, transform .3s';
    card.style.opacity = visible ? '1' : '0';
    card.style.transform = visible ? '' : 'translateY(10px)';
    card.style.pointerEvents = visible ? '' : 'none';
  });
}
