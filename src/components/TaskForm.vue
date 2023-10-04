<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to ..." v-model="state.task" />
    <button type="submit">Add</button>
  </form>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useTaskStore } from "../stores/Tasks";

export default defineComponent({
  name: "TaskFormComponent",

  setup() {
    const taskStore = useTaskStore();

    const state = reactive({
      task: "",
    });

    const handleSubmit = () => {
      if (state.task) {
        taskStore.addTask(state.task);
        state.task = "";
      }
    };

    return {
      state,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
form {
  max-width: 400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 10px;

  button {
    background: #ffd859;
    border: 0;
    padding: 10px;
    font-family: "Poppins";
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
  }

  input {
    border: 0;
    padding: 10px;
    border-radius: 6px;
    color: #555;
    font-size: 1em;
  }
}
</style>
