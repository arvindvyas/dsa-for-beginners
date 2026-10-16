(function () {
  var box = document.getElementById('growth');
  if (!box) return;

  var STEPS_PER_SECOND = 1e8;
  var rows = [
    { name: 'O(1)', log10: function () { return 0; } },
    { name: 'O(log n)', log10: function (n) { return Math.log10(Math.max(1, Math.log2(n))); } },
    { name: 'O(n)', log10: function (n) { return Math.log10(n); } },
    { name: 'O(n log n)', log10: function (n) { return Math.log10(n * Math.max(1, Math.log2(n))); } },
    { name: 'O(n²)', log10: function (n) { return 2 * Math.log10(n); } },
    { name: 'O(2ⁿ)', log10: function (n) { return n * Math.log10(2); } }
  ];

  function words(log10) {
    if (log10 < 6) return Math.round(Math.pow(10, log10)).toLocaleString('en-US');
    var names = [[18, 'quintillion'], [15, 'quadrillion'], [12, 'trillion'], [9, 'billion'], [6, 'million']];
    if (log10 >= 21) return '10^' + Math.floor(log10) + ' (a number with ' + (Math.floor(log10) + 1).toLocaleString('en-US') + ' digits)';
    for (var i = 0; i < names.length; i++) {
      if (log10 >= names[i][0]) {
        var v = Math.pow(10, log10 - names[i][0]);
        return (v < 10 ? v.toFixed(1) : Math.round(v)) + ' ' + names[i][1];
      }
    }
  }

  function time(log10) {
    var s = Math.pow(10, log10) / STEPS_PER_SECOND;
    if (log10 - 8 > 17.6) return 'longer than the age of the universe';
    if (s < 1e-6) return 'less than a microsecond';
    if (s < 1e-3) return Math.round(s * 1e6) + ' microseconds';
    if (s < 1) return Math.round(s * 1e3) + ' ms';
    if (s < 60) return s.toFixed(1) + ' seconds';
    if (s < 3600) return Math.round(s / 60) + ' minutes';
    if (s < 86400) return (s / 3600).toFixed(1) + ' hours';
    if (s < 3.15e7) return Math.round(s / 86400) + ' days';
    var y = s / 3.15e7;
    return (y < 1e6 ? Math.round(y).toLocaleString('en-US') : words(Math.log10(y))) + ' years';
  }

  function chip(log10) {
    var s = Math.pow(10, log10) / STEPS_PER_SECOND;
    if (s < 0.1) return '<span class="chip fast">instant</span>';
    if (s < 2) return '<span class="chip ok">OK</span>';
    return '<span class="chip slow">too slow</span>';
  }

  var presets = [10, 30, 1000, 100000, 1000000];
  box.innerHTML =
    '<label for="growth-n">Input size n = <span id="growth-value"></span></label>' +
    '<input type="range" id="growth-n" min="0" max="60" step="1" value="30">' +
    '<div class="presets">' + presets.map(function (p) { return '<button type="button" data-n="' + p + '">n = ' + p.toLocaleString('en-US') + '</button>'; }).join('') + '</div>' +
    '<table><thead><tr><th>Complexity</th><th>Steps</th><th>Time at 10⁸ steps/s</th><th></th></tr></thead><tbody></tbody></table>' +
    '<p class="note">10⁸ simple steps per second is a rough speed for one CPU core. Green means it runs in under 0.1 s.</p>';

  var slider = box.querySelector('#growth-n');
  var label = box.querySelector('#growth-value');
  var body = box.querySelector('tbody');

  function nFromSlider() { return Math.max(1, Math.round(Math.pow(10, slider.value / 10))); }

  function draw() {
    var n = nFromSlider();
    label.textContent = n.toLocaleString('en-US');
    body.innerHTML = rows.map(function (r) {
      var l = r.log10(n);
      return '<tr><td>' + r.name + '</td><td>' + words(l) + '</td><td>' + time(l) + '</td><td>' + chip(l) + '</td></tr>';
    }).join('');
  }

  slider.addEventListener('input', draw);
  box.querySelectorAll('.presets button').forEach(function (b) {
    b.addEventListener('click', function () {
      slider.value = Math.round(10 * Math.log10(+b.dataset.n));
      draw();
    });
  });
  draw();
})();
