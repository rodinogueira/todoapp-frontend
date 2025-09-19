<template>
  <form @submit.prevent="submit" class="task-form">
    <input v-model="title" placeholder="Título da tarefa" required />
    <textarea v-model="description" placeholder="Descrição (opcional)"></textarea>
    <button type="submit">{{ editTask ? 'Atualizar' : 'Adicionar' }}</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task } from '@/stores/tasks'
import { useTasksStore } from '@/stores/tasks'

const props = defineProps<{ editTask?: Task }>()
const emit = defineEmits(['done'] as const) // ✅ correção
const tasksStore = useTasksStore()

const title = ref('')
const description = ref('')

watch(
  () => props.editTask,
  (newTask) => {
    if (newTask) {
      title.value = newTask.title
      description.value = newTask.description || ''
    }
  },
)

async function submit() {
  if (props.editTask) {
    await tasksStore.updateTask(props.editTask.id, {
      title: title.value,
      description: description.value,
    })
  } else {
    await tasksStore.addTask(title.value, description.value)
  }
  title.value = ''
  description.value = ''
  emit('done')
}
</script>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.task-form input,
.task-form textarea {
  padding: 0.5rem;
  font-size: 1rem;
}
.task-form button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}
.task-form button:hover {
  background-color: #2563eb;
}
</style>
