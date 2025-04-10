import { store } from "../store";
import { updatePrice } from "../features/portfolio/portfolioSlice";

const connectWebSocket = () => {
  const symbols = ["btcusdt", "ethusdt", "bnbusdt", "solusdt", "adausdt"];
  const streams = symbols.map((symbol) => `${symbol}@ticker`).join("/");

  const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const { s, c, P } = message.data; // s: symbol, c: current price, P: 24h price change %

    const assetName = s.replace("USDT", "").toUpperCase();

    store.dispatch(
      updatePrice({
        name: assetName,
        price: parseFloat(c),
        change24h: parseFloat(P),
      })
    );
  };

  ws.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed.");
    setTimeout(connectWebSocket, 5000);
  };
};

export default connectWebSocket;
