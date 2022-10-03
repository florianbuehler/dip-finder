import React, { useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { Stock } from './types';
import { IconButton } from './index';

type Props = {
  query: UseQueryResult<Stock>;
  isSelected: boolean;
  onSelection: (ticker: string) => void;
  onDelete: (ticker: string) => void;
};

const StockOverviewCard: React.FC<Props> = ({ query, isSelected, onSelection, onDelete }) => {
  const [inEditMode, setInEditMode] = useState(false);

  const handleSelection = () => {
    setInEditMode(!inEditMode);
    query.data?.ticker && onSelection(query.data?.ticker);
  };

  return (
    <div
      onClick={handleSelection}
      className={`flex items-center px-4 py-2 hover:bg-sky-500/10 rounded-md cursor-pointer ${
        isSelected && 'bg-sky-500/10'
      }`}
    >
      <div className="flex-grow">
        <p>{query.data?.name}</p>
        <p className="text-xs text-slate-400 dark:text-slate-400">{query.data?.ticker}</p>
      </div>
      {query.data?.regularMarketPrice && <div>{query.data?.regularMarketPrice?.toFixed(2)} €</div>}
      {inEditMode && (
        <IconButton
          iconName="trash-can"
          onClick={() => query.data?.ticker && onDelete(query.data?.ticker)}
          className="h-8 w-8 ml-2 mr-[-0.75rem] hover:bg-red-600/20"
          iconClassName="fill-red-600"
        />
      )}
    </div>
  );
};

export default StockOverviewCard;
