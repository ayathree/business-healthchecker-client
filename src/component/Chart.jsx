import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


const Chart = () => {
    const [reportData, setReportData] = useState(null);
    
      useEffect(() => {
        // Load data when component mounts
        const storedData = localStorage.getItem('businessHealthReport');
        if (storedData) {
            try {
                setReportData(JSON.parse(storedData));
            } catch (error) {
                console.error("Error parsing stored data:", error);
            }
        }
      }, []);
      if (!reportData || !reportData.scores) {
        return <div className="w-full md:w-1/2 p-4">Loading chart data...</div>;
    }
      const { scores } = reportData;

      const data = {
    labels: ['Market Scope', 'Market Size', 'Market Trend', 'Customer ID', 'Monthly Customers', 'Repeat %', 'Competitors'],
    datasets: [
      {
        data: [
          scores.marketScope,
          scores.marketSize,
          scores.marketTrend,
          scores.targetCustomer,
          scores.monthlyCustomers,
          scores.repeatCustomers,
          scores.competitors
        ],
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#8AC24A'
        ]
      }
    ]
  };
    return (
        <div className="w-full md:w-1/2 p-4">
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }}
      />
    </div>
    );
};

export default Chart;