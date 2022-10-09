import React, { useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { IconButton } from '../../components';
import { Icon } from '../../components/icons';
import { Stock } from '../../types';

type Props = {
  query: UseQueryResult<Stock>;
  isSelected: boolean;
  onSelection: (ticker: string) => void;
  onDelete: (ticker: string) => void;
};

const getMonthAbbreviation = (number: number): string => {
  switch (number) {
    case 1:
      return 'Jan';
    case 2:
      return 'Feb';
    case 3:
      return 'Mar';
    case 4:
      return 'Apr';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'Aug';
    case 9:
      return 'Sept';
    case 10:
      return 'Oct';
    case 11:
      return 'Nov';
    case 12:
      return 'Dec';
    default:
      throw new Error(`No month with number ${number} exists.`);
  }
};

const getTimeDisplay = (time: Date): string => {
  return `${time.getDate()}. ${getMonthAbbreviation(
    time.getMonth() + 1
  )}. ${time.getHours()}:${time.getMinutes()}`;
};

const StockOverviewCard: React.FC<Props> = ({ query, isSelected, onSelection, onDelete }) => {
  const [inEditMode, setInEditMode] = useState(false);

  const handleSelection = () => {
    setInEditMode(!inEditMode);
    query.data?.ticker && onSelection(query.data?.ticker);
  };

  const regularMarketPrice = query.data?.regularMarketPrice;
  const previousPrice = query.data?.previousPrice;

  const change =
    regularMarketPrice && previousPrice
      ? (regularMarketPrice - previousPrice) / previousPrice
      : undefined;

  return (
    <div
      onClick={handleSelection}
      className={`flex gap-2 items-center px-4 py-2 hover:bg-sky-500/10 cursor-pointer ${
        isSelected && 'bg-sky-500/10'
      }`}
    >
      <div className="flex-grow flex flex-col">
        <span>{query.data?.name}</span>
        <span className="text-sm text-slate-400 dark:text-slate-500">{query.data?.ticker}</span>
      </div>
      {change && (
        <div className="flex flex-col items-center w-16">
          <Icon
            name={change < 0 ? 'arrow-trend-down' : 'arrow-trend-up'}
            className={`w-6 ${change > 0 ? 'fill-green-600' : 'fill-red-600'}`}
          />
          <span className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change < 0 && '-'} {Math.abs(change * 100).toFixed(2)} %
          </span>
        </div>
      )}
      <div className="flex flex-col items-end w-20">
        {query.data?.regularMarketPrice && (
          <span>{query.data?.regularMarketPrice?.toFixed(2)} €</span>
        )}
        {query.data?.regularMarketTime && (
          <span className="text-xs text-slate-500">
            {getTimeDisplay(query.data.regularMarketTime)}
          </span>
        )}
      </div>
      {inEditMode && (
        <IconButton
          iconName="trash-can"
          onClick={() => query.data?.ticker && onDelete(query.data?.ticker)}
          className="h-4 w-4 ml-1 mr-[-0.5rem] fill-red-600 hover:fill-red-400"
        />
      )}
    </div>
  );
};

export default StockOverviewCard;
