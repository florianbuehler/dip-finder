import React, { useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import AddStockCard from './AddStockCard';
import StockOverviewCard from './StockOverviewCard';
import { Stock } from './types';
import { IconButton } from './index';

type Props = {
  isLoading: boolean;
  successfullyLoaded: boolean;
  queries: UseQueryResult<Stock>[];
  onAddStock: (stock: Stock) => void;
  onDelete: (ticker: string) => void;
};

const StocksOverview: React.FC<Props> = ({ successfullyLoaded, queries, onAddStock, onDelete }) => {
  const [selectedStock, setSelectedStock] = useState<string>();
  const [showAddStockCard, setShowAddStockCard] = useState(false);

  const handleAddStock = (stock: Stock) => {
    onAddStock(stock);
    setShowAddStockCard(false);
  };

  return (
    <section className="relative bg-white dark:bg-slate-600/25 rounded-xl py-4 px-0 shadow-lg dark:ring-1 dark:ring-slate-100/10 w-96">
      <IconButton
        iconName="plus"
        onClick={() => setShowAddStockCard(true)}
        className="absolute top-2 right-2 h-7 w-7 p-1 fill-slate-500 hover:fill-sky-500"
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
        <div className="flex flex-col gap-2">
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
