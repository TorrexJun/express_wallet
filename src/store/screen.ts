import { defineStore } from 'pinia'

export interface ScreenState {
  screening: boolean
}

export const useScreenStore = defineStore('screen', {
  state(): ScreenState {
    return {
      screening: false,
    }
  },
  actions: {
    setScreening(value: boolean) {
      this.screening = value
    },
  },
})
