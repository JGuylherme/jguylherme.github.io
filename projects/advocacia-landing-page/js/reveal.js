/**
 * Adds the `.vis` class to `.reveal` elements when they
 * enter the viewport, creating a scroll reveal animation.
 * Each element is animated only once.
 * 
 */

(function initReveal() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}());
