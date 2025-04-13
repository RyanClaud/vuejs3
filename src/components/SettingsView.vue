<template>
  <div class="settings-view">
    <h2>Profile Settings</h2>

    <!-- Centered Settings Container -->
    <div class="settings-container">
      <!-- Account Section -->
      <div class="form-section">
        <h3>Account</h3>
        <div class="input-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
          <button @click="updateUsername">Save Changes</button>
        </div>
      </div>

      <!-- Password Section -->
      <div class="form-section">
        <h3>Password</h3>
        <div class="input-group">
          <label for="password">New Password:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div class="input-group">
          <label for="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" />
        </div>
        <button @click="updatePassword">Change Password</button>
      </div>

      <!-- Theme Color Section -->
      <div class="form-section">
        <h3>Theme Color</h3>
        <div class="input-group">
          <label for="theme-color">Theme Color:</label>
          <select id="theme-color" v-model="selectedTheme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </select>
          <button @click="saveTheme">Apply Theme</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue'
import { auth } from '@/firebase.js'

export default {
  name: 'SettingsView',
  setup() {
    // Reactive variables
    const username = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const selectedTheme = ref(localStorage.getItem('theme') || 'light') // Default to light theme

    // Function to update username
    const updateUsername = async () => {
      try {
        if (!username.value) {
          alert('Please enter a new username.')
          return
        }

        // Update display name in Firebase Authentication
        await auth.currentUser.updateProfile({
          displayName: username.value,
        })

        alert('Username updated successfully!')
      } catch (error) {
        console.error('Error updating username:', error)
        alert('Failed to update username. Please try again.')
      }
    }

    // Function to update password
    const updatePassword = async () => {
      try {
        if (password.value !== confirmPassword.value) {
          alert('Passwords do not match!')
          return
        }

        // Update password in Firebase Authentication
        await auth.currentUser.updatePassword(password.value)

        alert('Password updated successfully!')
      } catch (error) {
        console.error('Error updating password:', error)
        alert('Failed to update password. Please try again.')
      }
    }

    // Function to save theme color
    const saveTheme = () => {
      localStorage.setItem('theme', selectedTheme.value)
      applyTheme(selectedTheme.value)
      alert('Theme updated successfully!')
    }

    // Function to apply theme dynamically
    const applyTheme = (theme) => {
      document.body.className = theme
    }

    return {
      username,
      password,
      confirmPassword,
      selectedTheme,
      updateUsername,
      updatePassword,
      saveTheme,
    }
  },
}
</script>

<style scoped>
.settings-view {
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Centered Settings Container */
.settings-container {
  background-color: #ffffff; /* White background */
  border: 1px solid #ddd; /* Subtle border */
  border-radius: 8px; /* Rounded corners */
  padding: 20px; /* Inner padding */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  max-width: 400px; /* Limit the width of the container */
  margin: 0 auto; /* Center the container horizontally */
}

.form-section {
  margin-bottom: 30px;
}

h2, h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

button {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%; /* Ensure buttons span the full width of the container */
}

button:hover {
  background-color: #1976d2;
}

/* Theme-specific styles */
body.light {
  background-color: #f5f5f5;
  color: #333;
}

body.dark {
  background-color: #212121;
  color: #fff;
}

body.blue {
  background-color: #e3f2fd;
  color: #0d47a1;
}

body.green {
  background-color: #e8f5e9;
  color: #1b5e20;
}
</style>