import React from 'react';
import { Bar } from '@nivo/bar';
import { useStocksQueries } from '../hooks';
import { StoredStock } from '../types';

type Props = {
  stocks: StoredStock[];
};

const getArrayAvg = (arr: number[]): number =>
  arr.reduce((prev, curr) => prev + curr, 0) / arr.length;

const PerformanceBarChart: React.FC<Props> = ({ stocks }) => {
  const queries = useStocksQueries(stocks);

  const isLoading =
    queries.length === 0 || queries.reduce((prev, curr) => prev || curr.isFetching, false);

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  const data = queries.map<{ ticker: string; name: string; change: string }>((query) => {
    const last200CloseQuotes = query.data?.closeQuotes?.slice(-200);
    let change = 0;

    if (last200CloseQuotes && query.data?.regularMarketPrice) {
      const last200DaysAverage = getArrayAvg(last200CloseQuotes);

      change = ((query.data?.regularMarketPrice - last200DaysAverage) / last200DaysAverage) * 100;
    }

    return {
      ticker: query.data!.ticker,
      name: query.data!.name,
      change: change.toFixed(2)
    };
  });

  return (
    <section className="flex-grow bg-white dark:bg-slate-600/25 rounded-xl p-12 shadow-lg dark:ring-1 dark:ring-slate-100/10">
      <Bar
        width={900}
        height={500}
        margin={{ top: 20 }}
        // margin={{ top: 60, right: 110, bottom: 60, left: 80 }}
        labelSkipWidth={16}
        labelSkipHeight={16}
        keys={['change']}
        padding={0.4}
        // colors={['#97e3d5', '#61cdbb', '#f47560', '#e25c3b']}
        colors={({ value }) => (value && value < 0 ? '#f47560' : '#61cdbb')}
        valueFormat={(v) => `${v}%`}
        data={data}
        indexBy={'name'}
        minValue={-100}
        maxValue={100}
        enableGridX={true}
        enableGridY={true}
        labelTextColor={'inherit:darker(1.2)'}
        axisTop={{
          tickSize: 0,
          tickPadding: 12
        }}
        // axisBottom={{
        //   legend: 'USERS',
        //   legendPosition: 'middle' as const,
        //   legendOffset: 50,
        //   tickSize: 0,
        //   tickPadding: 12
        // }}
        axisLeft={null}
        // axisRight={{
        //   format: (v: number) => `${Math.abs(v)}%`
        // }}
        axisRight={null}
        markers={[
          {
            axis: 'y',
            value: 0,
            lineStyle: { stroke: '#f47560', strokeWidth: 1 }
          }
          // {
          //   axis: 'y',
          //   value: 0,
          //   lineStyle: { stroke: '#f47560', strokeWidth: 1 },
          //   textStyle: { fill: '#e25c3b' },
          //   legend: 'loss',
          //   legendPosition: 'bottom-left',
          //   legendOrientation: 'vertical',
          //   legendOffsetY: 120
          // } as const
        ]}
      />
    </section>
  );
};

export default PerformanceBarChart;
