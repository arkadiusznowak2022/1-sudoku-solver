class NavExemBtnsView {
  _parentElement = document.querySelector("#btn-container-exem");

  addHandlerDisplayExemple(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-exem");
      if (!btn) return;

      handler(btn.dataset.display);
    });
  }

  _createErrorEl(errMsg) {
    const errorEl = document.createElement("h1");
    errorEl.innerHTML = errMsg;
    errorEl.classList.add("error-msg");
    return errorEl;
  }

  displayError(errMsg) {
    const errEl = this._createErrorEl(errMsg);
    const btns = this._parentElement.querySelectorAll(".btn-exem");
    this._parentElement.append(errEl);
    setTimeout(() => errEl.remove(), 2000);

    btns.forEach((btn) => {
      btn.style.display = "none";
      setTimeout(() => (btn.style.display = "inline-block"), 2000);
    });
  }
}

export default new NavExemBtnsView();

/*
import { ERROR_MSG } from "./config.js";

let lastChanges = [];

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

export function solution(sudokuArr) {
  try {
    let active = true;
    let advancedOne = false;
    let advancedTwo = false;
    let doubleScores = [];
    const checkContent = () => sudokuArr.some((el) => !el.textContent);

    while (active) {
      active = false;

      if (!advancedOne && !advancedTwo) active = calculate(sudokuArr);
      if (advancedOne) doubleScores = calculate(sudokuArr, advancedOne);
      if (advancedTwo) {
        console.log("entry");
        for (let el of doubleScores) {
          const el = doubleScores[0];
          // I
          el.btn.textContent = el.first;
          while (calculate(sudokuArr));
          if (!checkContent()) break;
          // // II
          // el.btn.textContent = el.second;
          // while (calculate(sudokuArr));
          // if (!checkContent()) break;
          // el.btn.textContent = "";
        }

        if (checkContent) throw new Error(ERROR_MSG);
      }

      // The Doorman
      if (advancedOne) {
        advancedOne = false;
        advancedTwo = true;
        active = true;
        console.log("adv 2 entry");
      }
      if (!active && !advancedOne && !advancedTwo && checkContent()) {
        advancedOne = true;
        active = true;
      }
    }
  } catch (err) {
    throw err;
  }
}

function calculate(sudokuArr, advancedOne = false) {
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
      flag = true;
    }

    // Phase hard
    if (advancedOne) {
      if (results.size === 2) {
        const [a, b] = [...results];
        doubleScores.push({ btn: btn, first: a, second: b });
      }
    }
  });

  if (advancedOne) return doubleScores;
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
};

*/
