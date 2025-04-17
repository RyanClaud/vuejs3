<template>
  <div class="users-view">
    <h2>Users Overview</h2>
    <table class="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="editUser(user.id)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'UsersView',
  setup() {
    const users = ref([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    ])

    const editUser = (id) => {
      console.log(`Editing user with ID: ${id}`)
      // Implement edit functionality here
    }

    const deleteUser = (id) => {
      console.log(`Deleting user with ID: ${id}`)
      users.value = users.value.filter((user) => user.id !== id)
    }

    return {
      users,
      editUser,
      deleteUser,
    }
  },
}
</script>

<style scoped>
.users-view {
  padding: 20px;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th, .users-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

button {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}
</style>