import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {
    getTasks() {
      return this.tasks;
    },

    getFavorites() {
      return this.tasks.filter((t) => t.isFav);
    },
    getFavoritesCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    getTotalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTaks() {
      this.isLoading = true;
      const response = await fetch("http://localhost:9999/tasks");
      const data = await response.json();
      this.tasks = data;
      this.isLoading = false;
    },

    async addTask(title) {
      const body = {
        id: uuidv4(),
        title,
        isFav: false,
      };
      const response = await fetch("http://localhost:9999/tasks", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        this.tasks.push(body);
      }
    },

    async favoriteTask(id) {
      const response = await fetch(`http://localhost:9999/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          isFav: !this.tasks.find((t) => t.id === id).isFav,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        const task = this.tasks.find((t) => t.id === id);
        task.isFav = !task.isFav;
      }
    },

    async deleteTask(id) {
      const response = await fetch(`http://localhost:9999/tasks/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        this.tasks = this.tasks.filter((t) => t.id !== id);
      }
    },
  },
});
