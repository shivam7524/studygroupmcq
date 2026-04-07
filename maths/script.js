// ═══════════════════════════════════════════════════════════
// ✏️  YAHAN QUESTIONS LIKHO — Roz yahi badlo
// ═══════════════════════════════════════════════════════════

const QUIZ_CONFIG = {
  titleEn:  "Intro to IT Systems",
  titleHi:  "सूचना प्रौद्योगिकी प्रणाली",
  code:     "2.3 · IT-SYS",
  pill:     "UNIT 33-36 · IT"
};

// Questions Array — jitne chahiye utne add karo
const questions = [
  {
    num: 1,
    hindi: "यहाँ प्रश्न 1 लिखें?",
    english: "Write question 1 here?",
    options: ["A) Option 1","B) Option 2","C) Option 3","D) Option 4"],
    answer: 0,   // 0=A  1=B  2=C  3=D
    note: "हल: यहाँ explanation लिखें"
  },
  {
    num: 2,
    hindi: "यहाँ प्रश्न 2 लिखें?",
    english: "Write question 2 here?",
    options: ["A) Option 1","B) Option 2","C) Option 3","D) Option 4"],
    answer: 1,
    note: "हल: यहाँ explanation लिखें"
  }
];

// Sections — questions ko groups mein divide karta hai
const sections = [
  { label: "प्रश्न | Questions (IT Systems)", start: 0, end: questions.length }
];

// ═══════════════════════════════════════════════════════════
// ⚠️  NEECHE MAT CHHUO | DON'T EDIT BELOW
// ═══════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", function () {

  // ── SAFE CANVAS FIX (HTML me canvas na ho tab bhi error nahi aayega)
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const COUNT = 55;
    let particles = [];
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random()*W, y: Math.random()*H,
        r: 0.8 + Math.random()*2,
        vx: (Math.random()-.5)*.38, vy: (Math.random()-.5)*.38,
        alpha: 0.15 + Math.random()*.5,
        pulse: Math.random()*Math.PI*2,
        ps: 0.008 + Math.random()*.012
      });
    }

    function drawParticles() {
      ctx.clearRect(0,0,W,H);
      const isLight = document.body.classList.contains('light');
      const rgb = isLight ? '37,99,235' : '99,179,237';
      const maxDist = 115;

      particles.forEach(p => {
        p.x+=p.vx; p.y+=p.vy; p.pulse+=p.ps;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0;
        if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        const a = p.alpha*(0.55+0.45*Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${rgb},${a})`;
        ctx.fill();
      });

      for(let i=0;i<COUNT;i++) {
        for(let j=i+1;j<COUNT;j++) {
          const dx=particles[i].x-particles[j].x;
          const dy=particles[i].y-particles[j].y;
          const dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<maxDist){
            const la=(1-dist/maxDist)*(isLight?.07:.13);
            ctx.beginPath();
            ctx.moveTo(particles[i].x,particles[i].y);
            ctx.lineTo(particles[j].x,particles[j].y);
            ctx.strokeStyle=`rgba(${rgb},${la})`;
            ctx.lineWidth=.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    }

    drawParticles();
  }

  // ─────────────────────────────────────────
  // QUIZ LOGIC (unchanged + safe)
  // ─────────────────────────────────────────

  let userAnswers = new Array(questions.length).fill(null);
  let score = 0;

  document.getElementById('quizTitleEn').textContent = QUIZ_CONFIG.titleEn;
  document.getElementById('quizTitleHi').textContent = QUIZ_CONFIG.titleHi;
  document.getElementById('quizCode').textContent    = QUIZ_CONFIG.code;
  document.getElementById('quizPill').textContent    = QUIZ_CONFIG.pill;
  document.getElementById('totalTxt').textContent    = ` / ${questions.length}`;

  function renderQuiz() {
    const c = document.getElementById('quizContainer');
    let html = '';

    sections.forEach(sec => {
      html += `<div class="section-label">
        <div class="sec-line"></div>
        <div class="sec-text">${sec.label}</div>
        <div class="sec-line"></div>
      </div>`;

      const end = Math.min(sec.end, questions.length);

      for (let i = sec.start; i < end; i++) {
        const q = questions[i];

        html += `
          <div class="q-card" id="card-${i}">
            <div class="q-header">
              <div class="q-num">${q.num}</div>
              <div class="q-text-wrap">
                <div class="q-hindi">${q.hindi}</div>
                <div class="q-english">${q.english}</div>
              </div>
            </div>

            <div class="options-grid">
              ${q.options.map((opt,oi)=>
                `<button class="opt-btn" id="opt-${i}-${oi}" onclick="pick(${i},${oi})">${opt}</button>`
              ).join('')}
            </div>

            <div class="answer-reveal" id="reveal-${i}">
              <div class="ans-label">✓ CORRECT ANSWER</div>
              <div class="ans-text" id="ans-${i}"></div>
              ${q.note ? `<div class="ans-note">${q.note}</div>` : ''}
            </div>
          </div>`;
      }

      html += '<div class="divider"></div>';
    });

    c.innerHTML = html;
  }

  window.pick = function(qi, oi) {
    if (userAnswers[qi] !== null) return;

    userAnswers[qi] = oi;
    const q = questions[qi];

    for (let i = 0; i < q.options.length; i++) {
      const btn = document.getElementById(`opt-${qi}-${i}`);
      btn.disabled = true;

      if (i === q.answer) btn.classList.add('correct');
      else if (i === oi) btn.classList.add('wrong');
    }

    document.getElementById(`ans-${qi}`).textContent = q.options[q.answer];
    document.getElementById(`reveal-${qi}`).classList.add('show');

    if (oi === q.answer) score++;
    updateScore();
  }

  function updateScore() {
    const att = userAnswers.filter(a => a !== null).length;

    document.getElementById('scoreNum').textContent = score;
    document.getElementById('attemptedTxt').textContent = att + ' attempted';

    document.getElementById('progressBar').style.width =
      questions.length ? (att / questions.length * 100) + '%' : '0%';
  }

  window.resetAll = function() {
    userAnswers = new Array(questions.length).fill(null);
    score = 0;

    renderQuiz();
    updateScore();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderQuiz();
  updateScore();

});
