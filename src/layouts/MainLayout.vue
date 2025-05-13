<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list nav>
        <v-list-item-title class="pa-4 text-h6">ERP</v-list-item-title>
        <v-list-item v-for="item in items" :key="item.path" :to="item.path" link>
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="pa-4">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
const items = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Unidades', path: '/units' },
  { label: 'Funcionários', path: '/employees' },
  { label: 'Notas', path: '/notes' },
  { label: 'Financeiro', path: '/finance' }
]
</script>

<style scoped>
.v-navigation-drawer {
  width: 240px;
}
</style>