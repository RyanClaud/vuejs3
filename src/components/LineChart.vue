<template>
    <div class="chart-container">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement,
  } from 'chart.js'
  
  // Register Chart.js components
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
  )
  
  export default defineComponent({
    name: 'LineChart',
    components: {
      Line,
    },
    data() {
      return {
        // Chart data
        chartData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Alerts',
              data: [40, 80, 60, 90, 70, 80, 90, 100, 110, 100, 120, 140],
              borderColor: '#2196f3',
              backgroundColor: '#2196f3',
              fill: false,
            },
          ],
        },
        // Chart options
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      }
    },
  })
  </script>
  
  <style scoped>
  .chart-container {
    height: 300px; /* Fixed height for the chart */
  }
  </style>