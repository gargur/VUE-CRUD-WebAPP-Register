<template>
  <div class="divMain">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item
        label="Nome Completo"
        prop="completeName"
        modelValue="completeName"
      >
        <el-input v-model="ruleForm.completeName" />
      </el-form-item>
      <el-form-item label="E-mail" prop="email" modelValue="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="Login" prop="login" modelValue="login">
        <el-input v-model="ruleForm.login" />
      </el-form-item>
      <el-form-item label="Senha" prop="password" modelValue="password">
        <el-input v-model="ruleForm.password" show-password />
      </el-form-item>
      <el-form-item
        label="Confirme a senha"
        prop="passwordConfirm"
        modelValue="passwordConfirm"
      >
        <el-input v-model="ruleForm.passwordConfirm" show-password />
      </el-form-item>
      <el-form-item
        label="Data de Nascimento"
        prop="birthDate"
        modelValue="birthDate"
      >
        <el-date-picker
          v-model="ruleForm.birthDate"
          size="large"
          format="DD/MM/YYYY"
          value-format="DD/MM/YYYY"
          :disabled-date="disabledDate"
          style="width: 100%"
          type="date"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Salvar</el-button
        >
        <el-button @click="returnPage()">Voltar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script lang="ts" setup>
import { useStore } from "vuex";
import { reactive, ref } from "vue";
import { ElNotification, FormInstance, FormRules } from "element-plus";
import router from "@/router";

const store = useStore();

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive(store.state.registerEdit);

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};

//Função para retornar Index do cadastro
let index = "";
store.state.registers.findIndex(function (entry: any, i: any) {
  if (entry.personalID == ruleForm.personalID) {
    index = i;
    return true;
  }
});

const submitForm = async (form: FormInstance | undefined) => {
  if (!form) return;
  await form.validate((valid) => {
    if (valid) {
      //editRegister(ruleForm)
      store.state.registers.splice(index, 1, ruleForm);
      localStorage.setItem("register", JSON.stringify(store.state.registers));
      router.push("/listadecadastros");
      ElNotification({
        title: "Cadastro alterado com sucesso",
        type: "success",
      });
    } else {
      ElNotification({
        title: "Preencha os campos corretamente",
        type: "error",
      });
    }
  });
};
const returnPage = () => {
  router.push("/listadecadastros");
};

const rules = reactive<FormRules>({
  completeName: [
    {
      required: true,
      whitespace: true,
      message: "Por favor digite um nome",
      trigger: "blur",
    },
    {
      pattern: /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/,
      message: "Preencha nome e sobrenome",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: "Por favor digite um e-mail",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Por favor digite um e-mail válido",
      trigger: ["blur"],
    },
  ],
  login: [
    {
      required: true,
      message: "Por favor digite um login",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Por favor digite uma senha",
      trigger: "blur",
    },
    {
      pattern: /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
      message:
        "Sua senha deve conter ao menos 6 caracteres, um número e um caracter especial !#@",
      trigger: "blur",
    },
  ],
  passwordConfirm: [
    {
      required: true,
      message: "Por favor digite uma senha",
      trigger: "blur",
    },
    {
      validator(rule, value) {
        return value === ruleForm.password;
      },
      message: "A confirmação não confere com a senha",
    },
  ],
  birthDate: [
    {
      required: true,
      message: "Por favor preencha uma data de nascimento",
      trigger: "blur",
    },
  ],
  registerDate: [
    {
      required: true,
      message: "Por favor preencha uma data de cadastro",
      trigger: "blur",
    },
  ],
});
</script>

<style scoped>
.divMain {
  width: 40%;
  margin-top: 40px;
  border-radius: 20px;
  border: 1px solid var(--el-border-color);
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  padding: 30px;
}
</style>


