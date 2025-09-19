<template>
  <div class="auth-page">
    <div class="auth-box">
      <h1>Registrar</h1>
      <form @submit.prevent="handleRegister" class="auth-form">
        <input v-model="name" type="text" placeholder="Nome" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Senha" required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

async function handleRegister() {
  const success = await auth.register({
    name: name.value,
    email: email.value,
    password: password.value,
  })
  if (success) {
    router.push('/tasks')
  } else {
    alert('Falha ao registrar. Verifique os dados e tente novamente.')
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
}

.auth-box {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 320px;
  text-align: center;
}

.auth-box h1 {
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-form input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  outline: none;
  transition: 0.2s;
}

.auth-form input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.auth-form button {
  padding: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

.auth-form button:hover {
  background-color: #2563eb;
}
</style>
