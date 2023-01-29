import { useState } from "react";
import "./index.scss";

function App() {
  let [value, setValue] = useState(0);

  const onClickMinus = () => {
    setValue((previousValue) => previousValue - 1);
  };

  const onClickPlus = () => {
    setValue((previousValue) => previousValue + 1);
  };

  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{value}</h1>
        <button className="minus" onClick={onClickMinus}>
          - Минус
        </button>
        <button className="plus" onClick={onClickPlus} type="button">
          Плюс +
        </button>
      </div>
    </div>
  );
}

export default App;
