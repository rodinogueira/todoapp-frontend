<template>
  <div class="tasks-page">
    <h1>Minhas Tarefas</h1>

    <TaskForm v-if="editingTask" :editTask="editingTask" @done="editingTask = null" />
    <TaskForm v-else @done="fetchTasks" />

    <ul>
      <TaskItem
        v-for="task in tasksStore.tasks"
        :key="task.id"
        :task="task"
        @toggle="tasksStore.toggleTask"
        @edit="startEdit"
        @delete="tasksStore.deleteTask"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import TaskForm from '@/components/TaskForm.vue'
import TaskItem from '@/components/TaskItem.vue'
import type { Task } from '@/stores/tasks'

const tasksStore = useTasksStore()
const editingTask = ref<Task | null>(null)

function startEdit(task: Task) {
  editingTask.value = task
}

function fetchTasks() {
  tasksStore.fetchTasks()
}

onMounted(() => {
  fetchTasks()
})
</script>

<style scoped>
.tasks-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}
.tasks-page h1 {
  text-align: center;
  margin-bottom: 1rem;
}
.tasks-page ul {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}
</style>
