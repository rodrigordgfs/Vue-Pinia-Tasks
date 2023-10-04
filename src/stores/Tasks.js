import { defineStore } from "pinia";

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
});
