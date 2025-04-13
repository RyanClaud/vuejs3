<template>
  <div class="alerts-view">
    <h2>Alerts Overview</h2>
    <table class="alerts-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Helmet ID</th>
          <th>Alert Type</th>
          <th>Time</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alert in alerts" :key="alert.id">
          <td>{{ alert.user }}</td>
          <td>{{ alert.helmetId }}</td>
          <td>{{ alert.type }}</td>
          <td>{{ alert.time }}</td>
          <td>
            <span :class="getStatusClass(alert.status)">
              {{ alert.status }}
            </span>
          </td>
          <td>
            <button @click="resolveAlert(alert.id)">Resolve</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AlertsView',
  setup() {
    const alerts = ref([
      { id: 1, user: 'John Doe', helmetId: 'H-1042', type: 'Drowsiness', time: '10:45 AM', status: 'Pending' },
      { id: 2, user: 'Jane Smith', helmetId: 'H-1038', type: 'Distraction', time: '10:30 AM', status: 'Resolved' },
    ])

    const getStatusClass = (status) => {
      return status === 'Resolved' ? 'resolved' : 'pending'
    }

    const resolveAlert = (id) => {
      const alert = alerts.value.find((a) => a.id === id)
      if (alert) alert.status = 'Resolved'
    }

    return {
      alerts,
      getStatusClass,
      resolveAlert,
    }
  },
}
</script>

<style scoped>
.alerts-view {
  padding: 20px;
}

.alerts-table {
  width: 100%;
  border-collapse: collapse;
}

.alerts-table th, .alerts-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.resolved {
  color: green;
}

.pending {
  color: orange;
}

button {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>