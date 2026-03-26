/**
 * Handles navigation interactions including:
 * - Smooth scrolling to page sections
 * - Changing navigation background on scroll
 * - Opening and closing the mobile menu
 *
 */

/**
 * Smoothly scrolls the page to a specific element by ID.
 */
function goto(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Adds a visual background effect to the navigation bar
 * when the user scrolls down the page.
 */
window.addEventListener('scroll', function () {
  document.getElementById('nav')
    .classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/**
 * Toggles the mobile menu visibility and updates the
 * hamburger icon animation and accessibility attributes.
 */
function toggleMenu() {
  var menu = document.getElementById('mmenu');
  var hamburger = document.getElementById('hbg');
  var isOpen = menu.classList.toggle('open');

  document.body.style.overflow = isOpen ? 'hidden' : '';
  hamburger.setAttribute('aria-expanded', String(isOpen));

  var spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
}

/**
 * Closes the mobile menu and restores page scrolling.
 */
function closeMenu() {
  var menu = document.getElementById('mmenu');
  var hamburger = document.getElementById('hbg');

  menu.classList.remove('open');
  document.body.style.overflow = '';

  var spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity = '';
  spans[2].style.transform = '';
}

/**
 * Closes the mobile menu when the Escape key is pressed.
 */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeMenu();
});
