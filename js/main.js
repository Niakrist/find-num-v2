const num = 5;
const startGame = document.querySelector('.start__game');
const field = document.querySelector('.field__table');
const hiddenNum = new Set();
const scoreFind = document.querySelector('.field__score-find');
const scoreAll = document.querySelector('.field__score-all');
const timerField = document.querySelector('.field__timer');
let timerId;
let timeout = 1000;

let count = 0;

startGame.addEventListener('click', function () {
  scoreAll.textContent = num;
  scoreFind.textContent = 0;
  hiddenNum.clear();
  timerField.textContent = timeout / 100; 
  if (document.querySelector('.win')) document.querySelector('.win').remove();
  
  generateHiddenNum(num);
  if (field.children.length > 0) {
    console.log('hiddenNum2 ', hiddenNum)
    count = 0;
    cleanField();
  } else {
    console.log('hiddenNum1 ', hiddenNum)
    createField(num);
  }
  checkTd(hiddenNum);
  toLose();
})

function cleanField() {
  field.querySelectorAll('tr').forEach(el => el.remove());
  createField(num);
}

function createField(num) {
  for (let i = 0; i < num; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < num; j++) {
      const td = document.createElement('td');
      td.textContent = count++;
      tr.appendChild(td);
    }
    field.appendChild(tr);
  }
}

function generateHiddenNum(num) {
  while (hiddenNum.size < num) {
    hiddenNum.add(Math.floor(Math.random() * Math.pow(num, 2)));
  }
}

function checkTd() {
  const tds = document.querySelectorAll('td');
  tds.forEach((td) => {
    td.addEventListener('click', function () {
      if (hiddenNum.has(Number(this.textContent))) {
        if (!this.classList.contains('right')) {
          this.classList.add('right');
          scoreFind.textContent = Number(scoreFind.textContent) + 1;
        }
      } else {
        this.classList.add('error');
      }

      if ((scoreFind.textContent === scoreAll.textContent)) {
        win();
        for (let elem of tds) {
          elem.classList.add('pink');
          elem.style.pointerEvents = 'none';
        }
      }

    })
  })
}

function win() {
  const div = document.createElement('div');
  div.classList.add('win');
  div.textContent = 'Победа';
  field.insertAdjacentElement('afterend', div);
  clearInterval(timerId);
}

function toLose() {
  timerId = setInterval(function() {
    timerField.textContent--;

    if (Number(timerField.textContent) === 0) {
      clearInterval(timerId);
      const div = document.createElement('div');
      div.classList.add('win');
      div.textContent = 'Поражение';
      field.insertAdjacentElement('afterend', div);

      const tdsAll = document.querySelectorAll('td');
      for (const td of tdsAll) {
        td.classList.add('lose');
        td.style.pointerEvents = 'none';
      }

    }
  }, 1000)
  
}