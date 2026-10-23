/* ==========================================================
   quiz.js — เกมทดสอบความรู้ 10 ข้อ (ใช้ในหน้า application.html)
   ฟีเจอร์: คะแนนทันที, เฉลยพร้อมคำอธิบาย, progress bar,
            ระดับ/เหรียญรางวัล, ข้อความให้กำลังใจ, เริ่มใหม่
   วิธีเพิ่มข้อ: เพิ่มออบเจ็กต์ใน QUESTIONS (answer = ลำดับตัวเลือกที่ถูก เริ่มที่ 0)
   ========================================================== */
(function () {
  'use strict';

  var QUESTIONS = [
    { page: 1, pageLabel: 'หน้า 1 · หน้าแรก', href: 'index.html',
      q: 'ข้อใดเป็นลักษณะเด่นของผู้เรียนวัยผู้ใหญ่เมื่อเทียบกับเด็ก?',
      options: ['ต้องการให้ผู้สอนกำหนดทุกอย่างให้', 'เรียนเพื่อเตรียมตัวไว้ใช้ในอนาคตไกล ๆ เท่านั้น', 'มีประสบการณ์เดิมและต้องการเห็นความเชื่อมโยงกับชีวิตจริง', 'เรียนได้ดีที่สุดเมื่อฟังบรรยายอย่างเดียว'],
      answer: 2,
      explain: 'ผู้ใหญ่นำประสบการณ์เข้ามาในห้องเรียนและอยากรู้ว่าสิ่งที่เรียนใช้ได้จริงอย่างไร' },
    { page: 2, pageLabel: 'หน้า 2 · หลักการสำคัญ', href: 'principles.html',
      q: 'หลักการ “Need to Know” แนะนำให้ผู้สอนทำสิ่งใดเป็นอย่างแรก?',
      options: ['อธิบายว่าเรียนไปทำไมและได้ประโยชน์อะไร', 'ให้ทำข้อสอบก่อนเรียน', 'เริ่มด้วยทฤษฎีที่ยากที่สุด', 'แจกการบ้านล่วงหน้าทั้งหมด'],
      answer: 0,
      explain: 'ผู้ใหญ่ต้องเห็นเหตุผลและประโยชน์ก่อน จึงจะลงแรงเรียนอย่างเต็มที่' },
    { page: 2, pageLabel: 'หน้า 2 · หลักการสำคัญ', href: 'principles.html',
      q: 'ผู้ใหญ่มี “Orientation to Learning” แบบใด?',
      options: ['เรียนตามลำดับเนื้อหาในตำราเท่านั้น', 'เรียนเพื่อสะสมคะแนนสูงสุด', 'ชอบท่องจำมากกว่าลงมือทำ', 'ยึดปัญหาหรือภารกิจจริงเป็นศูนย์กลาง'],
      answer: 3,
      explain: 'ผู้ใหญ่ชอบเรียนผ่านปัญหาและภารกิจที่นำไปใช้แก้ไขสถานการณ์จริงได้' },
    { page: 2, pageLabel: 'หน้า 2 · หลักการสำคัญ', href: 'principles.html',
      q: 'แรงจูงใจแบบใดที่ Knowles ถือว่ามีพลังต่อการเรียนของผู้ใหญ่มาก?',
      options: ['แรงจูงใจภายนอกอย่างเดียว เช่น รางวัล', 'แรงจูงใจภายใน เช่น ความพึงพอใจและการพัฒนาตนเอง', 'แรงกดดันจากผู้สอน', 'การแข่งขันกับเพื่อนเท่านั้น'],
      answer: 1,
      explain: 'แรงจูงใจภายนอกยังสำคัญ แต่แรงจูงใจภายในอย่างความภูมิใจและความอยากพัฒนาตนเองช่วยให้เรียนต่อเนื่อง' },
    { page: 3, pageLabel: 'หน้า 3 · เทคนิคการสอน', href: 'strategies.html',
      q: 'บทบาทของผู้สอนแบบ Facilitator คือข้อใด?',
      options: ['บรรยายให้จบตามเวลาโดยไม่รับคำถาม', 'ตรวจสอบและลงโทษผู้ที่ตอบผิด', 'ออกแบบกิจกรรม ตั้งคำถาม และอำนวยให้ผู้เรียนเรียนรู้ด้วยตนเอง', 'ให้ผู้เรียนเรียนเองทั้งหมดโดยไม่เข้าไปเกี่ยวข้อง'],
      answer: 2,
      explain: 'Facilitator ไม่ได้สอนน้อยลง แต่เปลี่ยนจากผู้บรรยายเป็นผู้ออกแบบและหนุนเสริมการเรียนรู้' },
    { page: 3, pageLabel: 'หน้า 3 · เทคนิคการสอน', href: 'strategies.html',
      q: 'กิจกรรมใดจัดเป็น Case-based learning?',
      options: ['แจกสถานการณ์จริง 1 หน้า ให้กลุ่มวิเคราะห์ปัญหาและทางเลือก', 'ให้ท่องศัพท์ 50 คำ', 'ดูวิดีโอ 1 ชั่วโมงแล้วจบ', 'ทำข้อสอบปรนัยรายบุคคล'],
      answer: 0,
      explain: 'Case-based คือการวิเคราะห์กรณีศึกษาจริงหรือจำลอง เพื่อฝึกตัดสินใจ' },
    { page: 3, pageLabel: 'หน้า 3 · เทคนิคการสอน', href: 'strategies.html',
      q: 'ตามวงจร Experiential learning ของ Kolb ลำดับใดถูกต้อง?',
      options: ['สรุปแนวคิด → ท่องจำ → สอบ → จบ', 'ประสบการณ์ → สะท้อนคิด → สรุปแนวคิด → ทดลองใช้', 'ทดลองใช้ → จบ → ประเมิน → ลืม', 'อ่านตำรา → สอบ → ประสบการณ์ → จบ'],
      answer: 1,
      explain: 'วงจรของ Kolb คือ ประสบการณ์ตรง สะท้อนคิด สร้างแนวคิด และนำไปทดลองใช้ แล้ววนซ้ำ' },
    { page: 4, pageLabel: 'หน้า 4 · ARCS Model', href: 'models.html',
      q: 'ผู้สอนเปิดบทเรียนด้วยปริศนาหรือคำถามท้าทายเพื่อให้ผู้เรียนอยากรู้ เป็นการใช้องค์ประกอบใดของ ARCS?',
      options: ['Relevance', 'Confidence', 'Satisfaction', 'Attention'],
      answer: 3,
      explain: 'การกระตุ้นความอยากรู้ด้วยคำถามหรือปัญหาคือ Inquiry arousal ซึ่งอยู่ใน Attention' },
    { page: 4, pageLabel: 'หน้า 4 · ARCS Model', href: 'models.html',
      q: 'ผู้เรียนกังวลว่าตนเองจะทำไม่ได้ ผู้สอนควรเสริมองค์ประกอบใดเป็นพิเศษ?',
      options: ['Confidence ด้วยงานระดับง่ายไปยาก และเกณฑ์ที่ชัดเจน', 'Attention ด้วยการเปลี่ยนสีสไลด์', 'Satisfaction ด้วยการเลิกเร็ว', 'Relevance ด้วยการตัดเนื้อหา'],
      answer: 0,
      explain: 'Confidence ช่วยให้ผู้เรียนเห็นหนทางสู่ความสำเร็จ ผ่านเกณฑ์ที่ชัดเจนและโอกาสประสบความสำเร็จเป็นขั้น ๆ' },
    { page: 5, pageLabel: 'หน้า 5 · วัฒนธรรมการเรียนรู้ตลอดชีวิต', href: 'application.html',
      q: 'แนวคิดใดสอดคล้องกับการสร้างวัฒนธรรมการเรียนรู้ตลอดชีวิตมากที่สุด?',
      options: ['การเรียนรู้เกิดเฉพาะในห้องเรียนเท่านั้น', 'การเรียนรู้จบเมื่อได้วุฒิการศึกษา', 'ส่งเสริมให้เรียนรู้ต่อเนื่องในหลายบริบท ทั้งในระบบ นอกระบบ และตามอัธยาศัย', 'ให้เฉพาะผู้บริหารมีสิทธิ์เรียนรู้'],
      answer: 2,
      explain: 'วัฒนธรรมการเรียนรู้ตลอดชีวิตหมายถึงการเรียนรู้ที่เกิดได้ทุกที่ ทุกวัย และต่อเนื่องตลอดชีวิต' }
  ];

  var LEVELS = [
    { min: 9, name: 'ปรมาจารย์ Facilitator', color: '#ffc65c', msg: 'ยอดเยี่ยมมาก! คุณพร้อมออกแบบการเรียนรู้สำหรับผู้ใหญ่แล้ว ลองนำ ARCS ไปใช้ในกิจกรรมถัดไปได้เลย' },
    { min: 7, name: 'นักออกแบบการเรียนรู้', color: '#5aa7f2', msg: 'เก่งมาก! เข้าใจหลักการค่อนข้างครบ ทบทวนข้อที่พลาดอีกนิด คุณจะไปได้ไกลกว่านี้' },
    { min: 5, name: 'ผู้เรียนรู้ที่กำลังเติบโต', color: '#9cc8f7', msg: 'ทำได้ดีแล้ว! คุณอยู่ครึ่งทางของเส้นทาง ลองกลับไปอ่านหน้าที่พลาดแล้วทำใหม่อีกรอบ' },
    { min: 0, name: 'นักสำรวจผู้กระหายความรู้', color: '#cfe5ff', msg: 'ไม่เป็นไร ทุกคนเริ่มต้นจากตรงนี้ การเรียนรู้คือการเดินทาง ลองทบทวนบทเรียนแล้วกลับมาท้าทายอีกครั้ง' }
  ];

  var app = document.getElementById('quiz-app');
  if (!app) return;

  var idx = 0, score = 0, answered = false, missed = [];
  var LETTERS = ['ก', 'ข', 'ค', 'ง'];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- หน้าเริ่มต้น ---------- */
  function renderStart() {
    app.innerHTML =
      '<div class="q-center">' +
        '<div class="icon-wrap" style="margin-inline:auto" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M24 6l5 12 13 1-10 9 3 13-11-7-11 7 3-13-10-9 13-1z"/></svg></div>' +
        '<h3 style="font-size:1.5rem">พร้อมท้าทายความรู้แล้วหรือยัง?</h3>' +
        '<p>แบบทดสอบ ' + QUESTIONS.length + ' ข้อ ครอบคลุมเนื้อหาทั้ง 5 หน้า ตอบแล้วทราบผลทันที พร้อมคำอธิบาย และเก็บเหรียญตามคะแนนได้</p>' +
        '<button class="btn btn-primary" id="q-start" type="button">เริ่มเลย →</button>' +
      '</div>';
    document.getElementById('q-start').addEventListener('click', function () {
      idx = 0; score = 0; missed = []; renderQuestion();
    });
  }

  /* ---------- แสดงคำถาม ---------- */
  function renderQuestion() {
    var q = QUESTIONS[idx];
    answered = false;
    var pct = (idx / QUESTIONS.length) * 100;
    var opts = q.options.map(function (o, i) {
      return '<button type="button" class="q-option" data-i="' + i + '">' +
               '<span class="letter" aria-hidden="true">' + LETTERS[i] + '</span><span>' + esc(o) + '</span></button>';
    }).join('');

    app.innerHTML =
      '<div class="q-top">' +
        '<span>ข้อ ' + (idx + 1) + ' / ' + QUESTIONS.length + '</span>' +
        '<span aria-live="polite">⭐ คะแนน: ' + score + '</span>' +
      '</div>' +
      '<div class="q-progress" role="progressbar" aria-label="ความคืบหน้าแบบทดสอบ" aria-valuemin="0" aria-valuemax="' + QUESTIONS.length + '" aria-valuenow="' + idx + '"><span style="width:' + pct + '%"></span></div>' +
      '<span class="pill q-tag">' + esc(q.pageLabel) + '</span>' +
      '<h3 class="q-text" id="q-title">' + esc(q.q) + '</h3>' +
      '<div class="q-options" role="group" aria-labelledby="q-title">' + opts + '</div>' +
      '<div class="q-feedback" id="q-feedback" hidden role="status" aria-live="polite"></div>' +
      '<div class="q-next" id="q-next" hidden></div>';

    app.querySelectorAll('.q-option').forEach(function (btn) {
      btn.addEventListener('click', function () { choose(parseInt(btn.getAttribute('data-i'), 10)); });
    });
  }

  /* ---------- ตรวจคำตอบ ---------- */
  function choose(i) {
    if (answered) return;
    answered = true;
    var q = QUESTIONS[idx];
    var ok = i === q.answer;
    if (ok) score++; else missed.push(q);

    app.querySelectorAll('.q-option').forEach(function (b, k) {
      b.disabled = true;
      if (k === q.answer) b.classList.add('correct');
      if (k === i && !ok) b.classList.add('wrong');
    });

    var fb = document.getElementById('q-feedback');
    fb.className = 'q-feedback ' + (ok ? 'ok' : 'no');
    fb.innerHTML = '<strong>' + (ok ? '🎉 ถูกต้อง!' : '💭 ยังไม่ถูก — คำตอบที่ถูกคือข้อ ' + LETTERS[q.answer]) + '</strong><br>' + esc(q.explain);
    fb.hidden = false;

    // อัปเดตคะแนนและความคืบหน้าทันที
    app.querySelector('.q-top span[aria-live]').textContent = '⭐ คะแนน: ' + score;
    var bar = app.querySelector('.q-progress');
    bar.setAttribute('aria-valuenow', idx + 1);
    bar.firstChild.style.width = ((idx + 1) / QUESTIONS.length * 100) + '%';

    var last = idx === QUESTIONS.length - 1;
    var nx = document.getElementById('q-next');
    nx.innerHTML = '<button type="button" class="btn btn-primary" id="q-next-btn">' + (last ? 'ดูผลคะแนน 🏅' : 'ข้อถัดไป →') + '</button>';
    nx.hidden = false;
    var nb = document.getElementById('q-next-btn');
    nb.addEventListener('click', function () {
      if (last) renderResult(); else { idx++; renderQuestion(); focusTitle(); }
    });
    nb.focus();
  }

  function focusTitle() {
    var t = document.getElementById('q-title');
    if (t) { t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); }
  }

  /* ---------- สรุปผล ---------- */
  function renderResult() {
    var level = LEVELS.filter(function (l) { return score >= l.min; })[0];
    var seen = {}, review = '';
    missed.forEach(function (m) {
      if (!seen[m.pageLabel]) {
        seen[m.pageLabel] = true;
        review += '<li><a href="' + m.href + '">' + esc(m.pageLabel) + '</a></li>';
      }
    });
    app.innerHTML =
      '<div class="q-center">' +
        '<svg class="medal" viewBox="0 0 120 140" role="img" aria-label="เหรียญระดับ ' + esc(level.name) + '">' +
          '<path d="M30 0h22l8 40H38z" fill="#2169bd"/><path d="M90 0H68l-8 40h22z" fill="#5aa7f2"/>' +
          '<circle cx="60" cy="86" r="42" fill="' + level.color + '" stroke="#16335c" stroke-width="4"/>' +
          '<circle cx="60" cy="86" r="30" fill="none" stroke="#16335c" stroke-width="3" stroke-dasharray="4 5"/>' +
          '<text x="60" y="96" text-anchor="middle" font-family="Prompt, sans-serif" font-size="30" font-weight="600" fill="#16335c">' + score + '</text>' +
        '</svg>' +
        '<div class="q-progress" style="max-width:360px;margin:18px auto" role="progressbar" aria-valuemin="0" aria-valuemax="' + QUESTIONS.length + '" aria-valuenow="' + QUESTIONS.length + '"><span style="width:100%"></span></div>' +
        '<div class="level-name">' + esc(level.name) + '</div>' +
        '<div class="q-score-big">' + score + '<small> / ' + QUESTIONS.length + '</small></div>' +
        '<p>' + esc(level.msg) + '</p>' +
        (missed.length
          ? '<div class="review"><h3>ลองกลับไปทบทวนหน้าเหล่านี้</h3><ul>' + review + '</ul></div>'
          : '<div class="review"><h3>🌟 ตอบถูกทุกข้อ!</h3><p style="margin:0">ไม่มีหน้าที่ต้องทบทวนเลย</p></div>') +
        '<button class="btn btn-primary" id="q-restart" type="button">↺ เริ่มใหม่</button>' +
      '</div>';
    var r = document.getElementById('q-restart');
    r.addEventListener('click', function () { idx = 0; score = 0; missed = []; renderQuestion(); focusTitle(); });
    r.focus({ preventScroll: true });
  }

  renderStart();
})();
