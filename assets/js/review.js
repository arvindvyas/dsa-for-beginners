(function () {
  var KEY = 'dsa-review';
  var DAYS = [1, 3, 7, 21];

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }
  function today() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
  function addDays(iso, days) {
    var p = iso.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2] + days);
  }
  function isoToday() {
    var d = today();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
  function dueDate(item) { return addDays(item.start, DAYS[item.step]); }
  function isDue(item) { return item.step < DAYS.length && dueDate(item) <= today(); }
  function niceDate(d) { return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }); }

  function render(box) {
    var id = box.dataset.id;
    var data = load();
    var item = data[id];
    var html;
    box.classList.remove('due');
    if (!item) {
      html = '<strong class="title">Remember this for good</strong>' +
        '<p>People forget most of what they read within days. A short recall on <b>day 1, 3, 7 and 21</b> fixes that. ' +
        'Click below and this page will tell you when each review is due. It is saved only in this browser.</p>' +
        '<button data-act="start">I learned this today</button>';
    } else if (item.step >= DAYS.length) {
      html = '<strong class="title">All 4 reviews done</strong><p>This page is in your long-term memory now. Come back any time.</p>' +
        '<button class="link" data-act="reset">Start over</button>';
    } else if (isDue(item)) {
      box.classList.add('due');
      html = '<strong class="title">Review ' + (item.step + 1) + ' of 4 is due</strong>' +
        '<p>Answer the <a href="#test-yourself">Test yourself</a> questions <b>from memory</b> before opening them. Then click below.</p>' +
        '<button data-act="done">I did my review</button><button class="link" data-act="reset">Start over</button>';
    } else {
      var d = dueDate(item);
      var left = Math.round((d - today()) / 86400000);
      html = '<strong class="title">Next review: ' + niceDate(d) + ' (in ' + left + (left === 1 ? ' day' : ' days') + ')</strong>' +
        '<p>Reviews done: ' + item.step + ' of 4. The home page will show this page when it is due.</p>' +
        '<button class="link" data-act="reset">Start over</button>';
    }
    box.innerHTML = html;
  }

  document.querySelectorAll('.review[data-id]').forEach(function (box) {
    box.addEventListener('click', function (e) {
      var act = e.target.dataset && e.target.dataset.act;
      if (!act) return;
      var data = load();
      var id = box.dataset.id;
      if (act === 'start') data[id] = { title: box.dataset.title, url: location.pathname, start: isoToday(), step: 0 };
      if (act === 'done' && data[id]) data[id].step += 1;
      if (act === 'reset') delete data[id];
      save(data);
      render(box);
    });
    render(box);
  });

  var list = document.getElementById('review-due');
  if (list) {
    var data = load();
    var due = Object.keys(data).filter(function (k) { return isDue(data[k]); });
    if (due.length) {
      list.innerHTML = '<blockquote class="try"><p><b>Due for review today:</b></p><ul>' +
        due.map(function (k) { return '<li><a href="' + data[k].url + '#test-yourself">' + data[k].title + '</a></li>'; }).join('') +
        '</ul></blockquote>';
    }
  }
})();
