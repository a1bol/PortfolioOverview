# 📊 PortfolioOverview

Модуль для управления крипто-портфелем с real-time обновлением цен, формой добавления активов и виртуализированным списком. Выполнено в рамках тестового задания на позицию Frontend Developer.

## 🔧 Технологии

- **React + TypeScript**
- **Redux Toolkit + React-Redux**
- **SCSS (SASS)**
- **WebSocket (Binance API)**
- **react-window** — виртуализация длинных списков
- **Vite** — сборщик проекта

## 📁 Структура проекта

src/
    ├── components/ # UI-компоненты │ 
    │ ├── AddAssetForm.tsx # Форма добавления актива 
    │ └── PortfolioAnalytics.tsx # Аналитика портфеля (по желанию) 
    ├── constants/ # Константы (например, список активов) 
    │ └── assets.ts 
    ├── features/portfolio/ # Redux slice + компонент отображения портфеля 
    │ ├── PortfolioOverview.tsx 
    │ └── portfolioSlice.ts 
    ├── services/ # Работа с WebSocket 
    │ └── binanceSocket.ts 
    ├── store/ # Redux store + хуки 
    │ ├── hooks.ts │ └── index.ts 
    ├── styles/ # SCSS стили 
    │ └── globals.scss 
    ├── types/ # Типы данных 
    │ └── index.ts 
    ├── App.tsx # Корневой компонент 
    ├── main.tsx # Точка входа └── vite-env.d.ts # Типы окружения Vite

    
## 🧩 Функциональность

- 📈 Отображение портфеля с полями:
  - Название
  - Количество
  - Цена
  - Общая стоимость
  - Изменение за 24 часа (%)
  - Доля в портфеле (%)

- 🧮 Форма добавления актива:
  - Выбор из доступных активов
  - Указание количества
  - Добавление в портфель

- 🔄 Обновление цен в реальном времени с Binance WebSocket

- 💾 Сохранение данных в `localStorage`

- 🧹 Удаление актива кликом

- ⚡️ Виртуализация списка через `react-window` — плавная работа при 100+ активах

## 🛠️ Установка и запуск

```bash
# 1. Клонируем репозиторий
git clone https://github.com/your-username/portfolio-overview.git
cd portfolio-overview

# 2. Устанавливаем зависимости
npm install

# 3. Запускаем в режиме разработки
npm run dev
