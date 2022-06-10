import { ERROR_MSG } from "./config.js";

export function signSquare(x, y) {
  // first row of squares
  if (y < 3) {
    if (x < 3) return 1;
    if (x >= 3 && x < 6) return 2;
    if (x >= 6 && x < 9) return 3;
  }
  // second row of squares
  if (y >= 3 && y < 6) {
    if (x < 3) return 4;
    if (x >= 3 && x < 6) return 5;
    if (x >= 6 && x < 9) return 6;
  }
  // third row of squares
  if (y >= 6 && y < 9) {
    if (x < 3) return 7;
    if (x >= 3 && x < 6) return 8;
    if (x >= 6 && x < 9) return 9;
  }

  return 0;
}

const lastChanges = {
  btnsSet: new Set([]),

  add: function (btn) {
    this.btnsSet.add(btn);
  },

  undo: function () {
    for (const btn of this.btnsSet) btn.textContent = "";
    this.clear();
  },

  clear: function () {
    this.btnsSet.clear();
  },
};

export function solution(sudokuArr) {
  try {
    let active = true;
    let advLvl = 0;
    let doubleScores = [];
    const checkContent = () => sudokuArr.some((el) => !el.textContent);

    while (active) {
      active = false;

      if (!advLvl) active = calculate(sudokuArr);
      if (advLvl === 1) doubleScores = calculate(sudokuArr, advLvl);
      if (advLvl === 2) {
        for (let el of doubleScores) {
          // I
          el.btn.textContent = el.first;
          lastChanges.add(el.btn);
          while (calculate(sudokuArr));
          if (!checkContent()) break;
          lastChanges.undo();

          // II;
          el.btn.textContent = el.second;
          lastChanges.add(el.btn);
          while (calculate(sudokuArr));
          if (!checkContent()) break;
          lastChanges.undo();
        }

        if (checkContent()) throw new Error(ERROR_MSG);
      }

      // The Doorman
      if (advLvl === 1) {
        advLvl++;
        active = true;
      }
      if (!active && !advLvl && checkContent()) {
        advLvl++;
        active = true;
      }
    }
    lastChanges.clear();
  } catch (err) {
    throw err;
  }
}

function calculate(sudokuArr, advLvl = 0) {
  let flag = false;
  const doubleScores = [];

  sudokuArr.forEach((btn) => {
    if (btn.textContent) return;

    const x = btn.dataset.x;
    const y = btn.dataset.y;
    const squareNum = btn.dataset.square;

    const xArr = sudokuArr.filter((el) => el.dataset.x === x);
    const yArr = sudokuArr.filter((el) => el.dataset.y === y);
    const squareArr = sudokuArr.filter((el) => el.dataset.square === squareNum);

    // Phase one
    const results = new Set([]);
    for (let i = 1; i < 10; i++) {
      if (xArr.some((el) => +el.textContent === i)) continue;
      results.add(i);
    }
    // Phase two
    for (let item of results) {
      if (yArr.some((el) => +el.textContent === item)) results.delete(item);
      if (squareArr.some((el) => +el.textContent === item))
        results.delete(item);
    }
    // Phase three
    if (results.size === 1) {
      btn.textContent = [...results][0];
      lastChanges.add(btn);
      flag = true;
    }

    // Phase hard
    if (advLvl) {
      if (results.size === 2) {
        const [a, b] = [...results];
        doubleScores.push({ btn: btn, first: a, second: b });
      }
    }
  });

  if (advLvl) return doubleScores;
  return flag;
}

