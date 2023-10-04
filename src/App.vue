<template>
  <main>
    <Header />

    <TaskForm />

    <Filter
      :filter="filter"
      :handleAllTasks="handleAllTasks"
      :handleFavoritesTasks="handleFavoritesTasks"
    />

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
import Header from "./components/Header.vue";
import Filter from "./components/Filter.vue";

export default defineComponent({
  name: "App",

  components: {
    Task,
    TaskForm,
    Header,
    Filter
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
.task-list {
  max-width: 640px;
  width: 100%;
  margin: 20px auto;
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
