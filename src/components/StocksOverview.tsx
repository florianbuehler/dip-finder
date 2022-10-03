import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import StockOverviewCard from './StockOverviewCard';
import { Stock } from './types';

type Props = {
  queries: UseQueryResult<Stock>[];
};

const StocksOverview: React.FC<Props> = ({ queries }) => {
  return (
    <section className="bg-white dark:bg-slate-600/25 rounded-xl w-96 py-4 shadow-lg dark:ring-1 dark:ring-slate-100/10">
      <h2 className="text-center mb-4 text-2xl text-slate-900 dark:text-slate-200">Stocks</h2>
      <div className="flex flex-col gap-2">
        {queries.map((query) => (
          <StockOverviewCard key={query.data?.ticker} query={query} />
        ))}
      </div>
    </section>
  );
};

export default StocksOverview;
