<template>
  <div class="estoque">
    <input type="text" v-model="search" placeholder="Buscar item..." />
    <button @click="abrirMenu">Adicionar item</button>

    <div class="lista-itens" @scroll.passive="handleScroll">
      <div v-for="(item, index) in itensFiltrados" :key="index" class="item">
        <strong>{{ item.nome }}</strong> - {{ item.quantidade }} unidades
      </div>
    </div>

    <div v-if="menuAberto" class="menu-overlay">
      <div class="menu">
        <h3>Adicionar Item</h3>
        <input type="text" v-model="novoItem.nome" placeholder="Nome do item" />
        <input type="number" v-model="novoItem.quantidade" placeholder="Quantidade" />
        <input type="number" v-model="novoItem.preco" placeholder="Preço" />
        <textarea v-model="novoItem.observacao" placeholder="Observação"></textarea>
        <input type="file" @change="selecionarImagem" />
        <button @click="adicionarItem">Salvar</button>
        <button @click="fecharMenu">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const search = ref('')
const itens = ref([])
const menuAberto = ref(false)
const novoItem = ref({
  nome: '',
  quantidade: 0,
  preco: 0,
  observacao: '',
  imagem: null,
})

const abrirMenu = () => {
  menuAberto.value = true
}

const fecharMenu = () => {
  menuAberto.value = false
  novoItem.value = { nome: '', quantidade: 0, preco: 0, observacao: '', imagem: null }
}

const selecionarImagem = (e) => {
  const file = e.target.files[0]
  novoItem.value.imagem = file
}

const adicionarItem = async () => {
  const item = { ...novoItem.value }
  itens.value.push(item)
  await axios.post('http://localhost:3000/itens', item)
  fecharMenu()
}

const carregarItens = async () => {
  const response = await axios.get('http://localhost:3000/itens')
  itens.value = response.data
}

const itensFiltrados = computed(() =>
  itens.value.filter(item => item.nome.toLowerCase().includes(search.value.toLowerCase()))
)

const handleScroll = async (e) => {
  const el = e.target
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
    // Simula carregamento infinito
    const response = await axios.get('http://localhost:3000/itens?_page=2&_limit=10')
    itens.value.push(...response.data)
  }
}

onMounted(() => {
  carregarItens()
})
</script>

<style scoped>
.estoque {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.lista-itens {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 80vh;
  margin-top: 10px;
  background: white;
  padding: 10px;
  border-radius: 8px;
}

.item {
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
}

.menu input,
.menu textarea {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.menu button {
  margin-top: 10px;
  padding: 10px;
  background: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.menu button:last-child {
  background: red;
}
</style>
