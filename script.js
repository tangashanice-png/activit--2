const codeInput = document.getElementById('codeInput');
const unlockBtn = document.getElementById('unlockBtn');
const codeError = document.getElementById('codeError');
const dateSection = document.getElementById('dateSection');
const dateInput = document.getElementById('dateInput');
const dateBtn = document.getElementById('dateBtn');
const dateError = document.getElementById('dateError');
const storyBlock = document.getElementById('storyBlock');
const returnHomeBtn = document.getElementById('returnHomeBtn');

const validCodes = new Set([
  'BVRO', 'BVOR', 'BRVO', 'BROV', 'BOVR', 'BORV',
  'VBRO', 'VBOR', 'VRBO', 'VROB', 'VOBR', 'VORB',
  'RBVO', 'RBOV', 'RVBO', 'RVOB', 'ROBV', 'ROVB',
  'OBVR', 'OBRV', 'OVBR', 'OVRB', 'ORBV', 'ORVB'
]);

function normalizeCode(value) {
  return value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4);
}

function isValidCode(value) {
  const code = value.trim().toUpperCase();
  return validCodes.has(code);
}

function checkCode() {
  codeInput.value = normalizeCode(codeInput.value);

  if (isValidCode(codeInput.value)) {
    codeError.textContent = '';
    dateSection.classList.remove('hidden');
    dateInput.focus();
    return;
  }

  dateSection.classList.add('hidden');
  storyBlock.classList.add('hidden');
  dateError.textContent = '';
  codeError.textContent = 'Le code est incorrect.';
}

function checkDate() {
  const value = dateInput.value.trim();

  if (value === '15/02/1879') {
    dateError.textContent = '';
    storyBlock.classList.remove('hidden');
    return;
  }

  storyBlock.classList.add('hidden');
  dateError.textContent = 'La date est fausse';
}

codeInput.addEventListener('input', () => {
  codeInput.value = normalizeCode(codeInput.value);
});

function returnToHome() {
  dateSection.classList.add('hidden');
  storyBlock.classList.add('hidden');
  codeInput.value = '';
  dateInput.value = '';
  codeError.textContent = '';
  dateError.textContent = '';
  codeInput.focus();
}

unlockBtn.addEventListener('click', checkCode);
dateBtn.addEventListener('click', checkDate);
returnHomeBtn.addEventListener('click', returnToHome);
codeInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkCode();
  }
});

dateInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkDate();
  }
});
