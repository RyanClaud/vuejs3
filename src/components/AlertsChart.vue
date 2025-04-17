<template>
    <div class="alert-chart">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { Bar } from 'vue-chartjs' // Use Bar instead of Line
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js'
  
  // Register the required components for a bar chart
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'AlertsChart',
    components: {
      Bar, // Use Bar component
    },
    setup() {
      const chartCanvas = ref(null)
      const chartData = ref({
        labels: ['Drowsiness', 'Distraction', 'Other'],
        datasets: [
          {
            label: 'Alerts by Type',
            data: [5, 3, 2],
            backgroundColor: ['#f44336', '#ff9800', '#2196f3'],
          },
        ],
      })
  
      onMounted(() => {
        const ctx = chartCanvas.value.getContext('2d')
        new ChartJS(ctx, {
          type: 'bar', // Specify the chart type as 'bar'
          data: chartData.value,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Alert Type',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Alerts',
                },
              },
            },
          },
        })
      })
  
      return {
        chartCanvas,
      }
    },
  }
  </script>
  
  <style scoped>
  .alert-chart {
    width: 100%;
    height: 300px;
  }
  </style>