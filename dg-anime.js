(function () {

  var ENTER_OFFSET = 120;
  var EXIT_OFFSET  = 80;
  var EXIT_DELAY   = 200;

  function handleReveal() {
    var items = document.querySelectorAll('.dg');

    items.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      var vh   = window.innerHeight;

      var isEntering = rect.top < vh - ENTER_OFFSET && rect.bottom > EXIT_OFFSET;
      var isExitingTop = rect.top < -EXIT_OFFSET;

      // === MASUK VIEW ===
      if (isEntering) {
        el.classList.add('active');
        el.classList.remove('out');
        el._dgExited = false;
        return;
      }

      // === EXIT KE ATAS ===
      if (isExitingTop && el.classList.contains('do') && el.classList.contains('active')) {
        if (!el._dgExited) {
          el._dgExited = true;
          el.classList.add('out');

          setTimeout(function () {
            el.classList.remove('active');
          }, EXIT_DELAY);
        }
        return;
      }

      // === RESET TOTAL ===
      if (rect.top > vh) {
        el.classList.remove('active', 'out');
        el._dgExited = false;
      }
    });
  }

  window.addEventListener('scroll', handleReveal);
  window.addEventListener('load', handleReveal);

})();
