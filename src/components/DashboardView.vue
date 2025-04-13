<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="logo">VIGILERT</div>
      <div class="user-profile">
        <div class="avatar">{{ initials }}</div>
        <div class="user-info">
          <div class="username">{{ user?.displayName }}</div>
          <div class="email">{{ user?.email }}</div>
        </div>
      </div>
      <div class="menu">
        <!-- Fixed Paths for Router Links -->
        <div 
          class="menu-item" 
          :class="{ active: $route.path === '/dashboard' }"
          @click="$router.push('/dashboard')"
          data-icon="🏠"
        >
          Dashboard
        </div>
        <div 
          class="menu-item" 
          :class="{ active: $route.path === '/dashboard/alerts' }"
          @click="$router.push('/dashboard/alerts')"
          data-icon="⚠️"
        >
          Alerts
        </div>
        <div 
          class="menu-item" 
          :class="{ active: $route.path === '/dashboard/users' }"
          @click="$router.push('/dashboard/users')"
          data-icon="👥"
        >
          Users
        </div>
        <div 
          class="menu-item" 
          :class="{ active: $route.path === '/dashboard/helmets' }"
          @click="$router.push('/dashboard/helmets')"
          data-icon="🪖"
        >
          Helmets
        </div>
        <div 
          class="menu-item" 
          :class="{ active: $route.path === '/dashboard/analytics' }"
          @click="$router.push('/dashboard/analytics')"
          data-icon="📊"
        >
          Analytics
        </div>
        <div 
          class="menu-item" 
          :class="{ active: $route.path === '/dashboard/settings' }"
          @click="$router.push('/dashboard/settings')"
          data-icon="⚙️"
        >
          Settings
        </div>
      </div>
      <div class="logout-section">
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </div>
    <!-- Content -->
    <div class="content">
      <!-- Conditional rendering for Dashboard Overview -->
      <div v-if="$route.path === '/dashboard'">
        <h1 class="page-title">Dashboard Overview</h1>
        <!-- Stats Cards -->
        <div class="stats-cards">
          <div class="stat-card green-border">
            <div class="stat-title">Active Helmets</div>
            <div class="stat-value">42</div>
          </div>
          <div class="stat-card red-border">
            <div class="stat-title">Alerts Today</div>
            <div class="stat-value">7</div>
          </div>
          <div class="stat-card blue-border">
            <div class="stat-title">Active Users</div>
            <div class="stat-value">38</div>
          </div>
          <div class="stat-card orange-border">
            <div class="stat-title">Battery Critical</div>
            <div class="stat-value">3</div>
          </div>
        </div>
        <!-- Alert Activity Chart -->
        <div class="chart-container">
          <h2>Alert Activity</h2>
          <AlertsView />
        </div>
        <!-- Recent Alerts Table -->
        <div class="recent-alerts">
          <h2>Recent Alerts</h2>
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
              <tr v-for="alert in recentAlerts" :key="alert.id">
                <td>{{ alert.user }}</td>
                <td class="helmet-id">{{ alert.helmetId }}</td>
                <td>
                  <span class="alert-type" :class="getAlertTypeClass(alert.type)">
                    {{ alert.type }}
                  </span>
                </td>
                <td>{{ alert.time }}</td>
                <td>
                  <span class="status" :class="getStatusClass(alert.status)">
                    {{ alert.status }}
                  </span>
                </td>
                <td>
                  <button class="view-btn">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Placeholder for Child Routes -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { auth, signOutUser } from '@/firebase.js' // Use signOutUser for consistency
import { useAuth } from '@/composables/useAuth'
import AlertsView from '@/components/AlertsView.vue'

export default {
  name: 'DashboardView',
  components: {
    AlertsView,
  },
  setup() {
    const router = useRouter()
    const { user } = useAuth()

    // Compute initials for the avatar
    const initials = computed(() => {
      if (user.value?.displayName) {
        return user.value.displayName
          .split(' ')
          .map((name) => name[0])
          .join('')
          .toUpperCase()
      }
      return 'U'
    })

    // Logout function
    const logout = async () => {
      try {
        await signOutUser() // Use the centralized logout function
        router.push('/login') // Redirect to login page
      } catch (error) {
        console.error('Error logging out:', error)
        alert('Failed to log out. Please try again.')
      }
    }

    // Recent alerts data
    const recentAlerts = ref([
      {
        id: 1,
        user: 'John Doe',
        helmetId: 'H-1042',
        type: 'Drowsiness',
        time: '10:45 AM',
        status: 'Resolved',
      },
      {
        id: 2,
        user: 'Jane Smith',
        helmetId: 'H-1038',
        type: 'Distraction',
        time: '10:30 AM',
        status: 'Pending',
      },
    ])

    // Method to determine alert type class
    const getAlertTypeClass = (type) => {
      switch (type) {
        case 'Drowsiness':
          return 'drowsiness'
        case 'Distraction':
          return 'distraction'
        default:
          return ''
      }
    }

    // Method to determine status class
    const getStatusClass = (status) => {
      switch (status) {
        case 'Resolved':
          return 'resolved'
        case 'Pending':
          return 'pending'
        default:
          return ''
      }
    }

    return {
      user,
      initials,
      logout,
      recentAlerts,
      getAlertTypeClass,
      getStatusClass,
    }
  },
}
</script>

<style scoped>
/* Existing styles */
.dashboard-container {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 240px;
  background-color: #263238;
  color: white;
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
}

.user-profile {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.avatar {
  width: 36px;
  height: 36px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
}

.email {
  font-size: 12px;
  opacity: 0.7;
}

.menu {
  flex: 1;
}

.menu-item {
  padding: 15px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative; /* Ensure icons are positioned correctly */
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-section {
  padding: 20px;
}

.logout-btn {
  width: 100%;
  padding: 10px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  overflow-y: auto;
}

.page-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}

.stat-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.green-border::before {
  background-color: #4caf50;
}

.red-border::before {
  background-color: #f44336;
}

.blue-border::before {
  background-color: #2196f3;
}

.orange-border::before {
  background-color: #ff9800;
}

.stat-title {
  color: #666;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.chart-container, .recent-alerts {
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.chart-container h2, .recent-alerts h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}

.alerts-table {
  width: 100%;
  border-collapse: collapse;
}

.alerts-table th, .alerts-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.alerts-table th {
  font-weight: bold;
  color: #666;
}

.helmet-id {
  color: #2196f2;
}

.alert-type {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  color: white;
}

.drowsiness {
  background-color: #f44336;
}

.distraction {
  background-color: #ff9800;
}

.status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  color: white;
}

.resolved {
  background-color: #4caf50;
}

.pending {
  background-color: #2196f3;
}

.view-btn {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .sidebar {
    width: 60px; /* Collapsed width */
  }
  .logo, .user-info, .menu-item {
    display: none; /* Hide text content */
  }
  .avatar {
    margin: 0 auto; /* Center the avatar */
  }
  .menu-item::before {
    content: attr(data-icon); /* Show icons */
    font-size: 20px;
    color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>