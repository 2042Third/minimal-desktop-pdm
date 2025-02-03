import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const time = ref("");
  const updateTime = (str) => {
    time.value = str;
  }

  return { time, updateTime }
})
