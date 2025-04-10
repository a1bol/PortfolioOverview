// portfolioSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset } from "../../types";

// Определение начального состояния с типом PortfolioState
interface PortfolioState {
  assets: Asset[];
}

// Загружаем данные из localStorage при старте приложения
const loadStateFromLocalStorage = (): PortfolioState => {
  const savedState = localStorage.getItem('portfolioState');
  if (savedState) {
    return JSON.parse(savedState);
  }
  return { assets: [] }; // Возвращаем пустой массив, если данных нет
};

const initialState: PortfolioState = loadStateFromLocalStorage();

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    // Добавление актива
    addAsset(state, action: PayloadAction<Asset>) {
      const existingAssetIndex = state.assets.findIndex(asset => asset.symbol === action.payload.symbol);

      if (existingAssetIndex !== -1) {
        const existingAsset = state.assets[existingAssetIndex];
        existingAsset.amount += action.payload.amount; // увеличиваем количество
      } else {
        state.assets.push(action.payload); // если актива нет, добавляем новый
      }

      saveStateToLocalStorage(state); // Сохраняем в localStorage
    },

    // Удаление актива
    removeAsset(state, action: PayloadAction<string>) {
      state.assets = state.assets.filter((asset) => asset.id !== action.payload);
      saveStateToLocalStorage(state); // Сохраняем в localStorage
    },

    // Обновление цены актива
    updatePrice(state, action: PayloadAction<{ name: string; price: number; change24h: number }>) {
      const asset = state.assets.find((a) => a.symbol === `${action.payload.name}USDT`);
      if (asset) {
        asset.price = action.payload.price;
        asset.change24h = action.payload.change24h;
      }
      saveStateToLocalStorage(state); // Сохраняем в localStorage
    }
  },
});

// Сохранение состояния в localStorage
const saveStateToLocalStorage = (state: PortfolioState) => {
  localStorage.setItem("portfolioState", JSON.stringify(state));
};

export const { addAsset, removeAsset, updatePrice } = portfolioSlice.actions;
export default portfolioSlice.reducer;
