class AddNumberView {
  _numsWindow = document.querySelector('.nums-window');
  _numsOverlay = document.querySelector('.nums-overlay');
  _parentElements = [this._numsWindow, this._numsOverlay];

  constructor() {
    this.hideView();
    this._numsOverlay.addEventListener('click', this.hideView.bind(this));
  }

  addHandlerGetNumber(handler) {
    this._numsWindow.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.btn-num');
        if (!btn) return;

        handler(btn.dataset.value);
        this.hideView();
      }.bind(this)
    );
  }

  hideView() {
    this._parentElements.forEach((el) => el.classList.add('hidden'));
  }
  showView() {
    this._parentElements.forEach((el) => el.classList.remove('hidden'));
  }
}

export default new AddNumberView();
