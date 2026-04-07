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
let userAnswers = new Array(questions.length).fill(null);
let score = 0;

document.getElementById('quizTitleEn').textContent = QUIZ_CONFIG.titleEn;
document.getElementById('quizTitleHi').textContent = QUIZ_CONFIG.titleHi;
document.getElementById('quizCode').textContent    = QUIZ_CONFIG.code;
document.getElementById('quizPill').textContent    = QUIZ_CONFIG.pill;
document.getElementById('totalTxt').textContent    = \` / \${questions.length}\`;

function renderQuiz() {
  const c = document.getElementById('quizContainer');
  let html = '';
  sections.forEach(sec => {
    html += \`<div class="section-label"><div class="sec-line"></div><div class="sec-text">\${sec.label}</div><div class="sec-line"></div></div>\`;
    const end = Math.min(sec.end, questions.length);
    for (let i = sec.start; i < end; i++) {
      const q = questions[i];
      html += \`
        <div class="q-card" id="card-\${i}" style="animation-delay:\${i*0.04}s">
          <div class="q-header">
            <div class="q-num">\${q.num}</div>
            <div class="q-text-wrap">
              <div class="q-hindi">\${q.hindi}</div>
              <div class="q-english">\${q.english}</div>
            </div>
          </div>
          <div class="options-grid">
            \${q.options.map((opt,oi)=>\`<button class="opt-btn" id="opt-\${i}-\${oi}" onclick="pick(\${i},\${oi})">\${opt}</button>\`).join('')}
          </div>
          <div class="answer-reveal" id="reveal-\${i}">
            <div class="ans-label">✓ CORRECT ANSWER</div>
            <div class="ans-text" id="ans-\${i}"></div>
            \${q.note ? \`<div class="ans-note">\${q.note}</div>\` : ''}
          </div>
        </div>\`;
    }
    html += '<div class="divider"></div>';
  });
  c.innerHTML = html;
}

function pick(qi, oi) {
  if (userAnswers[qi] !== null) return;
  userAnswers[qi] = oi;
  const q = questions[qi];
  for (let i = 0; i < q.options.length; i++) {
    const btn = document.getElementById(\`opt-\${qi}-\${i}\`);
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    else if (i === oi)  btn.classList.add('wrong');
  }
  document.getElementById(\`ans-\${qi}\`).textContent = q.options[q.answer];
  document.getElementById(\`reveal-\${qi}\`).classList.add('show');
  if (oi === q.answer) score++;
  updateScore();
}

function updateScore() {
  const att = userAnswers.filter(a => a !== null).length;
  document.getElementById('scoreNum').textContent    = score;
  document.getElementById('attemptedTxt').textContent = att + ' attempted';
  document.getElementById('progressBar').style.width  = (att / questions.length * 100) + '%';
}

function resetAll() {
  userAnswers = new Array(questions.length).fill(null);
  score = 0;
  renderQuiz();
  updateScore();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

renderQuiz();
