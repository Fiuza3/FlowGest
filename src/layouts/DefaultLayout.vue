<template>
  <div class="layout">
    <header class="header">
      <img src="@/assets/LOGO+NOME.png" alt="Logo" style="height: 40px; margin-right: 10px;" />
    </header>
    <div class="main">
      <aside class="sidebar">
        <router-link to="/">Home</router-link>
        <router-link to="/estoque">ESTOQUE</router-link>
        <router-link to="/opcao2">FINANCE</router-link>
      </aside>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background: red;
  color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 10;
}

.main {
  display: flex;
  flex: 1;
}

.sidebar {
  background: green;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  border-right: 4px solid rgb(0, 0, 0); /* Borda dourada na direita */
}

.sidebar a {
  color: white;
  margin-bottom: 10px;
  text-decoration: none;
}

.content {
  background: darkcyan;
  flex: 1;
  padding: 20px;
}
</style>
