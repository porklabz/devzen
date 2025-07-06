<script setup lang="ts">
import { alarmStore } from '@/stores/alarm.ts'
import { ref } from 'vue'

const alarms = alarmStore()

const loading = ref(false)

function showLoading() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 5000)
}
</script>

<template>
  <v-card
    :loading="loading"
    title="Card title"
    subtitle="Subtitle"
    variant="tonal"
  >
    <v-card-text>
      <div v-for="(alarm, index) in alarms.alarms" :key="index">
        {{alarm}}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="showLoading">Click me</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>
