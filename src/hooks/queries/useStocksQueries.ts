import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { Stock, StoredStock } from '../../types';

type YahooFinanceStockChart = {
  chart: {
    result: {
      meta: {
        currency: string;
        regularMarketTime: number;
        regularMarketPrice: number;
      };
      timestamp: number[];
      indicators: {
        quote: {
          close: number[];
        }[];
      };
    }[];
  };
};

const getFinanceChart = async (ticker: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CORS_PROXY}https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1y`
  );

  if (!response.ok) {
    throw new Error('Oops an error occurred!');
  }

  return response.json();
};

const useStocksQueries = (stocks: StoredStock[]): UseQueryResult<Stock>[] => {
  return useQueries({
    queries: stocks.map((stock) => {
      return {
        queryKey: ['stocks', stock.ticker],
        placeholderData: { ...stock },
        queryFn: () => getFinanceChart(stock.ticker),
        staleTime: 1000 * 60 * 15,
        cacheTime: 1000 * 60 * 15,
        select: (data: YahooFinanceStockChart) => {
          const result = data.chart?.result[0];
          const metaData = result?.meta;
          const timestamps = result?.timestamp;
          const closeQuotes = result?.indicators.quote[0].close;

          if (!result) {
            return {
              ticker: stock.ticker,
              name: stock.name,
              regularMarketTime: undefined,
              currency: undefined,
              regularMarketPrice: undefined,
              previousPrice: undefined,
              closeQuotes: undefined
            };
          }

          return {
            ticker: stock.ticker,
            name: stock.name,
            regularMarketTime: new Date(metaData.regularMarketTime * 1000),
            currency: metaData.currency,
            regularMarketPrice: metaData.regularMarketPrice,
            previousPrice:
              new Date(metaData.regularMarketTime * 1000).getDate() ===
              new Date((timestamps.at(-1) || 0) * 1000).getDate()
                ? closeQuotes.at(-2)
                : closeQuotes.at(-1),
            closeQuotes: closeQuotes
          };
        }
      };
    })
  });
};

export default useStocksQueries;
