import { useAppSelector } from "../store/hooks";

export const PortfolioAnalytics = () => {
  const assets = useAppSelector((state) => state.portfolio.assets);
  const totalValue = assets.reduce((sum, asset) => sum + asset.amount * asset.price, 0);

  const totalChange24h = assets.reduce((sum, asset) => sum + (asset.amount * asset.price * asset.change24h) / 100, 0);
  const totalChangePercentage = totalValue ? ((totalChange24h / totalValue) * 100).toFixed(2) : "0.00";

  return (
    <div className="portfolio-analytics">
      <h3>Portfolio Analytics</h3>
      <div>Total Portfolio Value: ${totalValue.toFixed(2)}</div>
      <div>Total 24h Change: {totalChangePercentage}%</div>
    </div>
  );
};
