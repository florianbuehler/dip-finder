import React, { useState } from 'react';
import { IconButton } from '../../components';
import { useStocksQueries } from '../../hooks';
import { Stock, StoredStock } from '../../types';
import AddStockCard from './AddStockCard';
import StockOverviewCard from './StockOverviewCard';

type Props = {
  isLoading: boolean;
  successfullyLoaded: boolean;
  stocks: StoredStock[];
  onAddStock: (stock: Stock) => void;
  onDelete: (ticker: string) => void;
};

const StocksOverview: React.FC<Props> = ({ successfullyLoaded, stocks, onAddStock, onDelete }) => {
  const [selectedStock, setSelectedStock] = useState<string>();
  const [showAddStockCard, setShowAddStockCard] = useState(false);

  const queries = useStocksQueries(stocks);

  const handleAddStock = (stock: Stock) => {
    onAddStock(stock);
    setShowAddStockCard(false);
  };

  return (
    <section className="relative flex flex-col bg-white dark:bg-slate-600/25 rounded-xl pt-4 pb-2 px-0 shadow-lg dark:ring-1 dark:ring-slate-100/10 w-96 h-[calc(100vh_-_7rem)]">
      <IconButton
        iconName="plus"
        onClick={() => setShowAddStockCard(true)}
        className="absolute top-1 right-1 fill-slate-500 hover:fill-sky-500"
      />
      <h2 className="text-center mb-6 text-2xl text-slate-900 dark:text-slate-200">Stocks</h2>

      {successfullyLoaded && queries.length === 0 && <h3>no stocks - todo</h3>}

      {showAddStockCard && (
        <AddStockCard
          onAddStock={handleAddStock}
          onAddStockCancel={() => setShowAddStockCard(false)}
        />
      )}
      {successfullyLoaded && queries.length !== 0 && (
        <div className="flex flex-grow flex-shrink basis-auto flex-col gap-2 overflow-auto scrollbar-none">
          {queries.map((query) => (
            <StockOverviewCard
              key={query.data?.ticker}
              query={query}
              isSelected={!!query.data?.ticker && selectedStock === query.data?.ticker}
              onSelection={(ticker: string) => setSelectedStock(ticker)}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default StocksOverview;
