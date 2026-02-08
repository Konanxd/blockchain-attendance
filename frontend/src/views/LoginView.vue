<template class="login-view">
  <FormLayout class="">
    <div class="text-center ">
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
        Welcome Back
      </h2>

      <p class="mt-2 text-sm text-gray-600">
        Enter your credentials to continue
      </p>

      <button
        class="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        @click="login"
      >
        Login
      </button>
    </div>
  </FormLayout>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

function login() {
  auth.login({ name: 'Jonatan' })
}
</script>
