<template>
  <div class="layout">
    <header class="header">
      <img src="@/assets/LOGO+NOME.png" alt="Logo" class="header__logo" />
    </header>
    <div class="main">
      <aside class="sidebar">
        <router-link to="/" class="sidebar__link">Home</router-link>
        <router-link to="/estoque" class="sidebar__link">ESTOQUE</router-link>
        <router-link to="/opcao2" class="sidebar__link">FINANCE</router-link>
      </aside>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$dark-blue: #0A1828;
$turquoise: #178582;
$gold: #BFA181;

.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background: $dark-blue;
  color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 10;

  &__logo {
    height: 40px;
    margin-right: 10px;
  }
}

.main {
  display: flex;
  flex: 1;
}

.sidebar {
  background: $dark-blue;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  border-right: 4px solid $gold;

  &__link {
    color: white;
    margin-bottom: 15px;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-weight: 500;
    
    &:hover {
      background: $turquoise;
      transform: translateX(5px);
    }
    
    &.router-link-active {
      background: $turquoise;
      color: white;
    }
  }
}

.content {
  background: #f5f5f5;
  flex: 1;
  padding: 20px;
}
</style>