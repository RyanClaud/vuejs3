<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Sign in</h2>
      <p class="create-account-link">
        or
        <a href="/register">Create an account</a>
      </p>

      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>

        <div class="remember-me">
          <input type="checkbox" id="rememberMe" v-model="rememberMe" />
          <label for="rememberMe">Remember me</label>
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>

        <div class="google-signin">
          <button type="button" @click="signInWithGoogle">
            <img src="@/assets/googlelogo.webp" alt="Google Logo" width="20" height="20" />
            Sign in with Google
          </button>
        </div>

        <p class="forgot-password">
          <a href="#">Forgotten your password?</a>
        </p>
      </form>
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
    const email = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const errorMessage = ref('')
    const loading = ref(false)
    const router = useRouter()

    // Email/Password Login
    const login = async () => {
      loading.value = true
      errorMessage.value = ''

      try {
        await auth.signInWithEmailAndPassword(email.value, password.value)
        if (rememberMe.value) {
          localStorage.setItem('user', JSON.stringify({ email: email.value }))
        }
        router.push('/dashboard')
      } catch (error) {
        errorMessage.value = error.message
      } finally {
        loading.value = false
      }
    }

    // Google Sign-In
    const signInWithGoogle = async () => {
      loading.value = true
      errorMessage.value = ''

      try {
        await signInWithPopup(auth, googleProvider)
        router.push('/dashboard')
      } catch (error) {
        errorMessage.value = error.message
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      rememberMe,
      errorMessage,
      loading,
      login,
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
}

/* Heading and link */
h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.create-account-link {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
}

.create-account-link a {
  color: #1e90ff;
  text-decoration: none;
}

.create-account-link a:hover {
  text-decoration: underline;
}

/* Form inputs */
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #1e90ff;
}

/* Remember me checkbox */
.remember-me {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.remember-me input[type="checkbox"] {
  margin-right: 0.5rem;
}

/* Sign-in button */
button[type="submit"] {
  width: 100%;
  padding: 0.75rem;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #1a75ff;
}

button[type="submit"][disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Google sign-in button */
.google-signin {
  margin-top: 1rem;
  text-align: center;
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
  text-align: center;
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