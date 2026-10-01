/* ===========================================
   COLART — Links
   The C mark assembles from its pieces on load.
   Tap / click the mark to scatter and rebuild it.
=========================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mark = document.getElementById('mark');
  var svg = mark && mark.querySelector('svg');
  var tagline = document.getElementById('tagline');
  var hint = document.getElementById('mark-hint');
  var busy = false;

  /* ---------- Assemble ---------- */
  var pieces = svg ? Array.prototype.slice.call(svg.querySelectorAll('path')) : [];
  var vb = svg ? svg.viewBox.baseVal : null;
  var cx = vb ? vb.x + vb.width / 2 : 0;
  var cy = vb ? vb.y + vb.height / 2 : 0;

  // Left-to-right sweep: connector dots first, the two big arcs land last
  var info = pieces.map(function (p) {
    var b = p.getBBox();
    return { el: p, x: b.x + b.width / 2, y: b.y + b.height / 2, area: b.width * b.height };
  }).sort(function (a, b) { return a.x - b.x; });

  function rand(min, max) { return min + Math.random() * (max - min); }

  // Pixel offset of a piece's scattered position (outward from the mark centre)
  function scatterFrame(p, strength) {
    var dx = p.x - cx, dy = p.y - cy;
    var len = Math.hypot(dx, dy) || 1;
    var px = svg.getBoundingClientRect().width / (vb ? vb.width : 1);   // svg units → px
    var dist = rand(70, 150) * strength;
    var tx = (dx / len) * dist + rand(-30, 30);
    var ty = (dy / len) * dist + rand(-30, 30);
    return {
      transform: 'translate(' + (tx / px).toFixed(1) + 'px,' + (ty / px).toFixed(1) + 'px) rotate(' + rand(-50, 50).toFixed(0) + 'deg) scale(' + rand(.35, .6).toFixed(2) + ')',
      opacity: 0
    };
  }

  function assemble(done) {
    var last;
    info.forEach(function (p, i) {
      var big = p.area > 20000;                       // the teal & magenta arcs
      var anim = p.el.animate(
        [scatterFrame(p, big ? 1.6 : 1), { transform: 'none', opacity: 1 }],
        {
          duration: big ? 1100 : 850,
          delay: 120 + i * 85 + (big ? 140 : 0),
          easing: 'cubic-bezier(.34, 1.35, .64, 1)',
          fill: 'both'
        }
      );
      if (!last || anim.effect.getComputedTiming().endTime > last.effect.getComputedTiming().endTime) last = anim;
    });
    last.onfinish = function () {
      info.forEach(function (p) { p.el.style.opacity = 1; });
      if (done) done();
    };
  }

  function scatter(done) {
    var count = info.length;
    info.forEach(function (p, i) {
      var a = p.el.animate(
        [{ transform: 'none', opacity: 1 }, scatterFrame(p, 1.2)],
        { duration: 380, delay: (count - i) * 18, easing: 'cubic-bezier(.5, 0, .75, 0)', fill: 'both' }
      );
      if (i === 0) a.onfinish = function () { done(); };
    });
  }

  function playTagline() {
    if (!tagline) return;
    tagline.classList.remove('play');
    void tagline.offsetWidth;            // restart the CSS animation
    tagline.classList.add('play');
  }

  function rebuild() {
    if (busy || reduce || !svg) return;
    busy = true;
    if (hint) hint.classList.remove('show');
    scatter(function () {
      info.forEach(function (p) { p.el.getAnimations().forEach(function (a) { a.cancel(); }); });
      assemble(function () { playTagline(); busy = false; });
    });
  }

  if (svg && !reduce && pieces[0] && pieces[0].animate) {
    busy = true;
    assemble(function () {
      playTagline();
      busy = false;
      if (hint) setTimeout(function () { hint.classList.add('show'); }, 900);
    });
    mark.addEventListener('click', rebuild);
    mark.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); rebuild(); }
    });
  } else {
    pieces.forEach(function (p) { p.style.opacity = 1; });
    if (tagline) tagline.classList.add('play');
  }

  /* ---------- Staggered reveal of the link lists ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  reveals.forEach(function (el, i) {
    var siblings = el.parentNode.querySelectorAll(':scope > .reveal');
    var idx = Array.prototype.indexOf.call(siblings, el);
    el.style.setProperty('--d', (0.9 + Math.min(idx, 8) * 0.06).toFixed(2) + 's');
  });
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    // after the first screen, later items shouldn't wait for the hero
    setTimeout(function () { reveals.forEach(function (el) { el.style.setProperty('--d', '0s'); }); }, 2200);
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Share ---------- */
  var share = document.getElementById('share');
  var toast = document.getElementById('toast');
  function show(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(show.t);
    show.t = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }
  if (share) share.addEventListener('click', function () {
    var data = { title: 'Colart Digital Marketing Agency', url: location.href.split('?')[0] };
    if (navigator.share) navigator.share(data).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(data.url).then(function () { show('Link copied'); }, function () { show(data.url); });
    else show(data.url);
  });
})();
