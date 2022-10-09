import { defineStore } from 'pinia'

export const useStore = defineStore('useStore', {
  state() {
    return {
      useState: 1,
      token: '',
    }
  },
  actions: {
    addState() {
      this.useState++
    },
  },
})

export const payStore = defineStore('useStore', {
  state() {
    return {
      payState: 1,
    }
  },
  actions: {
    addState() {
      this.payState++
    },
  },
})
