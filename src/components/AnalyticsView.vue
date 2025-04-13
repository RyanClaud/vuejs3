<template>
    <div class="analytics-container">
      <h2>Analytics Overview</h2>
  
      <!-- Key Metrics Section -->
      <div class="metrics-section">
        <div class="metric-card">
          <div class="metric-title">Total Alerts</div>
          <div class="metric-value">450</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Active Helmets</div>
          <div class="metric-value">300</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Critical Alerts</div>
          <div class="metric-value">50</div>
        </div>
      </div>
  
      <!-- Chart Section -->
      <div class="chart-section">
        <h3>Alert Trends</h3>
        <LineChart />
      </div>
    </div>
  </template>
  
  <script>
  import LineChart from '@/components/LineChart.vue' // Import the reusable LineChart component
  
  export default {
    name: 'AnalyticsView',
    components: {
      LineChart,
    },
  }
  </script>
  
  <style scoped>
  .analytics-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .metrics-section {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .metric-card {
    flex: 1;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .metric-title {
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
  }
  
  .metric-value {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  
  .chart-section {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    font-size: 20px;
    margin-bottom: 20px;
    color: #333;
  }
  </style>