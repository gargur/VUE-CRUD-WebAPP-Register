<template>
  <nav>
    <div>
      <el-container>
        <el-header class="header">
          <div class="siteTitle">
          <p>WebApp Cadastro ®</p>
          </div>
          <div class="links">
          <router-link class="viewLink" to="/">Home </router-link>
          <router-link class="viewLink" to="/listadecadastros">
          Lista de Cadastros
          </router-link>
          </div>
        </el-header>
      </el-container>
    </div>
  </nav>
  <router-view />
</template>



<style lang="scss">
.header {
  border: 1px solid;
  height: 50px;
  display: flex;
  justify-content: center;
  background-color:  #12147e;
  width: 100%;
  min-width: 720px;
  align-items: center;
}
.siteTitle{
  left: 40px;
  position: absolute
}
.links{
  margin-left: auto;
  margin-right: auto;
}
.viewLink {
  margin-bottom: 10px;
  color: white;
  padding: 15px;
  text-decoration: none;
  font-size: 21px;
  font-weight: bold;
  font-family: Microsoft YaHei;
}
p{
  color: white;
  font-size: 25px;
  font-family: Microsoft YaHei;
  font-weight: bold;
}

</style>
