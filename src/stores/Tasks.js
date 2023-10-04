import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      { id: 1, title: "buy some milk", isFav: false },
      { id: 2, title: "play Gloomhaven", isFav: true },
    ],
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
    addTask(title) {
      this.tasks.push({
        id: uuidv4(),
        title,
        isFav: false,
      });
    },

    favoriteTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
  },
});
