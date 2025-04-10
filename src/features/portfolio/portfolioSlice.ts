import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset } from "../../types";


interface PortfolioState {
  assets: Asset[];
}

const loadStateFromLocalStorage = (): PortfolioState => {
  const savedState = localStorage.getItem('portfolioState');
  if (savedState) {
    return JSON.parse(savedState);
  }
  return { assets: [] }; 
};

const initialState: PortfolioState = loadStateFromLocalStorage();

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addAsset(state, action: PayloadAction<Asset>) {
      const existingAssetIndex = state.assets.findIndex(asset => asset.symbol === action.payload.symbol);

      if (existingAssetIndex !== -1) {
        const existingAsset = state.assets[existingAssetIndex];
        existingAsset.amount += action.payload.amount; 
      } else {
        state.assets.push(action.payload);
      }

      saveStateToLocalStorage(state);
    },

    removeAsset(state, action: PayloadAction<string>) {
      state.assets = state.assets.filter((asset) => asset.id !== action.payload);
      saveStateToLocalStorage(state);
    },

    updatePrice(state, action: PayloadAction<{ name: string; price: number; change24h: number }>) {
      const asset = state.assets.find((a) => a.symbol === `${action.payload.name}USDT`);
      if (asset) {
        asset.price = action.payload.price;
        asset.change24h = action.payload.change24h;
      }
      saveStateToLocalStorage(state);
    }
  },
});

const saveStateToLocalStorage = (state: PortfolioState) => {
  localStorage.setItem("portfolioState", JSON.stringify(state));
};

export const { addAsset, removeAsset, updatePrice } = portfolioSlice.actions;
export default portfolioSlice.reducer;
