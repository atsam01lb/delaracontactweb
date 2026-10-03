/* Sam El Hindy — Links: staggered reveal + share */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Reveal sections after the signature finishes, then on scroll */
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var firstWave = true;
  function show(el, i) {
    el.style.setProperty('--d', firstWave ? (2.9 + i * 0.07).toFixed(2) + 's' : '0s');
    el.classList.add('in');
  }
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var count = 0;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { show(en.target, count++); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -30px 0px' });
    items.forEach(function (el) { io.observe(el); });
    setTimeout(function () { firstWave = false; }, 3200);
  }

  /* Share */
  var btn = document.getElementById('share');
  var toast = document.getElementById('toast');
  function note(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(note.t);
    note.t = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }
  if (btn) btn.addEventListener('click', function () {
    var data = { title: 'Sam El Hindy', url: location.href.split('?')[0] };
    if (navigator.share) navigator.share(data).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(data.url).then(function () { note('Link copied'); }, function () { note(data.url); });
    else note(data.url);
  });
})();
