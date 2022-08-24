import { useState, useEffect } from "react";
import "./styles.css";

// Use this API
// https://api2.binance.com/api/v3/ticker/24hr

// symbols we want...
// BTCUSDT (Bitcoin)
// ETHUSDT (Ethereum)
// SOLUSDT (Solana)
// ADAUSDT (Cardano)
// DOGEUSDT (DogeCoin)

const COIN_NAMES = {
  BTCUSDT: "Bitcoin",
  ETHUSDT: "Ethereum",
  SOLUSDT: "Solana",
  ADAUSDT: "Cardano",
  DOGEUSDT: "DogeCoin"
};

const COINS = Object.keys(COIN_NAMES);

export default function App() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetch("https://api2.binance.com/api/v3/ticker/24hr")
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((ticker) => {
          if (COINS.includes(ticker.symbol)) {
            return true;
          }
        });
        setCryptoData(filteredData);
      });
  }, []);

  return (
    <div className="App">
      <nav>
        <img
          alt="logo"
          src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
        />
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
            </tr>
          </thead>

          {cryptoData.map((crypto, index) => (
            <tbody>
              <tr key={crypto.symbol}>
                <td>{index + 1}</td>
                <td>{COIN_NAMES[crypto.symbol]}</td>
                <td>${Number(crypto.weightedAvgPrice).toLocaleString()}</td>
                <td
                  style={{
                    color: crypto.priceChangePercent > 0 ? "green" : "red"
                  }}
                >
                  {crypto.priceChangePercent > 0 ? "▲" : "▼"}
                  {Math.round(crypto.priceChangePercent * 100) / 100}%
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
          />
        </div>
      </div>
    </div>
  );
}
