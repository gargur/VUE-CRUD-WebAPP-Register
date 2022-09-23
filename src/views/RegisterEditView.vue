<template>
  <div class="main">
    <RegisterEdit />
  </div>
</template>

<script>
import RegisterEdit from "@/components/RegisterEdit.vue";

export default {
  name: "RegisterEditView",
  components: {
    RegisterEdit,
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