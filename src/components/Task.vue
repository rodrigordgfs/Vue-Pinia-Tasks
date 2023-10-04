<template>
  <div class="task">
    <h2>{{ task.title }}</h2>
    <div class="icons">
      <i class="material-icons" @click="handleDeleteTask">delete</i>
      <i
        class="material-icons"
        :class="{
          'active-icon': task.isFav,
        }"
        @click="handleFavoriteTask"
        >favorite</i
      >
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useTaskStore } from "../stores/Tasks";

export default defineComponent({
  name: "TaskComponent",

  props: {
    task: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const taskStore = useTaskStore();

    const handleDeleteTask = () => {
      taskStore.deleteTask(props.task.id);
    };

    const handleFavoriteTask = () => {
      taskStore.favoriteTask(props.task.id);
    };

    return {
      handleDeleteTask,
      handleFavoriteTask,
    };
  },
});
</script>

<style lang="scss" scoped>
.task {
  padding: 20px;
  background: #fff;
  margin-top: 20px;
  border-radius: 4px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-weight: 600;
  }

  h2,
  .icons {
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
  }

  .icons {
    text-align: right;

    i {
      font-size: 1.4em;
      margin-left: 6px;
      cursor: pointer;
      color: #bbb;
    }
  }
}

.active-icon {
  color: #ff005d !important;
  transition: all 0.2s ease-in-out;
}
</style>
