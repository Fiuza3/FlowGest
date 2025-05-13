<template>
  <div class="estoque">
    <div class="estoque__header">
      <input type="text" v-model="search" placeholder="Buscar item..." class="estoque__search" />
      <button @click="abrirMenu" class="btn btn--primary">Adicionar item</button>
    </div>

    <div class="lista-itens" @scroll.passive="handleScroll">
      <div v-for="(item, index) in itensFiltrados" :key="index" class="item">
        <strong>{{ item.nome }}</strong> - {{ item.quantidade }} unidades
        <span class="item__price">R$ {{ item.preco.toFixed(2) }}</span>
      </div>
    </div>

    <div v-if="menuAberto" class="menu-overlay">
      <div class="menu">
        <h3 class="menu__title">Adicionar Item</h3>
        <input type="text" v-model="novoItem.nome" placeholder="Nome do item" class="menu__input" />
        <input type="number" v-model="novoItem.quantidade" placeholder="Quantidade" class="menu__input" />
        <input type="number" v-model="novoItem.preco" placeholder="Preço" class="menu__input" />
        <textarea v-model="novoItem.observacao" placeholder="Observação" class="menu__input"></textarea>
        <input type="file" @change="selecionarImagem" class="menu__file" />
        <div class="menu__actions">
          <button @click="adicionarItem" class="btn btn--primary">Salvar</button>
          <button @click="fecharMenu" class="btn btn--danger">Cancelar</button>
        </div>
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
    const response = await axios.get('http://localhost:3000/itens?_page=2&_limit=10')
    itens.value.push(...response.data)
  }
}

onMounted(() => {
  carregarItens()
})
</script>

<style lang="scss" scoped>
$dark-blue: #0A1828;
$turquoise: #178582;
$gold: #BFA181;

.estoque {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;

  &__header {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  &__search {
    flex: 1;
    padding: 10px;
    border: 2px solid $dark-blue;
    border-radius: 8px;
    font-size: 16px;
    
    &:focus {
      outline: none;
      border-color: $turquoise;
    }
  }
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &--primary {
    background: $turquoise;
    color: white;

    &:hover {
      background: darken($turquoise, 10%);
    }
  }

  &--danger {
    background: #dc3545;
    color: white;

    &:hover {
      background: darken(#dc3545, 10%);
    }
  }
}

.lista-itens {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 80vh;
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba($dark-blue, 0.1);
}

.item {
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba($turquoise, 0.05);
  }

  &__price {
    color: $dark-blue;
    font-weight: 600;
  }
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($dark-blue, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.menu {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  &__title {
    color: $dark-blue;
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }

  &__input {
    margin-bottom: 15px;
    padding: 10px;
    border: 2px solid #eee;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: $turquoise;
    }
  }

  &__file {
    margin: 10px 0;
  }

  &__actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;

    button {
      flex: 1;
    }
  }
}
</style>