<template>
  <li class="task-item">
    <span :class="{ completed: task.status === 'completed' }">{{ task.title }}</span>
    <div>
      <button @click="$emit('toggle', task.id)">✔</button>
      <button @click="$emit('edit', task)">✏️</button>
      <button @click="$emit('delete', task.id)">🗑</button>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Task } from '@/stores/tasks'

defineProps<{ task: Task }>()
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}
.task-item span.completed {
  text-decoration: line-through;
  color: gray;
}
.task-item button {
  margin-left: 0.5rem;
  cursor: pointer;
}
</style>
