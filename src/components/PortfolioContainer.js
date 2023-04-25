import React from "react";
import MyPortfolioStocks from "./MyPortfolioStocks";

function PortfolioContainer({stocks, onSellStock}) {
  
  return (
    <div>
      <h2>My Portfolio</h2>
      {stocks.map((stock) => {
        return <MyPortfolioStocks key={stock.id} stock={stock} onSellStock={onSellStock}/>
      })}
    </div>
  );
}

export default PortfolioContainer;
