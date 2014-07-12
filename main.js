(function() {
  var SCROLL_TIME = 200;

  var mark = null;
  var from = null;

  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && !event.shiftKey && event.keyCode == 32) {
      event.preventDefault();
      if (document.body)
        setMark();
    }

    if (event.ctrlKey && event.shiftKey && event.keyCode == 32) {
      event.preventDefault();
      if (mark && document.body)
        goToMark();
    }
  });

  function setMark() {
    mark = document.body.scrollTop;

    var feedback = document.createElement('div');
    feedback.innerText = 'marked';

    feedback.style.position = 'fixed';
    feedback.style.top = 0;
    feedback.style.width = '100%';
    feedback.style.padding = '2pt 0';

    feedback.style.color = '#fff'
    feedback.style.backgroundColor = '#a00';;
    feedback.style.opacity = 1;
    feedback.style.textAlign = 'center';
    feedback.style.fontFamily = 'Verdana, sans-serif';
    feedback.style.fontSize = '10pt';
    document.body.appendChild(feedback);

    setTimeout(function() {
      feedback.style.transitionProperty = 'opacity';
      feedback.style.transitionDuration = '1s';
      feedback.style.transitionTimingFunction = 'ease';
      feedback.style.opacity = 0;

      setTimeout(function() {
        feedback.parentNode.removeChild(feedback);
      }, 1500);
    }, 1000);
  }

  function goToMark() {
    from = document.body.scrollTop;
    var t0 = new Date().getTime();
    var step = function() {
      var t = (new Date().getTime() - t0) / SCROLL_TIME;
      if (t > 1) {
        document.body.scrollTop = mark;
        from = null;
      } else {
        document.body.scrollTop = from + t*(mark - from);
        setTimeout(step, 30);
      }
    };
    setTimeout(step, 30);
  }
})();
