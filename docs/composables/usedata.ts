import { defineStore } from 'pinia'

export const useData = defineStore('user', () => {
  const response = ref({
    name: '',
    versions: 0,
    url: '',
    feedback: '',
    updated_at: '',
  })

  return {
    response,
  }
})
