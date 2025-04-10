import { PortfolioOverview } from "./features/portfolio/PortfolioOverview";
import { AddAssetForm } from "./components/AddAssetForm";
import { PortfolioAnalytics } from "./components/PortfolioAnalytics";

function App() {
  return (
    <div className="App">
      <h1>Crypto Portfolio</h1>
      <AddAssetForm />
      <PortfolioAnalytics />
      <PortfolioOverview />
    </div>
  );
}

export default App;
