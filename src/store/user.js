import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    cpf: '',
    email: ''
  }),
  actions: {
    setUser(data) {
      this.name = data.name
      this.cpf = data.cpf
      this.email = data.email
    }
  }
})
