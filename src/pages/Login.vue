<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" max-width="400">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field v-model="form.name" label="Nome" required />
          <v-text-field v-model="form.cpf" label="CPF" required />
          <v-text-field v-model="form.email" label="Email" type="email" required />
          <v-btn type="submit" color="primary" block>Entrar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()

const form = ref({
  name: '',
  cpf: '',
  email: ''
})

const handleLogin = async () => {
  await axios.post('http://localhost:3001/users', form.value)
  store.setUser(form.value)
  router.push('/dashboard')
}
</script>