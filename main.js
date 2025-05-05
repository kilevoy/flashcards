let cards = [];
let currentIndex = 0;
let mistakes = [];
let isAnswerShown = false;
let timer;
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const commentEl = document.getElementById('comment');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const knowBtn = document.getElementById('knowBtn');
const dontKnowBtn = document.getElementById('dontKnowBtn');
const skipBtn = document.getElementById('skipBtn');
const progressEl = document.getElementById('progress');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');

fetch('data/cards.json')
  .then(response => response.json())
  .then(data => {
    cards = data;
    loadFromStorage();
    showCard();
  });

function loadFromStorage() {
  const storedMistakes = localStorage.getItem('mistakes');
  if (storedMistakes) {
    mistakes = JSON.parse(storedMistakes);
  }
}

function saveToStorage() {
  localStorage.setItem('mistakes', JSON.stringify(mistakes));
}

function showCard() {
  if (currentIndex >= cards.length) {
    if (mistakes.length > 0) {
      cards = mistakes.slice();
      mistakes = [];
      currentIndex = 0;
      alert('Теперь повторим карточки с ошибками!');
      saveToStorage();
    } else {
      questionEl.textContent = 'Вы выучили все карточки!';
      answerEl.classList.add('hidden');
      commentEl.classList.add('hidden');
      showAnswerBtn.classList.add('hidden');
      knowBtn.classList.add('hidden');
      dontKnowBtn.classList.add('hidden');
      skipBtn.classList.add('hidden');
      return;
    }
  }
  let card = cards[currentIndex];
  questionEl.textContent = card.question;
  answerEl.textContent = card.answer;
  commentEl.textContent = card.comment;
  answerEl.classList.add('hidden');
  commentEl.classList.add('hidden');
  showAnswerBtn.classList.remove('hidden');
  knowBtn.classList.add('hidden');
  dontKnowBtn.classList.add('hidden');
  skipBtn.classList.add('hidden');
  isAnswerShown = false;
  progressEl.textContent = `Прогресс: ${currentIndex + 1}/${cards.length}`;
  clearTimeout(timer);
  timer = setTimeout(() => {
    showAnswer();
  }, 30000);
}

function showAnswer() {
  answerEl.classList.remove('hidden');
  commentEl.classList.remove('hidden');
  showAnswerBtn.classList.add('hidden');
  knowBtn.classList.remove('hidden');
  dontKnowBtn.classList.remove('hidden');
  skipBtn.classList.remove('hidden');
  isAnswerShown = true;
}

showAnswerBtn.addEventListener('click', showAnswer);
knowBtn.addEventListener('click', () => {
  currentIndex++;
  showCard();
});
dontKnowBtn.addEventListener('click', () => {
  mistakes.push(cards[currentIndex]);
  currentIndex++;
  saveToStorage();
  showCard();
});
skipBtn.addEventListener('click', () => {
  currentIndex++;
  showCard();
});

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});