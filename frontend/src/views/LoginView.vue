<template class="login-view">
  <FormLayout class="login-form flex flex-col gap-20 w-screen h-screen m-0 bg-gradient-to-b from-[#788BFF] to-[#5970FF] items-center justify-center">
    <img src="../assets/images/LoginImage.png" alt="">
    <div class="flex flex-col text-center min-w-[300px]">
        <div class="flex flex-col w-full gap-6">
            <div class="flex flex-col w-full gap-2">
                <h2 class="mt-6 font-extrabold text-3xl text-white">
                    Welcome Back
                </h2>
                <p class="mt-2 text-sm font-semibold text-gray-300">
                    Enter your credentials to continue
                </p>
            </div>

            <div class="flex flex-col w-full gap-4">
                <!-- USERNAME -->
                <div class="mb-4">
                    <div class="relative ">
                        <Icon icon="mdi:account" class="absolute left-3 top-3 text-[#788BFF]" />
                        <input
                            v-model="username"
                            type="text"
                            placeholder="Enter username"
                            class="w-full pl-10 pr-3 py-2 border rounded-4xl focus:outline-none focus:ring-2 focus:ring-primary bg-white text-[#788BFF] shadow-2xs"
                        />
                    </div>
                </div>
                 <!-- PASSWORD -->
                <div class="mb-6">
                    <div class="relative">
                        <Icon icon="mdi:lock" class="absolute left-3 top-3 text-[#788BFF]"/>
                        <input
                            v-model="password"
                            type="password"
                            placeholder="Enter password"
                            class="w-full pl-10 pr-3 py-2 border rounded-4xl focus:outline-none focus:ring-2 focus:ring-primary bg-white text-[#788BFF] shadow-2xs"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="text-center min-w-[300px]">
      <button
        class="flex items-center justify-center w-full mt-6 bg-transparent text-white px-4 py-2 rounded-4xl border-1 border-white gap-1 shadow-2xs"
        @click="login"
      >
        Login <Icon icon="ion:enter" class="min-w-[20px]"/>
      </button>
    </div>
  </FormLayout>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { Icon } from '@iconify/vue'

const auth = useAuthStore()

function login() {
  auth.login({ name: 'Jonatan' })
}
</script>
