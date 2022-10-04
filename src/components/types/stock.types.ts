export type Stock = {
  name: string;
  ticker: string;
  regularMarketTime: Date | undefined;
  currency: string | undefined;
  regularMarketPrice: number | undefined;
  previousPrice: number | undefined;
};
