import React from 'react';
import { Bar } from '@nivo/bar';
import { Stock } from './types';

type Props = {
  stocks: Stock[];
};

const PerformanceBarChart: React.FC<Props> = ({ stocks }) => {
  const mockData = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
    return {
      change: -40 + 10 * i,
      stock: ['AAPL', 'BAT', 'TIO', 'ABB', 'ABBV', 'BYND', 'BYD', 'BXP', 'BX'][i]
    };
  });

  return (
    <section className="bg-white dark:bg-slate-600/25 rounded-xl p-12 shadow-lg dark:ring-1 dark:ring-slate-100/10">
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

export default PerformanceBarChart;
