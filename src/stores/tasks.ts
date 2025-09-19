import { defineStore } from 'pinia'
import api from '@/services/api'

export interface Task {
  id: number
  title: string
  description?: string
  status: 'pending' | 'completed'
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    async fetchTasks() {
      try {
        const response = await api.get('/tasks');
        this.tasks = response.data;
      } catch (err) {
        console.error('Erro ao buscar tarefas', err);
      }
    },

    async addTask(title: string, description?: string) {
      try {
        const response = await api.post('/tasks', { title, description });
        this.tasks.push(response.data);
      } catch (err) {
        console.error('Erro ao adicionar tarefa', err);
      }
    },

    async toggleTask(id: number) {
      try {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        const newStatus = task.status === 'pending' ? 'completed' : 'pending';
        const response = await api.put(`/tasks/${id}`, { status: newStatus });
        task.status = response.data.status;
      } catch (err) {
        console.error('Erro ao atualizar tarefa', err);
      }
    },

    async updateTask(id: number, data: Partial<Task>) {
      try {
        const response = await api.put(`/tasks/${id}`, data);
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) this.tasks[index] = response.data;
      } catch (err) {
        console.error(err);
      }
    },

    async deleteTask(id: number) {
      try {
        await api.delete(`/tasks/${id}`);
        this.tasks = this.tasks.filter(t => t.id !== id);
      } catch (err) {
        console.error('Erro ao deletar tarefa', err);
      }
    },
  },
});