export const exemples = {
  exem1: [
    { x: 4, y: 0, val: 2 },
    { x: 6, y: 0, val: 5 },
    { x: 7, y: 0, val: 6 },
    { x: 8, y: 0, val: 8 },

    { x: 1, y: 2, val: 8 },
    { x: 2, y: 2, val: 7 },
    { x: 3, y: 2, val: 9 },
    { x: 4, y: 2, val: 1 },
    { x: 6, y: 2, val: 3 },
    { x: 7, y: 2, val: 4 },
    { x: 8, y: 2, val: 2 },

    { x: 0, y: 3, val: 4 },
    { x: 1, y: 3, val: 7 },
    { x: 3, y: 3, val: 1 },
    { x: 4, y: 3, val: 3 },

    { x: 1, y: 4, val: 6 },
    { x: 2, y: 4, val: 2 },
    { x: 4, y: 4, val: 9 },

    { x: 1, y: 5, val: 3 },
    { x: 3, y: 5, val: 7 },
    { x: 4, y: 5, val: 6 },
    { x: 6, y: 5, val: 2 },
    { x: 7, y: 5, val: 1 },

    { x: 2, y: 6, val: 5 },
    { x: 3, y: 6, val: 8 },
    { x: 7, y: 6, val: 2 },
    { x: 8, y: 6, val: 6 },

    { x: 0, y: 7, val: 7 },
    { x: 3, y: 7, val: 3 },
    { x: 5, y: 7, val: 9 },
    { x: 6, y: 7, val: 8 },
    { x: 7, y: 7, val: 5 },

    { x: 0, y: 8, val: 8 },
    { x: 1, y: 8, val: 9 },
    { x: 2, y: 8, val: 1 },
    { x: 3, y: 8, val: 2 },
    { x: 4, y: 8, val: 5 },
    { x: 8, y: 8, val: 3 },
  ],
  exem2: [
    { x: 5, y: 0, val: 1 },
    { x: 6, y: 0, val: 2 },
    { x: 7, y: 0, val: 8 },

    { x: 0, y: 1, val: 1 },
    { x: 1, y: 1, val: 7 },
    { x: 2, y: 1, val: 2 },
    { x: 3, y: 1, val: 3 },
    { x: 4, y: 1, val: 8 },
    { x: 6, y: 1, val: 9 },
    { x: 7, y: 1, val: 4 },

    { x: 0, y: 2, val: 4 },
    { x: 1, y: 2, val: 3 },
    { x: 3, y: 2, val: 9 },
    { x: 4, y: 2, val: 6 },
    { x: 5, y: 2, val: 2 },
    { x: 6, y: 2, val: 7 },
    { x: 7, y: 2, val: 5 },

    { x: 1, y: 3, val: 1 },
    { x: 2, y: 3, val: 3 },
    { x: 3, y: 3, val: 6 },
    { x: 5, y: 3, val: 4 },

    { x: 3, y: 4, val: 5 },
    { x: 4, y: 4, val: 3 },
    { x: 6, y: 4, val: 4 },

    { x: 0, y: 5, val: 5 },
    { x: 8, y: 5, val: 2 },

    { x: 5, y: 6, val: 6 },
    { x: 6, y: 6, val: 3 },

    { x: 0, y: 7, val: 3 },
    { x: 1, y: 7, val: 8 },
    { x: 6, y: 7, val: 1 },
    { x: 8, y: 7, val: 9 },

    { x: 1, y: 8, val: 2 },
    { x: 2, y: 8, val: 5 },
    { x: 4, y: 8, val: 9 },
    { x: 8, y: 8, val: 4 },
  ],

  exem3: [
    { x: 4, y: 0, val: 6 },
    { x: 7, y: 0, val: 1 },

    { x: 1, y: 1, val: 1 },
    { x: 6, y: 1, val: 7 },
    { x: 7, y: 1, val: 8 },

    { x: 0, y: 2, val: 6 },
    { x: 2, y: 2, val: 3 },
    { x: 4, y: 2, val: 9 },
    { x: 7, y: 2, val: 5 },

    { x: 0, y: 3, val: 7 },
    { x: 1, y: 3, val: 6 },

    { x: 7, y: 4, val: 6 },

    { x: 4, y: 5, val: 8 },
    { x: 6, y: 5, val: 9 },
    { x: 7, y: 5, val: 7 },
    { x: 8, y: 5, val: 4 },

    { x: 0, y: 6, val: 8 },
    { x: 2, y: 6, val: 1 },
    { x: 3, y: 6, val: 9 },
    { x: 4, y: 6, val: 2 },
    { x: 6, y: 6, val: 5 },

    { x: 1, y: 7, val: 5 },
    { x: 4, y: 7, val: 7 },
    { x: 5, y: 7, val: 3 },

    { x: 1, y: 8, val: 4 },
    { x: 5, y: 8, val: 1 },
  ],
};
