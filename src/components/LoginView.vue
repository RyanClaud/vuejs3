<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Logo/Header -->
      <div class="logo-container">
        <img src="@/assets/vigilert-logo.jpg" alt="VIGILERT Logo" class="logo" />
      </div>

      <h2>Sign in</h2>

      <!-- Google Sign-In Button -->
      <div class="google-signin">
        <button type="button" @click="signInWithGoogle">
          <img src="@/assets/googlelogo.webp" alt="Google Logo" width="20" height="20" />
          Sign in with Google
        </button>
      </div>

      <!-- Forgot Password Link -->
      <p class="forgot-password">
        <a href="#">Forgotten your password?</a>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, signInWithPopup, googleProvider } from '@/firebase.js'

export default {
  name: 'LoginView',
  setup() {
    const loading = ref(false)
    const router = useRouter()

    // Google Sign-In
    const signInWithGoogle = async () => {
      loading.value = true

      try {
        await signInWithPopup(auth, googleProvider)
        router.push('/dashboard')
      } catch (error) {
        console.error('Error signing in with Google:', error.message)
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      signInWithGoogle,
    }
  },
}
</script>

<style scoped>
/* Center the login card */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

/* Logo Styling */
.logo-container {
  margin-bottom: 1rem;
}

.logo {
  width: 150px; /* Adjust based on your logo size */
  height: auto;
}

/* Heading */
h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

/* Google sign-in button */
.google-signin {
  margin-top: 1rem;
}

.google-signin button {
  width: 100%;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.google-signin button img {
  vertical-align: middle;
}

.google-signin button:hover {
  background-color: #f0f0f0;
}

/* Forgot password link */
.forgot-password {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.forgot-password a {
  color: #1e90ff;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}
</style>