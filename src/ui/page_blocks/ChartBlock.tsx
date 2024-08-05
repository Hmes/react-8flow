import { useEffect, useState } from 'react';
import { BarChart } from '../components/Chart';
import { useToastContext } from '../providers/toast';

interface ChartData {
  datasetOne: number[];
  datasetTwo: number[];
}

export function ChartBlock() {
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [minValue, setMinValue] = useState<number | ''>('')
  const [maxValue, setMaxValue] = useState<number | ''>('')
  const { renderToast } = useToastContext();

  const fetchChartData = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/data/chart-data',
        {
          method: 'POST',
          body: JSON.stringify({minValue, maxValue}),
        }
      );
      const result = await response.json();

      if(result.status === 'success') {
        setChartData(result.data);
        renderToast('success', 'Data load success');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      renderToast('error', 'Error loading data')
    }
  }

  useEffect(() => {
    fetchChartData();
  }, [minValue, maxValue])

  const handleReset = () => {
    setMinValue('');
    setMaxValue('');
  }

  const getChartData = () => {
    if (!chartData) return null;

    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Dataset 1',
          data: chartData.datasetOne,
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Dataset 2',
          data: chartData.datasetTwo,
          backgroundColor: 'rgb(54, 162, 235)',
        },
      ],
    };
  };

  return (
    <div>
      <div className='mb-12 flex items-center'>
        <div className='flex flex-col mx-4'>
          <span className='text-sm'>Min</span>
          <input
            type='number'
            className='w-24 h-8 text-sm'
            value={minValue}
            onChange={(e) => setMinValue(e.target.value ? Number(e.target.value) : '')}
          />
        </div>
        <div className='flex flex-col mx-4'>
          <span className='text-sm'>Max</span>
          <input
            type='number'
            className='w-24 h-8 text-sm'
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value ? Number(e.target.value) : '')}
          />
        </div>
        <div className='flex flex-col mx-4 pt-4 w-100'>
          <button
            className={`
              bg-blue-600 flex justify-center items-center h-10 text-center 
              text-white border focus:outline-none focus:ring-4 font-sm 
              rounded-lg text-sm px-5 py-1.9
            `}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      <div>
        {
          chartData && (
            <BarChart
              width={600}
              height={300}
              data={getChartData()!}
            />
          )
        }
      </div>
    </div>
  );
}
