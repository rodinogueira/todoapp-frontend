<template>
  <header class="app-header">
    <h1>Todo App</h1>
    <div class="header-buttons">
      <template v-if="!auth.isAuthenticated">
        <button @click="goTo('/login')">Login</button>
        <button @click="goTo('/register')">Register</button>
      </template>
      <template v-else>
        <button @click="logout">Logout</button>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

function goTo(path: string) {
  router.push(path)
}

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #3b82f6;
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
}

.header-buttons button {
  margin-left: 0.5rem;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

.header-buttons button:hover {
  opacity: 0.8;
}

.header-buttons button:first-child {
  background-color: white;
  color: #3b82f6;
}

.header-buttons button:last-child {
  background-color: #ef4444;
  color: white;
}
</style>
