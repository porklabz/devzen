import { defineStore } from 'pinia'
import { ref } from 'vue'

export const alarmStore = defineStore('alarm', () => {
  const alarms = ref([]);
  function createAlarm(time: string) {
    alarms.value.push(time);
  }
  return {alarms, createAlarm};
})
