import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),

  actions: {
    login(userData) {
      this.user = userData
      this.isLoggedIn = true
    },

    logout() {
      this.user = null
      this.isLoggedIn = false
    }
  }
})
