<template>
  <div class="divMain">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
      size="large"
      status-icon
    >
      <el-form-item label="Nome Completo" prop="completeName" size="large">
        <el-input v-model="ruleForm.completeName" />
      </el-form-item>
      <el-form-item label="E-mail" prop="email" size="large">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="Login" prop="login" size="large">
        <el-input v-model="ruleForm.login" />
      </el-form-item>
      <el-form-item label="Senha" prop="password" size="large">
        <el-input v-model="ruleForm.password" show-password />
      </el-form-item>
      <el-form-item
        label="Confirme a senha"
        prop="passwordConfirm"
        size="large"
      >
        <el-input v-model="ruleForm.passwordConfirm" show-password />
      </el-form-item>
      <el-form-item label="Data de Nascimento" prop="birthDate">
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
      <el-form-item label="Data do Cadastro" prop="registerDate">
        <el-date-picker
          v-model="ruleForm.registerDate"
          size="large"
          :disabled-date="disabledDate"
          format="DD/MM/YYYY"
          value-format="YYYYMMDD"
          style="width: 100%"
          type="date"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Inserir Registro
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Limpar Campos </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { reactive, ref } from "vue";
import { ElNotification, FormInstance, FormRules } from "element-plus";
import router from "@/router";

//Instanciação da Store Vuex
const store = useStore();

//Instanciação da Mutation newRegister
const newRegister = (payload: any) => {
  store.commit("newRegister", payload);
};
const newHistoricRegister = (payload: any) => {
  store.commit("newHistoricRegister", payload);
};

//Instanciação do Formulário na const
const ruleFormRef = ref<FormInstance>();

/*Criação da constante do formulário reativo
Ele é reativo para funcionar nas funções do Element Plus*/
const ruleForm = reactive({
  completeName: "",
  email: "",
  login: "",
  password: "",
  passwordConfirm: "",
  birthDate: "",
  registerDate: "",
});

//Função para desabilitar a opção de seleção de data futura no DatePicker
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};

/*Método de submissão do formulário
async - 
*/

const submitForm = async (form: FormInstance | undefined) => {
  //formEl
  if (!form) return;
  await form.validate((valid) => {
    if (valid) {
      let ruleFormInstance = {
        personalID: "0" + (1 + store.state.registerHistoric.length),
        completeName: ruleForm.completeName,
        email: ruleForm.email,
        login: ruleForm.login,
        password: ruleForm.password,
        passwordConfirm: ruleForm.passwordConfirm,
        birthDate: ruleForm.birthDate,
        registerDate: ruleForm.registerDate,
      };
      newRegister(ruleFormInstance);
      newHistoricRegister(ruleFormInstance);
      localStorage.setItem("register", JSON.stringify(store.state.registers));
      localStorage.setItem(
        "registerHistoric",
        JSON.stringify(store.state.registerHistoric)
      );
      ElNotification({
        title: "Usuário cadastrado com sucesso",
        type: "success",
      });
      form.resetFields();
      router.push("/listadecadastros");
    } else {
      ElNotification({
        title: "Preencha os campos corretamente",
        type: "error",
      });
    }
  });
};
const resetForm = (form: FormInstance | undefined) => {
  if (!form) return;
  form.resetFields();
};

/*Criação da constante de regras para aplicação do formulário
Reativo com FormRules para conexão com a propriedade :rules do El-form
*/
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
