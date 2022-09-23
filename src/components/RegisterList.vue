<template>
  <div class="divMain">
    <el-table :data="tableData" border style="width: 100%" class="table">
      <el-table-column type="index" prop="id" label="ID" width="60" />
      <!--:index="indexMethod"-->
      <el-table-column prop="personalID" label="ID Pessoal" width="90" />
      <el-table-column
        prop="registerDate"
        label="Data do Registro"
        :formatter="dateFormat"
        width="140"
      />
      <el-table-column prop="completeName" label="Nome Completo" width="200" />
      <el-table-column prop="email" label="E-mail" width="220" />
      <el-table-column prop="login" label="Login" width="120" />
      <el-table-column prop="password" label="Senha" width="120" />
      <el-table-column
        prop="birthDate"
        label="Data de nascimento"
        width="160"
      />
      <el-table-column fixed="right" label="Operações" width="120">
        <template #default="scope">
          <el-link href="/editarcadastro" :underline="false">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              class="button"
              >Editar
            </el-button>
          </el-link>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            size="small"
            @click.prevent="deleteRow(scope.$index)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Inicio Form Edição -->
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { ref } from "vue";
import moment from "moment";
import { Delete } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

const dateFormat = (row: any, column: any) => {
  var date = row[column.property];
  if (date == undefined) {
    return "";
  } else {
    return moment(date).format("DD/MM/yyyy");
  }
};

const store = useStore();

const tableData = ref(store.getters.sortRegisters);

const registerExclusion = (payload: any) => {
  store.commit("registerExclusion", payload);
};

const handleEdit = (index: number, row: any) => {
  localStorage.setItem("registerEdit", JSON.stringify(row));
};

//Função para exclusão de cadastro
const deleteRow = (index: number) => {
  tableData.value.splice(index, 1);
  registerExclusion(tableData);
  localStorage.setItem("register", JSON.stringify(store.state.registers));
  ElNotification({
        title: "Cadastro excluído com sucesso",
        type: "success",
      });
};
</script>

<style scoped lang="scss">
.divMain {
  width: 63%;
  background-color: white;
  margin-top: 40px;
  border-radius: 20px;
  border: 1px solid var(--el-border-color);
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
}
.table {
  margin-left: auto;
  margin-right: auto;
}
.button {
  margin-right: 5px;
}
</style>