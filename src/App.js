import React, { useEffect, useRef, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(1);
  const [toPrice, setToPrice] = useState(1);
  // const [rates, setRates] = useState([]);
  const ratesRef = useRef([]);

  const calcMoneyCurs = (value, from, to) => {
    // курс дан относительно грн и потому, чтоб перевести из курса отличающиеся от грн
    // мы переводим его в грн и делим на курс в который переводим
    // например если переводим из 10 долларов в евро, мы умножаем 10 на курс грн к доллару
    // и делим на курс грн к евро, итого:  (10 * 36.5)/38.6
    const numerator =
      from === "UAH" ? value : value * ratesRef.current.find((item) => item.cc === from)?.rate;
    const divider = to === "UAH" ? 1 : ratesRef.current.find((item) => item.cc === to)?.rate;

    return (numerator / divider).toFixed(3);
  };

  const onChangeFromPrice = (value) => {
    const result = calcMoneyCurs(value, fromCurrency, toCurrency);
    setFromPrice(value);
    setToPrice(result);
  };

  const onChangeToPrice = (value) => {
    const result = calcMoneyCurs(value, toCurrency, fromCurrency);
    setToPrice(value);
    setFromPrice(result);
  };

  useEffect(() => {
    fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((res) => res.json())
      .then((json) => {
        // setRates(json);
        ratesRef.current = json;
        console.log(ratesRef);
        onChangeToPrice(1);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
