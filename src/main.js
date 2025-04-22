// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Create the app instance
const app = createApp(App)

// Add error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err)
  console.error('Component:', vm)
  console.error('Info:', info)
}

// Add warning handler
app.config.warnHandler = (msg, vm, trace) => {
  console.warn('Global warning:', msg)
  console.warn('Component:', vm)
  console.warn('Trace:', trace)
}

// Use router
app.use(router)

// Wait for router to be ready
router.isReady().then(() => {
  // Mount the app
  app.mount('#app')
}).catch(error => {
  console.error('Router error:', error)
})
