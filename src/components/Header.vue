<template>
  <header class="header">
    <img class="header__logo" src="../assets/pinia-logo.svg" alt="Pinia Logo" />
    <h1 class="header__title">Pinia Tasks</h1>
  </header>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderComponent",

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  background: #e7e7e7;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  .header__logo {
    max-width: 60px;
    transform: rotate(-10deg);
  }

  .header__title {
    margin: 0;
    font-size: 2em;
    padding-top: 25px;
    margin-left: 15px;
    color: #777;
    transform: rotate(2deg);
    font-weight: 600;
  }
}
</style>
