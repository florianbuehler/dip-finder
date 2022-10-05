import React, { useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import StockOverviewCard from './StockOverviewCard';
import { Stock } from './types';
import { IconButton, Input } from './index';

type Props = {
  isLoading: boolean;
  successfullyLoaded: boolean;
  queries: UseQueryResult<Stock>[];
  onDelete: (ticker: string) => void;
};

const StocksOverview: React.FC<Props> = ({ successfullyLoaded, queries, onDelete }) => {
  const [selectedStock, setSelectedStock] = useState<string>();
  const [showAddStockCard, setShowAddStockCard] = useState(false);

  const closeStockCard = () => {
    setShowAddStockCard(false);
  };

  const AddStockCard = () => (
    <div className="flex flex-col gap-4 px-4 py-2 mb-4 bg-sky-500/10 rounded-md">
      <div className="flex flex-row self-end">
        <IconButton
          iconName="cancel"
          onClick={closeStockCard}
          className="h-7 w-7 p-1.5 fill-slate-500"
        />
        <IconButton
          iconName="floppy-disk"
          onClick={() => console.log('save')}
          className="h-7 w-7 p-1.5 mr-[-0.5rem]"
        />
      </div>
      <div className="flex flex-row gap-4">
        <Input type="text" label="Stock name" className="flex-grow mb-0" />
        <Input type="text" label="Stock symbol" className="w-32 mb-0" />
      </div>
    </div>
  );

  return (
    <section className="relative bg-white dark:bg-slate-600/25 rounded-xl py-4 shadow-lg dark:ring-1 dark:ring-slate-100/10 w-96">
      <IconButton
        iconName="plus"
        onClick={() => setShowAddStockCard(true)}
        className="absolute top-2 right-2 h-7 w-7 p-1 fill-slate-500 hover:fill-sky-500"
      />
      <h2 className="text-center mb-5 text-2xl text-slate-900 dark:text-slate-200">Stocks</h2>

      {successfullyLoaded && queries.length === 0 && <h3>no stocks - todo</h3>}

      {showAddStockCard && <AddStockCard />}
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
