import { BUTTONS_SIZE, BORDERS_THICKNESS } from "./config.js";
import { signSquare } from "./data.js";

class SudokuContainer {
  _parentElement = document.querySelector(".sudoku-container");
  _curButton;

  constructor() {
    this._parentElement.style.width = `${BUTTONS_SIZE * 9}px`;
    this._parentElement.style.height = `${BUTTONS_SIZE * 9}px`;
    this._parentElement.insertAdjacentHTML("afterbegin", this._createMarkup());
  }

  addHandlerInitWindow(handler) {
    this._parentElement.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        const btn = e.target.closest(".btn-sudoku");
        if (!btn) return;

        this._curButton = btn;
        handler();
      }.bind(this)
    );
  }

  setMarkedButtonValue(val) {
    this._curButton.textContent = val;
  }

  setSomeValue(x, y, val) {
    const btn = this.arrayFromSudoku().find(
      (btn) => +btn.dataset.x === x && +btn.dataset.y === y
    );
    btn.textContent = val;
  }

  clearSudoku() {
    this.arrayFromSudoku().forEach((btn) => (btn.textContent = ""));
  }

  arrayFromSudoku() {
    return Array.from(this._parentElement.childNodes).filter((el) =>
      el.classList ? el.classList.contains("btn-sudoku") : false
    );
  }

  _createMarkup() {
    let counter = 1;
    const markupArr = [];

    for (let y = 0; y < 9; y++)
      for (let x = 0; x < 9; x++) {
        const markup = `
          <button
            class="btn btn-sudoku"
            data-x="${x}" 
            data-y="${y}"
            data-square="${signSquare(x, y)}"
            style="width:${BUTTONS_SIZE}px;
                  height:${BUTTONS_SIZE}px;
                  ${this._createBorders(x, y)}
                  "
          >
          </button>`.trim();
        counter++;
        markupArr.push(markup);
      }

    return markupArr.join("");
  }

  _createBorders(x, y) {
    let borders = "";
    if (x % 3 === 0 && x !== 0)
      borders += `border-left: ${BORDERS_THICKNESS}px solid black;`;
    if (y % 3 === 0 && y !== 0)
      borders += `border-top: ${BORDERS_THICKNESS}px solid black;`;
    return borders;
  }
}

export default new SudokuContainer();
