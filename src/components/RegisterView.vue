<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="name" type="text" id="name" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" type="email" id="email" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" type="password" id="password" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
        </div>
        <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>
        <div v-if="success" class="text-green-500 text-sm mb-4">{{ success }}</div>
        <button type="submit" class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Register</button>
      </form>
      <div class="my-4 text-center text-sm text-gray-500">or</div>
      <button @click="registerWithGoogle" class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
        Sign Up with Google
      </button>
    </div>
  </div>
</template>

<script>
import { auth, registerWithEmail, signInWithGoogle } from '@/firebase.js';

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
      success: null
    }
  },
  methods: {
    async register() {
      this.error = null;
      this.success = null;

      if (!this.name || !this.email || !this.password || !this.confirmPassword) {
        this.error = 'Please fill in all fields';
        return;
      }

      if (!this.email.endsWith('@gmail.com')) {
        this.error = 'Please use a valid Gmail address';
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }

      if (this.password.length < 8) {
        this.error = 'Password must be at least 8 characters long';
        return;
      }

      try {
        await registerWithEmail(this.email, this.password);
        this.success = 'Registration successful! Redirecting to dashboard...';
        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 2000);
      } catch (err) {
        this.error = 'Registration failed. ' + (err.message || '');
      }
    },
    async registerWithGoogle() {
      try {
        await signInWithGoogle();
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = 'Google sign-up failed.';
      }
    }
  }
}
</script>



<style scoped>
.register-container {
  max-width: 450px;
  margin: 40px auto;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.app-title {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  color: #2c3e50;
}

.app-description {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 30px;
  font-size: 14px;
}

.register-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.email-hint {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #7f8c8d;
}

.button-group {
  margin-top: 30px;
}

.register-btn, .google-btn {
  width: 100%;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
}

.register-btn {
  background-color: #34495e;
  color: white;
  margin-bottom: 15px;
}

.register-btn:hover {
  background-color: #2c3e50;
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 15px 0;
  color: #7f8c8d;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ddd;
}

.separator::before {
  margin-right: 10px;
}

.separator::after {
  margin-left: 10px;
}

.google-btn {
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.google-btn:hover {
  background-color: #f5f5f5;
}

.google-icon {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}

.login-link {
  margin-top: 25px;
  text-align: center;
  font-size: 14px;
  color: #7f8c8d;
}

.login-link a {
  color: #3498db;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

.error-message {
  background-color: #ffecec;
  color: #e74c3c;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
}

.success-message {
  background-color: #e8f8f5;
  color: #27ae60;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>