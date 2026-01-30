(function () {

  var ENTER_OFFSET = 120; // px sebelum masuk viewport
  var EXIT_OFFSET  = 150;  // px setelah lewat atas
  var EXIT_DELAY   = 200; // ms overlap blur + fade

  function handleReveal() {
    var items = document.querySelectorAll('.dg');

    items.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      var vh   = window.innerHeight;

      var enterPoint = rect.top < vh - ENTER_OFFSET;
      var exitPoint  = rect.bottom < EXIT_OFFSET;

      // === MASUK VIEW ===
      if (enterPoint && rect.bottom > EXIT_OFFSET) {
        el.classList.add('active');
        el.classList.remove('out');
        el._dgExited = false;
        return;
      }

      // === KELUAR KE ATAS (EXIT) ===
      if (exitPoint && el.classList.contains('do') && el.classList.contains('active')) {
        if (!el._dgExited) {
          el._dgExited = true;
          el.classList.add('out');

          setTimeout(function () {
            el.classList.remove('active');
          }, EXIT_DELAY);
        }
        return;
      }

      // === RESET (SIAP MASUK LAGI) ===
      if (!enterPoint) {
        el.classList.remove('active', 'out');
        el._dgExited = false;
      }
    });
  }

  window.addEventListener('scroll', handleReveal);
  window.addEventListener('load', handleReveal);

})();
