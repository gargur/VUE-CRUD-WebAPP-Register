<template>
  <div class="main">
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "RegisterFormView",
  components: {
    RegisterForm,
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
