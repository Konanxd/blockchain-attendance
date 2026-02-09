import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    user: null,
    token: null,
    isLoggedIn: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    login(userData, token) {
      this.user = userData
      this.token = token
      this.isLoggedIn = true
    },

    logout() {
      this.user = null
      this.token = null
      this.isLoggedIn = false
    },
  },
})
