import { FixedSizeList as List } from "react-window";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { removeAsset } from "./portfolioSlice";

export const PortfolioOverview = () => {
  const assets = useAppSelector((state) => state.portfolio.assets);
  const dispatch = useAppDispatch();

  const totalValue = assets.reduce((sum, asset) => sum + asset.amount * asset.price, 0);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const asset = assets[index];
    const total = asset.amount * asset.price;
    const share = totalValue ? ((total / totalValue) * 100).toFixed(2) : "0.00";

    return (
      <div
        className="asset-row"
        style={style}
        onClick={() => dispatch(removeAsset(asset.id))}
      >
        <div>{asset.name}</div>
        <div>{asset.amount}</div>
        <div>${asset.price.toFixed(2)}</div>
        <div>${total.toFixed(2)}</div>
        <div
          style={{
            color: asset.change24h >= 0 ? "green" : "red",
          }}
        >
          {asset.change24h.toFixed(2)}%
        </div>
        <div>{share}%</div>
      </div>
    );
  };

  return (
    <div className="portfolio-overview">
      <h2>Portfolio Overview</h2>

      <List
        height={400}
        itemCount={assets.length + 1}
        itemSize={60}
        width={'90vw'}
      >
        {({ index, style }) => {
          if (index === 0) {
            return (
              <div className="portfolio-header" style={style}>
                <div>Name</div>
                <div>Amount</div>
                <div>Price</div>
                <div>Total</div>
                <div>24h Change</div>
                <div>Share</div>
              </div>
            );
          }
          return <Row index={index - 1} style={style} />;
        }}
      </List>
    </div>
  );
};
