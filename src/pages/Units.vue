<template>
  <MainLayout>
    <v-container>
      <h2>Unidades</h2>
      <v-expansion-panels multiple>
        <v-expansion-panel v-for="unit in units" :key="unit.id">
          <v-expansion-panel-title>{{ unit.name }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <p><strong>Saldo:</strong> R$ {{ unit.saldo }}</p>
            <p><strong>Funcionários:</strong> {{ unit.funcionarios }}</p>
            <p><strong>Tarefas:</strong></p>
            <ul>
              <li v-for="tarefa in unit.tarefas" :key="tarefa">{{ tarefa }}</li>
            </ul>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const units = ref([])

const fetchUnits = async () => {
  const res = await axios.get('http://localhost:3001/units')
  units.value = res.data
}

onMounted(fetchUnits)
</script>
