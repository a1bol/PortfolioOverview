import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addAsset } from "../features/portfolio/portfolioSlice";
import { popularAssets } from "../constants/assets";
import { Asset } from "../types";

export const AddAssetForm = () => {
  const dispatch = useAppDispatch();

  const [symbol, setSymbol] = useState(popularAssets[0].symbol);
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    const asset = popularAssets.find((a) => a.symbol === symbol);
    if (!asset || isNaN(Number(amount))) return;

    const newAsset: Asset = {
      id: `${asset.symbol}-${Date.now()}`, 
      symbol: asset.symbol,
      name: asset.name,
      amount: Number(amount),
      price: 0,
      change24h: 0,
    };

    dispatch(addAsset(newAsset));

    setAmount("");
  };

  const handleReset = () => {
    setSymbol(popularAssets[0].symbol);
    setAmount("");
  };

  return (
    <div className="add-asset-form">
      <h3>Add Asset</h3>
      <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
        {popularAssets.map((asset) => (
          <option key={asset.symbol} value={asset.symbol}>
            {asset.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};
