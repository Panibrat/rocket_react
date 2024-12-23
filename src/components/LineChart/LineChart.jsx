import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './LineChart.module.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { MAX_CHART_Y_VALUE } from '../../constants/common';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ data }) => {
  // Sort data by time to ensure lines flow correctly
  // const sortedData = data.sort((a, b) => a.time - b.time);
  const sortedData = data; //TODO: do we need sort?

  // Extract values and times
  const values = sortedData.map((point) => point.value);
  const times = sortedData.map((point) => point.time);

  // Determine color and style for each segment based on the lineType
  const getBorderColor = (index) => {
    if (!sortedData || !sortedData[index]) {
      return 'yellow';
    }
    const lineType = sortedData[index].lineType;
    switch (lineType) {
      case 'red':
        return '#C13211';
      case 'black':
        return '#777777';
      case 'dottedGrey':
        return '#777777';
      default:
        return '#777777';
    }
  };

  const getBorderDash = (index) => {
    return sortedData[index].lineType === 'dottedGrey' ? [5, 5] : [];
  };

  const chartData = {
    labels: times,
    datasets: [
      {
        label: 'Line Chart',
        data: values,
        pointRadius: 0, // Removes points from the chart
        fill: false,
        segment: {
          // borderColor: (ctx) => getBorderColor(ctx.p0DataIndex),
          borderColor: (ctx) => {
            return getBorderColor(ctx.p0DataIndex);
          },
          borderDash: (ctx) => getBorderDash(ctx.p0DataIndex)
        }
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    animation: false, // TODO: make true?
    maintainAspectRatio: false, // Allows custom height
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (sec)'
        }
        // min: 10
      },
      y: {
        // title: {
        //     display: true,
        //     text: 'Value',
        // },
        max: MAX_CHART_Y_VALUE
      }
    }
  };

  return (
    <div className={styles.chartContainer}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
