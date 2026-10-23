/* ==========================================================
   main.js — สคริปต์กลางของเว็บไซต์ทุกหน้า
   หน้าที่: 1) สร้าง Header/เมนู/แถบความคืบหน้า  2) ปุ่มย้อนกลับ-ถัดไป
            3) Footer  4) Fade-in เมื่อเลื่อนถึง  5) Tabs (หน้า ARCS)
   วิธีทำงาน: แต่ละหน้ากำหนด <body data-page="1..5"> แล้วสคริปต์จะเติมส่วนกลางให้
   ========================================================== */
(function () {
  'use strict';

  // รายการหน้าทั้งหมด — แก้ชื่อ/ลิงก์ที่นี่ที่เดียว
  var PAGES = [
    { href: 'index.html',       label: 'หน้าแรก' },
    { href: 'principles.html',  label: 'หลักการสำคัญ' },
    { href: 'strategies.html',  label: 'เทคนิคการสอน' },
    { href: 'models.html',      label: 'ARCS Model' },
    { href: 'application.html', label: 'สรุป & เกมทดสอบ' }
  ];
  var current = parseInt(document.body.getAttribute('data-page'), 10) || 1;

  /* ---------- Header ---------- */
  var headerHost = document.getElementById('site-header');
  if (headerHost) {
    var items = PAGES.map(function (p, i) {
      var cur = (i + 1 === current) ? ' aria-current="page"' : '';
      return '<li><a href="' + p.href + '"' + cur + '>' + p.label + '</a></li>';
    }).join('');
    var pct = (current / PAGES.length) * 100;
    headerHost.innerHTML =
      '<header class="site-header">' +
        '<div class="container nav">' +
          '<a class="brand" href="index.html" aria-label="กลับหน้าแรก">' +
            '<svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true">' +
              '<rect width="40" height="40" rx="12" fill="#2f86e0"/>' +
              '<path d="M20 9a8 8 0 0 0-4.5 14.6c.8.6 1.2 1.4 1.2 2.4h6.6c0-1 .4-1.8 1.2-2.4A8 8 0 0 0 20 9z" fill="#fff"/>' +
              '<rect x="16.8" y="28" width="6.4" height="2.4" rx="1.2" fill="#ffc65c"/>' +
            '</svg>' +
            '<span>การเรียนรู้ของผู้ใหญ่<small>Adult Learning Psychology</small></span>' +
          '</a>' +
          '<button class="nav-toggle" aria-expanded="false" aria-controls="nav-list">เมนู</button>' +
          '<nav aria-label="เมนูหลัก"><ul class="nav-list" id="nav-list">' + items + '</ul></nav>' +
        '</div>' +
        '<div class="page-progress"><div class="container">' +
          '<span>หน้า ' + current + ' จาก ' + PAGES.length + '</span>' +
          '<div class="bar" role="progressbar" aria-valuemin="1" aria-valuemax="' + PAGES.length +
            '" aria-valuenow="' + current + '" aria-label="ความคืบหน้าของบทเรียน"><span style="width:' + pct + '%"></span></div>' +
          '<span>' + PAGES[current - 1].label + '</span>' +
        '</div></div>' +
      '</header>';

    // เมนูมือถือ
    var toggle = headerHost.querySelector('.nav-toggle');
    var list = headerHost.querySelector('.nav-list');
    toggle.addEventListener('click', function () {
      var open = list.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && list.classList.contains('open')) {
        list.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- ปุ่ม ย้อนกลับ / ถัดไป ---------- */
  var pagerHost = document.getElementById('site-pager');
  if (pagerHost) {
    var prev = PAGES[current - 2], next = PAGES[current];
    pagerHost.innerHTML =
      '<nav class="pager" aria-label="เปลี่ยนหน้า"><div class="container">' +
        (prev ? '<a class="btn btn-ghost" href="' + prev.href + '">← ย้อนกลับ: ' + prev.label + '</a>' : '<span></span>') +
        (next ? '<a class="btn btn-primary" href="' + next.href + '">ถัดไป: ' + next.label + ' →</a>'
              : '<a class="btn btn-ghost" href="index.html">↺ กลับไปเริ่มต้นใหม่</a>') +
      '</div></nav>';
  }

  /* ---------- Footer ---------- */
  var footerHost = document.getElementById('site-footer');
  if (footerHost) {
    footerHost.innerHTML =
      '<footer class="site-footer"><div class="container">' +
        '<div><strong>จิตวิทยาในการจัดการเรียนรู้ของผู้ใหญ่</strong><br>สื่อการเรียนรู้ออนไลน์เพื่อการศึกษา</div>' +
        '<ul aria-label="สารบัญ">' +
          PAGES.map(function (p) { return '<li><a href="' + p.href + '">' + p.label + '</a></li>'; }).join('') +
        '</ul>' +
      '</div></footer>';
  }

  /* ---------- Fade-in เมื่อเลื่อนมาถึง ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Tabs (ใช้ในหน้า ARCS) ----------
     โครงสร้าง: [data-tabs] > [role=tablist] > button[role=tab][aria-controls]
                และ [role=tabpanel] ที่มี id ตรงกัน                         */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(group.querySelectorAll('[role="tabpanel"]'));

    function activate(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (p) { p.hidden = p.id !== tab.getAttribute('aria-controls'); });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') n = tabs[0];
        if (e.key === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); activate(n, true); }
      });
    });
    // วงแหวนในแผนภาพ ARCS กดแล้วสลับแท็บได้ (ถ้ามี data-goto)
    document.querySelectorAll('[data-goto]').forEach(function (el) {
      function go() {
        var t = group.querySelector('[aria-controls="' + el.getAttribute('data-goto') + '"]');
        if (t) { activate(t, false); group.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
      el.addEventListener('click', go);
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    });
  });
})();
