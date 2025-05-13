<template>
  <MainLayout>
    <h1>Bem-vindo, {{ user.name }}</h1>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { useUserStore } from '@/store/user'

const user = useUserStore()
</script>
