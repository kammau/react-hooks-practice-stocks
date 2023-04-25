import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [boughtStocks, setBoughtStocks] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("Tech");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
    .then((res) => res.json())
    .then((stockData) => setStocks(stockData))
  }, [])

  function handleBuyStock(stock) {
    setBoughtStocks([...boughtStocks, stock])
    const updatedStocks = stocks.filter((s) => s.id !== stock.id);
    setStocks(updatedStocks)
  }

  function handleSellStock(stock) {
    setStocks([...stocks, stock])
    const updatedBoughtStocks = boughtStocks.filter((s) => s.id !== stock.id);
    setBoughtStocks(updatedBoughtStocks)
  }

  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  });

  const filteredStocks = sortedStocks.filter((stock) => stock.type === filterBy)

  return (
    <div>
      <SearchBar sortBy={sortBy} onChangeSort={setSortBy} filterBy={filterBy} onChangeFilter={setFilterBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onBuyStock={handleBuyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={boughtStocks} onSellStock={handleSellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
