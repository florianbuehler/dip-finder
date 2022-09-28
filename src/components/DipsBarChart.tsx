import React from 'react';
import { Bar } from '@nivo/bar';
import { useQuery } from '@tanstack/react-query';

type Props = {
  tickers: string[];
};

const getFinanceChart = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CORS_PROXY}https://query1.finance.yahoo.com/v8/finance/chart/ALV.DE?interval=1d&range=1y`
  );

  console.log('response:', response);

  if (!response.ok) {
    throw new Error('Oops an error occurred!');
  }

  return response.json();
};

const DipsBarChart: React.FC<Props> = ({ tickers }) => {
  const mockData = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
    return {
      change: -40 + 10 * i,
      stock: ['AAPL', 'BAT', 'TIO', 'ABB', 'ABBV', 'BYND', 'BYD', 'BXP', 'BX'][i]
    };
  });

  const { data } = useQuery([tickers[1]], getFinanceChart, {
    staleTime: 1000 * 60 * 15,
    cacheTime: 1000 * 60 * 15
  });

  console.log('data:', data);

  return (
    <section className="bg-slate-50 rounded-xl shadow-lg p-12">
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
        data={mockData}
        indexBy={'stock'}
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

export default DipsBarChart;
