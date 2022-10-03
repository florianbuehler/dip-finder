import React, { useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { Stock } from './types';

type Props = {
  query: UseQueryResult<Stock>;
};

const StockOverviewCard: React.FC<Props> = ({ query }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div
      onClick={() => setEditMode(!editMode)}
      className="flex items-center px-4 py-2 hover:bg-sky-500/10 rounded-md cursor-pointer"
    >
      <div className="flex-grow">
        <p>{query.data?.name}</p>
        <p className="text-xs text-slate-400 dark:text-slate-400">{query.data?.ticker}</p>
      </div>
      <div>{query.data?.price?.toFixed(2)} €</div>
      {editMode && <div className="bg-red-200">X</div>}
    </div>
  );
};

export default StockOverviewCard;
