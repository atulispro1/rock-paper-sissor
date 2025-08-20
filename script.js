const choices = [
  {num: 1, name: 'Rock ✊', emoji: '✊'},
  {num: 2, name: 'Paper 🧻', emoji: '🧻'},
  {num: 3, name: 'Scissors ✂️', emoji: '✂️'},
];
let userScore = 0;
let compScore = 0;

// Elements
const userScoreSpan = document.getElementById('userScore');
const compScoreSpan = document.getElementById('compScore');
const choiceBtns = document.querySelectorAll('.choice-btn');
const quitBtn = document.getElementById('quitBtn');
const resultPanel = document.getElementById('resultPanel');
const resultText = document.getElementById('resultText');
const playAgainBtn = document.getElementById('playAgainBtn');
const thanksDiv = document.getElementById('thanks');
const restartBtn = document.getElementById('restartBtn');
const userHand = document.getElementById('userHand');
const compHand = document.getElementById('compHand');

// Helpers
function getChoiceName(num) {
  return choices.find(c => c.num === num)?.name || 'Invalid';
}
function getEmoji(num) {
  return choices.find(c => c.num === num)?.emoji || '❓';
}

// Gameplay
choiceBtns.forEach(btn => {
  btn.onclick = () => {
    // Animation: shake hands before reveal
    showResult(parseInt(btn.dataset.choice));
  };
});

function showResult(userChoiceNum) {
  // Freeze user input
  choiceBtns.forEach(btn => btn.disabled = true);

  userHand.textContent = '';
  compHand.textContent = '';
  userHand.className = 'hand-emoji shake';
  compHand.className = 'hand-emoji shake';
  resultPanel.classList.remove('hidden');
  resultText.textContent = '';
  
  // "Shake" hands delay before reveal
  setTimeout(() => {
    const compChoiceNum = Math.floor(Math.random() * 3) + 1;

    userHand.className = 'hand-emoji';
    compHand.className = 'hand-emoji';

    userHand.textContent = getEmoji(userChoiceNum);
    compHand.textContent = getEmoji(compChoiceNum);

    // Determine result
    let result;
    if (userChoiceNum === compChoiceNum) {
      result = {text: "🤝 It's a Tie!", color: "#fdbc45"};
    }
    else if (
      (userChoiceNum === 1 && compChoiceNum === 3) ||
      (userChoiceNum === 2 && compChoiceNum === 1) ||
      (userChoiceNum === 3 && compChoiceNum === 2)
    ) {
      result = {text: "🔥 You Win!", color: "#58c76c"};
      userScore++;
    } else {
      result = {text: "💻 Computer Wins!", color: "#f15a74"};
      compScore++;
    }
    userScoreSpan.textContent = userScore;
    compScoreSpan.textContent = compScore;
    resultText.textContent = result.text;
    resultText.style.color = result.color || "#f15a74";
    
    playAgainBtn.classList.remove('hidden');
  }, 530);
}

// Play again
playAgainBtn.onclick = () => {
  resultPanel.classList.add('hidden');
  playAgainBtn.classList.add('hidden');
  choiceBtns.forEach(btn => btn.disabled = false);
};

// Quit
quitBtn.onclick = () => {
  document.querySelector('.game-area').classList.add('hidden');
  resultPanel.classList.add('hidden');
  thanksDiv.classList.remove('hidden');
};

// Restart all
restartBtn.onclick = () => {
  thanksDiv.classList.add('hidden');
  document.querySelector('.game-area').classList.remove('hidden');
  userScore = 0; compScore = 0;
  userScoreSpan.textContent = 0;
  compScoreSpan.textContent = 0;
  choiceBtns.forEach(btn => btn.disabled = false);
};
