import React, { useRef } from 'react';
import { Bar } from '@nivo/bar';
import { useStocksQueries, useTheme } from '../hooks';
import { StoredStock } from '../types';

type Props = {
  stocks: StoredStock[];
};

const getArrayAvg = (arr: number[]): number =>
  arr.reduce((prev, curr) => prev + curr, 0) / arr.length;

const PerformanceBarChart: React.FC<Props> = ({ stocks }) => {
  const { isDarkTheme } = useTheme();
  const barChartRef = useRef<HTMLDivElement>(null);

  const queries = useStocksQueries(stocks);

  const isLoading =
    queries.length === 0 || queries.reduce((prev, curr) => prev || curr.isFetching, false);

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
    <section className="flex-grow bg-white dark:bg-slate-600/25 rounded-xl py-4 px-8 shadow-lg dark:ring-1 dark:ring-slate-100/10">
      <h2 className="text-center mb-8 text-2xl text-slate-900 dark:text-slate-200">Performance</h2>
      <p className="mb-6">The performance of the stock in relation to the 200 days average.</p>
      <div ref={barChartRef}>
        {isLoading && <h2>Loading</h2>}
        {!isLoading && (
          <Bar
            width={barChartRef.current?.offsetWidth || 900}
            height={500}
            margin={{ top: 40 }}
            labelSkipWidth={16}
            labelSkipHeight={16}
            keys={['change']}
            padding={0.4}
            colors={({ value }) => (value && value < 0 ? '#ef4444' : '#22c55e')}
            valueFormat={(v) => `${v}%`}
            data={data}
            indexBy={'ticker'}
            minValue={-30}
            maxValue={30}
            enableGridX={true}
            enableGridY={true}
            labelTextColor={({ color }) => (color === '#ef4444' ? '#fee2e2' : '#dcfce7')}
            tooltipLabel={(value) => `${value.data.name} (${value.data.ticker})`}
            axisTop={{
              tickSize: 0,
              tickPadding: 12,
              tickRotation: -30
            }}
            axisLeft={null}
            axisRight={null}
            markers={[
              {
                axis: 'y',
                value: 0,
                lineStyle: { stroke: isDarkTheme ? '#94a3b8' : '#64748b', strokeWidth: 1 }
              }
            ]}
            theme={{
              axis: { ticks: { text: { fill: isDarkTheme ? '#cbd5e1' : '#475569' } } },
              grid: { line: { stroke: isDarkTheme ? '#475569' : '#cbd5e1' } }
            }}
          />
        )}
      </div>
    </section>
  );
};

export default PerformanceBarChart;
