<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="Pinia Logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button
        :class="{
          'active-button': filter === 'all',
        }"
        @click="handleAllTasks"
      >
        All Tasks
      </button>
      <button
        :class="{
          'active-button': filter === 'favorites',
        }"
        @click="handleFavoritesTasks"
      >
        Favorites Tasks
      </button>
    </nav>

    <div class="loading" v-if="isLoading">Loading Tansks ...</div>

    <div class="task-list" v-if="filter === 'all' && !isLoading">
      <p>You have {{ getTotalCount }} tasks left to do</p>
      <Task v-for="task in getTasks" :key="task.id" :task="task" />
    </div>

    <div class="task-list" v-if="filter === 'favorites' && !isLoading">
      <p>You have {{ getFavoritesCount }} tasks favorites left to do</p>
      <Task v-for="task in getFavorites" :key="task.id" :task="task" />
    </div>
  </main>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useTaskStore } from "./stores/Tasks";
import { storeToRefs } from "pinia";
import Task from "./components/Task.vue";
import TaskForm from "./components/TaskForm.vue";

export default defineComponent({
  name: "App",

  components: {
    Task,
    TaskForm,
  },

  setup() {
    const taskStore = useTaskStore();

    const {
      isLoading,
      getTasks,
      getFavorites,
      getTotalCount,
      getFavoritesCount,
    } = storeToRefs(taskStore);

    const filter = ref("all");

    const handleAllTasks = () => {
      filter.value = "all";
    };

    const handleFavoritesTasks = () => {
      filter.value = "favorites";
    };

    onMounted(() => {
      taskStore.getTaks();
    });

    return {
      filter,
      handleAllTasks,
      handleFavoritesTasks,
      isLoading,
      getTasks,
      getFavorites,
      getTotalCount,
      getFavoritesCount,
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
    font-weight: 600;
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
  }
}

.active-button {
  background: #555 !important;
  color: #fff !important;
}

.new-task-form {
  background: #e7e7e7;
  padding: 20px 0;
}

.loading {
  max-width: 640px;
  border: 1px solid #ffd859;
  background: #ffe9a0;
  color: #3a3a3a;
  padding: 5px 0;
  text-align: center;
  margin: 30px auto;
}
</style>
