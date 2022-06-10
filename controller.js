import sudokuContainerView from "./sudokuContainerView.js";
import addNumberView from "./addNumberView.js";
import navExemBtnsView from "./navExemBtnsView.js";
import navMainBtnsView from "./navMainBtnsView.js";
import { exemples, solution } from "./data.js";

function showNumberWindow() {
  addNumberView.showView();
}

function addNumber(val) {
  sudokuContainerView.setMarkedButtonValue(val);
}

function resetSudoku() {
  sudokuContainerView.clearSudoku();
}

function solveSudoku() {
  try {
    solution(sudokuContainerView.arrayFromSudoku());
  } catch (err) {
    navExemBtnsView.displayError(err.message);
  }
}

function displayExemple(goTo) {
  sudokuContainerView.clearSudoku();
  manageDisplay(exemples[goTo]);
}

function init() {
  sudokuContainerView.addHandlerInitWindow(showNumberWindow);
  addNumberView.addHandlerGetNumber(addNumber);
  navMainBtnsView.addHandlerSolve(solveSudoku);
  navMainBtnsView.addHandlerReset(resetSudoku);
  navExemBtnsView.addHandlerDisplayExemple(displayExemple);
  sudokuContainerView.clearSudoku();
}
init();

function manageDisplay(exemArr) {
  exemArr.forEach((pos) => {
    const { x, y, val } = pos;
    sudokuContainerView.setSomeValue(x, y, val);
  });
}
