// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/HomeView.vue'
import LoginView from '@/components/LoginView.vue'
import RegisterView from '@/components/RegisterView.vue'
import DashboardView from '@/components/DashboardView.vue'
import AlertsView from '@/components/AlertsView.vue'
import UsersView from '@/components/UsersView.vue'
import HelmetsView from '@/components/HelmetsView.vue'
import AnalyticsView from '@/components/AnalyticsView.vue'
import SettingsView from '@/components/SettingsView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/dashboard',
    component: DashboardView,
    children: [
      { path: '', component: AlertsView }, // Default child route
      { path: 'alerts', component: AlertsView },
      { path: 'users', component: UsersView },
      { path: 'helmets', component: HelmetsView },
      { path: 'analytics', component: AnalyticsView },
      { path: 'settings', component: SettingsView },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/vuejs3/' : '/'),
  routes,
})

export default router