let timer,timeoutVal = 1000; // time it takes to wait for user to stop typing in ms

const Modal = {
  close() {
    document.querySelector('.modal-overlay').classList.remove('active')
    Board.textarea.focus()
  },
  show() {
    document.querySelector('.modal-overlay').classList.add('active')
  }
}

const Board = {
  textarea: document.querySelector(".board"),
  init() {
    Board.textarea.textContent = Storage.get()

    if(Board.textarea.textContent.trim() === "") {
      Modal.show()
    }

    Board.textarea.addEventListener('keypress', Board.handleKeyPress);
    Board.textarea.addEventListener('keyup', Board.handleKeyUp);
  },
  // when user is pressing down on keys, clear the timeout
  handleKeyPress(e) {
    window.clearTimeout(timer);
    document.title = 'Typing...';
  },
  // when the user has stopped pressing on keys, set the timeout
// if the user presses on keys before the timeout is reached, then this timeout is canceled
  handleKeyUp(e) {
    window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
    timer = window.setTimeout(() => {
      document.title = 'Board - text saved successfully';
      Storage.set(Board.textarea.value)

    }, timeoutVal);
  }
}

const Storage = {
  get() {
    return localStorage.getItem('board:storage')
  },
  set(board_text) {
    localStorage.setItem('board:storage', board_text)
  }
}

Board.init()