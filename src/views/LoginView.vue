<template>
  <div class="login-page">
    <div class="login-box">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

async function handleLogin() {
  const success = await auth.login(email.value, password.value)
  if (success) {
    router.push('/tasks')
  } else {
    alert('Credenciais inválidas')
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6; /* cinza claro */
}

.login-box {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 320px;
  text-align: center;
}

.login-box h1 {
  margin-bottom: 1.5rem;
  color: #1f2937; /* cinza escuro */
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-form input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  outline: none;
  transition: 0.2s;
}

.login-form input:focus {
  border-color: #3b82f6; /* azul */
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.login-form button {
  padding: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

.login-form button:hover {
  background-color: #2563eb;
}
</style>
