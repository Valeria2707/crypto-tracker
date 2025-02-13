import { useEffect, useState } from "react";
import { filter, map } from "rxjs";
import { CryptoPrice } from "./type/crypto";
import { subscribeToTicker } from "./api/crypto";
import "./App.css";

function App() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);

  useEffect(() => {
    const subscription = subscribeToTicker()
      .pipe(
        filter((crypto) => crypto.channel === "ticker"),
        map((crypto) => {
          return {
            symbol: crypto.data[0].symbol,
            price: crypto.data[0].last,
          };
        })
      )
      .subscribe((crypto) => {
        setPrices((prevPrices) =>
          prevPrices.some((p) => p.symbol === crypto.symbol)
            ? prevPrices.map((p) =>
                p.symbol === crypto.symbol ? { ...p, price: crypto.price } : p
              )
            : [...prevPrices, crypto]
        );
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="container">
      <div className="crypto-container">
        <h2 className="crypto-title">📈 Топ криптовалют</h2>
        <ul className="crypto-list">
          {prices.map((crypto) => (
            <li key={crypto.symbol} className="crypto-item">
              <strong>{crypto.symbol}:</strong>
              <span className="crypto-price">${crypto.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
