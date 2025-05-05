let cards = [];
let currentIndex = 0;
let mistakes = [];
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const commentEl = document.getElementById('comment');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const showChoicesBtn = document.getElementById('showChoicesBtn');
const choicesEl = document.getElementById('choices');
const progressEl = document.getElementById('progress');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');

fetch('data/cards.json')
  .then(response => response.json())
  .then(data => {
    cards = data;
    showCard();
  });

function showCard() {
  if (currentIndex >= cards.length) {
    if (mistakes.length > 0) {
      cards = mistakes.slice();
      mistakes = [];
      currentIndex = 0;
      alert('Повторяем ошибочные карточки!');
    } else {
      questionEl.textContent = 'Все карточки пройдены!';
      answerEl.classList.add('hidden');
      commentEl.classList.add('hidden');
      choicesEl.classList.add('hidden');
      showAnswerBtn.classList.add('hidden');
      showChoicesBtn.classList.add('hidden');
      return;
    }
  }
  let card = cards[currentIndex];
  questionEl.textContent = card.question;
  answerEl.textContent = card.answer;
  commentEl.textContent = card.comment;
  answerEl.classList.add('hidden');
  commentEl.classList.add('hidden');
  choicesEl.classList.add('hidden');
  showAnswerBtn.classList.remove('hidden');
  showChoicesBtn.classList.remove('hidden');
  progressEl.textContent = `Прогресс: ${currentIndex + 1}/${cards.length}`;
  choicesEl.innerHTML = '';
}

function showAnswer() {
  answerEl.classList.remove('hidden');
  commentEl.classList.remove('hidden');
  showAnswerBtn.classList.add('hidden');
  showChoicesBtn.classList.add('hidden');
}

function showChoices() {
  let card = cards[currentIndex];
  let shuffled = card.choices.sort(() => Math.random() - 0.5);
  choicesEl.innerHTML = '';
  shuffled.forEach(choice => {
    let btn = document.createElement('button');
    btn.textContent = choice;
    btn.classList.add('choice-btn');
    btn.onclick = () => checkAnswer(choice === card.answer, btn);
    choicesEl.appendChild(btn);
  });
  choicesEl.classList.remove('hidden');
  showAnswerBtn.classList.add('hidden');
  showChoicesBtn.classList.add('hidden');
}

function checkAnswer(correct, btn) {
  if (correct) {
    btn.classList.add('correct');
    setTimeout(() => {
      currentIndex++;
      showCard();
    }, 1500);
  } else {
    btn.classList.add('wrong');
    let correctBtn = [...choicesEl.children].find(b => b.textContent === cards[currentIndex].answer);
    if (correctBtn) correctBtn.classList.add('correct');
    mistakes.push(cards[currentIndex]);
    setTimeout(() => {
      currentIndex++;
      showCard();
    }, 2000);
  }
}

showAnswerBtn.addEventListener('click', showAnswer);
showChoicesBtn.addEventListener('click', showChoices);
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});