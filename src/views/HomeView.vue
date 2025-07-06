<script setup lang="ts">
import { ref } from 'vue'
import AlarmView from '@/components/cards/AlarmView.vue'

const loading = ref(false)

function showLoading() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 5000)
}
</script>

<template>
  <div class="flex pa-10">
    <v-row>
      <v-col lg="6" sm="12">
        <v-card
          :loading="loading"
          title="Card title"
          subtitle="Subtitle"
          text="..."
          variant="tonal"
        >
          <v-card-actions>
            <v-btn @click="showLoading">Click me</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col lg="6" sm="12">
        <AlarmView/>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss"></style>
