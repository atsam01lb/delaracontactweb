/* Joseph Farah — Links: share button */
(function () {
  var btn = document.getElementById('share');
  var toast = document.getElementById('toast');
  if (!btn) return;

  function show(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(show.t);
    show.t = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  btn.addEventListener('click', function () {
    var data = { title: 'Joseph Farah', url: location.href.split('?')[0] };
    if (navigator.share) {
      navigator.share(data).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(data.url).then(function () { show('Link copied'); }, function () { show(data.url); });
    } else {
      show(data.url);
    }
  });
})();
