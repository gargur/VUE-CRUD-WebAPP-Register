<template>
  <div class="main">
    <RegisterList />
  </div>
</template>

<script>
import RegisterList from "@/components/RegisterList.vue";

export default {
  name: "RegisterListView",
  components: {
    RegisterList,
  },
};
</script>

<style scoped lang="scss">
.main {
  max-width: 100%;
  min-width: 720px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>