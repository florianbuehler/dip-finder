import React, { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { deleteDoc, getDocs, collection, doc, addDoc, setDoc } from 'firebase/firestore';
import type { NextPage } from 'next';
import Head from 'next/head';
import { PerformanceBarChart, StocksOverview } from '../components';
import { Stock } from '../components/types';
import { database } from '../config/firebase';
import { useAuth } from '../hooks';

type StoredStock = {
  name: string;
  ticker: string;
};

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

const getStocksFromFirestore = async (userId: string): Promise<StoredStock[]> => {
  const querySnapshot = await getDocs(collection(database, `users/${userId}/stocks`));

  return querySnapshot.docs.map((doc) => {
    // doc.data() is never undefined for query doc snapshots
    return doc.data() as StoredStock;
  });
};

const sortStocks = (stock1: StoredStock, stock2: StoredStock) => {
  if (stock1.name < stock2.name) {
    return -1;
  }

  if (stock1.name > stock2.name) {
    return 1;
  }

  return 0;
};

const Home: NextPage = () => {
  const { user } = useAuth();
  const [stocks, setStocks] = useState<StoredStock[]>([]);
  const [isLoadingStocks, setIsLoadingStocks] = useState(false);
  const [successfullyLoadedStocks, setSuccessfullyLoadedStocks] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      const getStocks = async () => {
        setIsLoadingStocks(true);

        try {
          const stocksFromFirestore = await getStocksFromFirestore(user?.uid);
          setSuccessfullyLoadedStocks(true);
          setStocks(stocksFromFirestore.sort(sortStocks));
        } catch (e) {
          console.error('error:', e);
        }

        setIsLoadingStocks(false);
      };

      void getStocks();

      // setDoc(doc(database, `users/${user?.uid}/stocks`, 'ABBV.VI'), {
      //   name: 'AbbVie',
      //   ticker: 'ABBV.VI'
      // });
      // setDoc(doc(database, `users/${user?.uid}/stocks`, 'ALV.DE'), {
      //   name: 'Allianz',
      //   ticker: 'ALV.DE'
      // });
      // setDoc(doc(database, `users/${user?.uid}/stocks`, 'BAS.DE'), {
      //   name: 'BASF',
      //   ticker: 'BAS.DE'
      // });
      // setDoc(doc(database, `users/${user?.uid}/stocks`, 'BMT.DE'), {
      //   name: 'British American Tobacco',
      //   ticker: 'BMT.DE'
      // });
      // setDoc(doc(database, `users/${user?.uid}/stocks`, 'SRB.F'), {
      //   name: 'Starbucks',
      //   ticker: 'SRB.F'
      // });
      // setDoc(doc(database, `users/${user?.uid}/stocks`, 'RHM.DE'), {
      //   name: 'Rheinmetall',
      //   ticker: 'RHM.DE'
      // });
    }
  }, [user?.uid]);

  const stockQueries = useQueries({
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
              previousPrice: undefined
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
                : closeQuotes.at(-1)
          };
        }
      };
    })
  });

  console.log('stockQueries:', stockQueries);

  const handleAddStock = async (stock: Stock) => {
    setStocks((prevStocks) =>
      [...prevStocks, { name: stock.name, ticker: stock.ticker }].sort(sortStocks)
    );
    await setDoc(doc(database, `users/${user?.uid}/stocks`, stock.ticker), {
      name: stock.name,
      ticker: stock.ticker
    });
  };

  const handleStockDelete = async (ticker: string) => {
    setStocks((prevStocks) => prevStocks.filter((stock) => stock.ticker != ticker));
    await deleteDoc(doc(database, `users/${user?.uid}/stocks`, ticker));
  };

  return (
    <>
      <Head>
        <title>Dip Finder</title>

        <meta name="description" content="Generated by create next app" />
      </Head>
      <>
        <StocksOverview
          isLoading={isLoadingStocks}
          successfullyLoaded={successfullyLoadedStocks}
          queries={stockQueries}
          onAddStock={handleAddStock}
          onDelete={handleStockDelete}
        />
        <PerformanceBarChart stocks={[]} />
      </>
    </>
  );
};

export default Home;
