<template>
  <div class="helmets-view">
    <h2>Helmets Overview</h2>
    <table class="helmets-table">
      <thead>
        <tr>
          <th>Helmets ID</th>
          <th>User</th>
          <th>Battery Level</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="helmet in helmets" :key="helmet.id">
          <td>{{ helmet.id }}</td>
          <td>{{ helmet.user }}</td>
          <td>{{ helmet.batteryLevel }}%</td>
          <td>
            <span :class="getStatusClass(helmet.status)">
              {{ helmet.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HelmetsView',
  setup() {
    const helmets = ref([
      { id: 'H-1042', user: 'John Doe', batteryLevel: 85, status: 'Active' },
      { id: 'H-1038', user: 'Jane Smith', batteryLevel: 15, status: 'Critical' },
    ])

    const getStatusClass = (status) => {
      return status === 'Active' ? 'active' : 'critical'
    }

    return {
      helmets,
      getStatusClass,
    }
  },
}
</script>

<style scoped>
.helmets-view {
  padding: 20px;
}

.helmets-table {
  width: 100%;
  border-collapse: collapse;
}

.helmets-table th, .helmets-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.active {
  color: green;
}

.critical {
  color: red;
}
</style>