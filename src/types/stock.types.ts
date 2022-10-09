export type Stock = {
  name: string;
  ticker: string;
  regularMarketTime: Date | undefined;
  currency: string | undefined;
  regularMarketPrice: number | undefined;
  previousPrice: number | undefined;
  closeQuotes: number[] | undefined;
};

export type StoredStock = {
  name: string;
  ticker: string;
};
