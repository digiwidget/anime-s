(function () {

  var ENTER_OFFSET = 120; 
  var EXIT_OFFSET  = 150;  
  var EXIT_DELAY   = 200;

  function handleReveal() {
    var items = document.querySelectorAll('.dg');

    items.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      var vh   = window.innerHeight;

      var enterPoint = rect.top < vh - ENTER_OFFSET;
      var exitPoint  = rect.bottom < EXIT_OFFSET;

      if (enterPoint && rect.bottom > EXIT_OFFSET) {
        el.classList.add('active');
        el.classList.remove('out');
        el._dgExited = false;
        return;
      }

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

      if (!enterPoint) {
        el.classList.remove('active', 'out');
        el._dgExited = false;
      }
    });
  }

  window.addEventListener('scroll', handleReveal);
  window.addEventListener('load', handleReveal);

})();
