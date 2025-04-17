// src/composables/useAuth.js
import { ref, onMounted } from 'vue'
import { auth } from '@/firebase.js'

export function useAuth() {
  const user = ref(null)

  // Listen for authentication state changes
  const unsubscribe = auth.onAuthStateChanged((currentUser) => {
    if (currentUser) {
      user.value = {
        displayName: currentUser.displayName || 'User',
        email: currentUser.email,
      }
    } else {
      user.value = null
    }
  })

  // Clean up the listener when the component is destroyed
  onMounted(() => {
    return () => unsubscribe()
  })

  return { user }
}