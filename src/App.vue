<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="Pinia Logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <nav class="filter">
      <button @click="handleAllTasks">All Tasks</button>
      <button @click="handleFavoritesTasks">Favorites Tasks</button>
    </nav>

    <div
      class="task-list"
      :class="{
        active: filter === 'all',
      }"
      v-if="filter === 'all'"
    >
      <p>You have {{ taskStore.getTotalCount }} tasks left to do</p>
      <Task v-for="task in taskStore.tasks" :key="task.id" :task="task" />
    </div>

    <div
      class="task-list"
      :class="{
        active: filter === 'favorites',
      }"
      v-if="filter === 'favorites'"
    >
    <p>You have {{ taskStore.getFavoritesCount }} tasks favorites left to do</p>
      <Task v-for="task in taskStore.getFavorites" :key="task.id" :task="task" />
    </div>
  </main>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useTaskStore } from "./stores/Tasks";
import Task from "./components/Task.vue";

export default defineComponent({
  name: "App",

  components: {
    Task,
  },

  setup() {
    const taskStore = useTaskStore();

    const filter = ref("all");

    const handleAllTasks = () => {
      filter.value = "all";
    };

    const handleFavoritesTasks = () => {
      filter.value = "favorites";
    };

    return {
      taskStore,
      filter,
      handleAllTasks,
      handleFavoritesTasks,
    };
  },
});
</script>

<style lang="scss" scoped>
header {
  text-align: center;
  background: #e7e7e7;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 60px;
    transform: rotate(-10deg);
  }

  h1 {
    margin: 0;
    font-size: 2em;
    padding-top: 25px;
    margin-left: 15px;
    color: #777;
    transform: rotate(2deg);
  }
}

.task-list {
  max-width: 640px;
  width: 100%;
  margin: 20px auto;
}

.filter {
  width: 640px;
  margin: 10px auto;
  text-align: right;

  button {
    display: inline-block;
    margin-left: 10px;
    background: #fff;
    border: 2px solid #555;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 0.8em;
    font-size: 1em;

    &:hover {
      background: #555;
      color: #fff;
      transition: all 0.2s ease-in-out;
    }

    .active {
      background: #555;
      color: #fff;
    }
  }
}
</style>
