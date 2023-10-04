import { defineStore } from "pinia";
import services from "../services";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {
    getTasks() {
      return this.tasks;
    },

    getCompleteds() {
      return this.tasks.filter((t) => t.completed);
    },

    getCompletedsCount() {
      return this.tasks.reduce((p, c) => {
        return c.completed ? p + 1 : p;
      }, 0);
    },

    getTotalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTaks() {
      this.isLoading = true;
      const { data } = await services.todo.getAll();
      this.tasks = data.todos;
      this.isLoading = false;
    },

    async addTask(todo) {
      const body = {
        todo,
        completed: false,
        userId: 5,
      };
      const { data } = await services.todo.insert(body);
      if (data) {
        this.tasks.push({
          ...body,
          id: data.id
        });
      }
    },

    async completeTask(task) {
      const { data } = await services.todo.update(task)
      console.log(data);
      if (data) {
        await this.getTaks();
      }
    },

    async deleteTask(id) {
      const { data } = await services.todo.delete(id)
      console.log(data);
      if (data) {
        await this.getTaks();
      }
    },
  },
});
