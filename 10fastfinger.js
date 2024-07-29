const textDisplay = document.getElementById('text-display');
const inputField = document.getElementById('input-field');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const errorsDisplay = document.getElementById('errors');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');



let timer;
let timeLeft = 60;
let isRunning = false;
let errors = 0;
let wordCount = 0;
let currentWord = '';

const words = [
    'the', 'be', 'of', 'and', 'a', 'to', 'in', 'he', 'have', 'it',
    'that', 'for', 'they', 'with', 'as', 'not', 'on', 'she', 'at',
    'by', 'this', 'we', 'you', 'do', 'but', 'from', 'or', 'which',
    'one', 'would', 'all', 'will', 'there', 'say', 'who', 'make',
    'when', 'can', 'more', 'if', 'no', 'man', 'out', 'other', 'so',
    'what', 'time', 'up', 'go', 'about', 'than', 'into', 'could',
    'state', 'only', 'new', 'year', 'some', 'take', 'come', 'these',
    'know', 'see', 'use', 'get', 'like', 'then', 'first', 'any',
    'work', 'now', 'may', 'such', 'give', 'over', 'think', 'most',
    'even', 'find', 'day', 'also', 'after', 'way', 'many', 'must',
    'look', 'before', 'great', 'back', 'through', 'long', 'where',
    'much', 'should', 'well', 'people', 'down', 'own', 'just',
    'because', 'good', 'each', 'those', 'feel', 'seem', 'how',
    'high', 'too', 'place', 'little', 'world', 'very', 'still',
    'nation', 'hand', 'old', 'life', 'tell', 'write', 'become',
    'here', 'show', 'house', 'both', 'between', 'need', 'mean',
    'call', 'develop', 'under', 'last', 'right', 'move', 'thing',
    'general', 'school', 'never', 'same', 'another', 'begin',
    'while', 'number', 'part', 'turn', 'real', 'leave', 'might',
    'want', 'point', 'form', 'off', 'child', 'few', 'small',
    'since', 'against', 'ask', 'late', 'home', 'interest', 'large',
    'person', 'end', 'open', 'public', 'follow', 'during', 'present',
    'without', 'again', 'hold', 'govern', 'around', 'possible', 'head',
    'consider', 'word', 'program', 'problem', 'however', 'lead', 'system',
    'set', 'order', 'eye', 'plan', 'run', 'keep', 'face', 'fact',
    'group', 'play', 'stand', 'increase', 'early', 'course', 'change',
    'help', 'line'
];

function generateRandomParagraph() {
    const paragraphLength = 50;
    let paragraph = '';
    for (let i = 0; i < paragraphLength; i++) {
        paragraph += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return paragraph.trim();
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
        endTest();
    }
}

function startTest() {
    if (!isRunning) {
        isRunning = true;
        inputField.disabled = false;
        inputField.focus();
        startBtn.disabled = true;
        textDisplay.textContent = generateRandomParagraph();
        currentWord = textDisplay.textContent.split(' ')[0];
        timer = setInterval(updateTimer, 1000);
    }
}

function resetTest() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 60;
    errors = 0;
    wordCount = 0;
    currentWord = '';
    inputField.disabled = true;
    inputField.value = '';
    startBtn.disabled = false;
    textDisplay.textContent = 'Click "Start" to begin the typing test.';
    timerDisplay.textContent = '60';
    wpmDisplay.textContent = '0';
    errorsDisplay.textContent = '0';
}

function endTest() {
    clearInterval(timer);
    isRunning = false;
    inputField.disabled = true;
    startBtn.disabled = false;
    const wpm = Math.round((wordCount / 1) * (60 / 60)); 
    wpmDisplay.textContent = `WPM: ${wpm}`;
    textDisplay.textContent = `Test finished! Your WPM: ${wpm}, Errors: ${errors}`;
}

function checkInput() {
    const words = textDisplay.textContent.split(' ');
    const typedValue = inputField.value.trim();

    if (typedValue === currentWord) {
        wordCount++;
        words.shift();
        textDisplay.textContent = words.join(' ');
        inputField.value = '';
        currentWord = words[0];

        if (words.length === 0) {
            textDisplay.textContent = generateRandomParagraph();
            currentWord = textDisplay.textContent.split(' ')[0];
        }
    }


    if (typedValue.length > 0 && !currentWord.startsWith(typedValue)) {
        errors++;
        errorsDisplay.textContent = errors;
    }
const elapsedMinutes = (60 - timeLeft) / 60;
const currentWPM = Math.round((wordCount / elapsedMinutes) || 0);
wpmDisplay.textContent = currentWPM;
}

startBtn.addEventListener('click', startTest);
resetBtn.addEventListener('click', resetTest);
inputField.addEventListener('input', checkInput);

resetTest();