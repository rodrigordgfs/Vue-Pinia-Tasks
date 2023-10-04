<template>
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
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FilterComponent",

  props: {
    filter: {
      type: String,
      required: true,
    },
    handleAllTasks: {
      type: Function,
      required: true,
    },
    handleFavoritesTasks: {
      type: Function,
      required: true,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.filter {
  max-width: 640px;
  width: 100%;
  margin: 10px auto;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    margin: 0;
    background: #fff;
    border: 2px solid #555;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
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
</style>
