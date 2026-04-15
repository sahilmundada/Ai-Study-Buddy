const flashcardList = document.getElementById('flashcardList');
const topicList = document.getElementById('topicList');
const addCardBtn = document.getElementById('addCardBtn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const saveCardBtn = document.getElementById('saveCardBtn');
const cardQuestion = document.getElementById('cardQuestion');
const cardAnswer = document.getElementById('cardAnswer');
const topicFilter = document.getElementById('topicFilter');
const themeToggle = document.getElementById('themeToggle');

const flashcards = [
  { question: 'What is active recall?', answer: 'A learning method where you recall information from memory.', topic: 'science' },
  { question: 'What is the Pythagorean theorem?', answer: 'a² + b² = c² in a right triangle.', topic: 'math' },
  { question: 'What does CSS stand for?', answer: 'Cascading Style Sheets.', topic: 'language' },
];

const topics = [
  { title: 'Calculus', label: 'math' },
  { title: 'Biology Review', label: 'science' },
  { title: 'Grammar Practice', label: 'language' },
  { title: 'World History', label: 'history' },
];

function renderFlashcards(filter = 'all') {
  flashcardList.innerHTML = flashcards
    .filter(card => filter === 'all' || card.topic === filter)
    .map(card => `
      <article class="flashcard">
        <h4>${card.question}</h4>
        <p>${card.answer}</p>
        <span>${card.topic}</span>
      </article>
    `)
    .join('');
}

function renderTopics(filter = 'all') {
  topicList.innerHTML = topics
    .filter(topic => filter === 'all' || topic.label === filter)
    .map(topic => `
      <li class="topic-item">
        <h4>${topic.title}</h4>
        <span>${topic.label}</span>
      </li>
    `)
    .join('');
}

function openModal() {
  modal.classList.remove('hidden');
  cardQuestion.value = '';
  cardAnswer.value = '';
}

function closeModal() {
  modal.classList.add('hidden');
}

function saveCard() {
  const question = cardQuestion.value.trim();
  const answer = cardAnswer.value.trim();
  if (!question || !answer) {
    alert('Please add both a question and an answer.');
    return;
  }

  flashcards.push({ question, answer, topic: 'language' });
  renderFlashcards(topicFilter.value);
  closeModal();
}

const themeIcon = document.getElementById('themeIcon');

function updateThemeIcon() {
  const isDark = document.body.classList.contains('dark');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
}

function handleThemeToggle() {
  document.body.classList.toggle('dark');
  updateThemeIcon();
}

addCardBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
saveCardBtn.addEventListener('click', saveCard);
topicFilter.addEventListener('change', () => {
  renderFlashcards(topicFilter.value);
  renderTopics(topicFilter.value);
});
themeToggle.addEventListener('click', handleThemeToggle);

renderFlashcards();
renderTopics();
updateThemeIcon();
