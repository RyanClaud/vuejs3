<template>
  <div class="home">
    <h1>Welcome to VIGILERT</h1>
    <p>Vision-Integrated Guardian Intelligent Helmet for Alertness Recognition Technology</p>

    <div class="action-buttons">
      <!-- Redirect to Login page instead of Dashboard -->
      <router-link to="/login" class="btn">Sign In</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 40px 20px;
}

h1 {
  font-size: 36px;
  margin-bottom: 16px;
  color: #34495e;
}

p {
  font-size: 18px;
  color: #7f8c8d;
  margin-bottom: 40px;
}

.action-buttons {
  margin-top: 30px;
}

.btn {
  display: inline-block;
  background-color: #34495e;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #2c3e50;
}
</style>
