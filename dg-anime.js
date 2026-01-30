(function () {

  var ENTER_OFFSET = 120; // px sebelum masuk viewport baru
  var EXIT_OFFSET  = 80;  // px dari top untuk exit
  var EXIT_DELAY   = 180; // ms overlap animasi

  var lastScrollY = window.scrollY;

  function handleDG() {
    var items = document.querySelectorAll('.dg');
    var vh = window.innerHeight;
    var currentScroll = window.scrollY;
    var scrollingUp = currentScroll < lastScrollY;

    items.forEach(function(el) {
      var rect = el.getBoundingClientRect();

      var enterFromBottom = rect.top < vh - ENTER_OFFSET;
      var stillVisible    = rect.bottom > EXIT_OFFSET;
      var exitToTop       = rect.bottom < EXIT_OFFSET;

      // ===== MASUK VIEW (DARI BAWAH ATAU ATAS) =====
      if (enterFromBottom && stillVisible) {
        el.classList.add('active');
        el.classList.remove('out');
        el._dgExited = false;
        return;
      }

      // ===== EXIT KE ATAS (KHUSUS .do & SCROLL UP) =====
      if (
        scrollingUp &&
        exitToTop &&
        el.classList.contains('do') &&
        el.classList.contains('active') &&
        !el._dgExited
      ) {
        el._dgExited = true;
        el.classList.add('out');

        setTimeout(function () {
          el.classList.remove('active');
        }, EXIT_DELAY);

        return;
      }

      // ===== RESET (SIAP MASUK LAGI) =====
      if (!enterFromBottom) {
        el.classList.remove('active', 'out');
        el._dgExited = false;
      }
    });

    lastScrollY = currentScroll;
  }

  window.addEventListener('scroll', handleDG);
  window.addEventListener('load', handleDG);

})();
