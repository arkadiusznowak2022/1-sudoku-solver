class NavMainBtnsView {
  _btnCheck = document.querySelector("#btn-check");
  _btnReset = document.querySelector("#btn-reset");

  addHandlerSolve(handler) {
    this._btnCheck.addEventListener("click", handler);
  }
  addHandlerReset(handler) {
    this._btnReset.addEventListener("click", handler);
  }
}

export default new NavMainBtnsView();
