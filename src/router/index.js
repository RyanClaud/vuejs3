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

const base = import.meta.env.BASE_URL || '/vuejs3/'

const routes = [
  { 
    path: '/',
    name: 'home',
    component: HomeView 
  },
  { 
    path: '/login',
    name: 'login',
    component: LoginView 
  },
  { 
    path: '/register',
    name: 'register',
    component: RegisterView 
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    children: [
      { 
        path: '',
        name: 'alerts',
        component: AlertsView 
      },
      { 
        path: 'alerts',
        name: 'alerts-full',
        component: AlertsView 
      },
      { 
        path: 'users',
        name: 'users',
        component: UsersView 
      },
      { 
        path: 'helmets',
        name: 'helmets',
        component: HelmetsView 
      },
      { 
        path: 'analytics',
        name: 'analytics',
        component: AnalyticsView 
      },
      { 
        path: 'settings',
        name: 'settings',
        component: SettingsView 
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(base),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router