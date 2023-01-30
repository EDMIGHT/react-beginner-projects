import React, { useState } from "react";
import "./index.scss";
import Modal from "./Modal";

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="App">
      <button className="open-modal-btn" onClick={() => setVisible(true)}>
        ✨ Открыть окно
      </button>
      {/* если не нужна анимация, то такой способ нужно использовать */}
      {/* {visible && <Modal setVisible={setVisible} />} */}
      <Modal visible={visible} setVisible={setVisible}>
        <img
          src="https://i.pinimg.com/564x/f1/7c/53/f17c53323136e35087a420004c78d845.jpg"
          alt="img"
        />
        <h3>Модальное окно</h3>
      </Modal>
    </div>
  );
}

export default App;
