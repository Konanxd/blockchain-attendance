<template class="Dashboard-view">
  <div class="login-form flex flex-col gap-5 max-w-screen min-h-screen m-0 bg-gradient-to-b from-[#788BFF] to-[#5970FF] items-center justify-top">
    <div class="flex items-center justify-between w-full px-10 py-4 pt-10 bg-white text-[#788BFF] text-xl shadow-3xl rounded-br-3xl rounded-bl-3xl">
        <div class="flex flex-row w-full justify-between">
            <Icon icon="ep:back" class="text-3xl"/>
            <b class="">My Ticket</b>
            <Icon icon="material-symbols:person-rounded" class="text-3xl"/>
        </div>
    </div>
    <div class="flex flex-col w-full px-10 pb-3 shadow-3xl gap-5">
        <div class="flex flex-col gap-3 bg-[rgba(0,0,0,0.7)] rounded-3xl px-3 py-3 w-full items-center">
            <div class=" flex justify-between max-w-full w-full">
                <div class="flex flex-col gap-2 text-white justify-strecth">
                    <div class="flex px-5 py-1 w-fit bg-white text-[#788bff] text-xs items-center justify-center rounded-3xl">
                        Upcomming
                    </div>
                    <h2 class="text-[#5970ff] text-2xl">Event Name</h2>
                    <p class="flex items-center text-s gap-2"><Icon icon="lets-icons:date-fill"/>Date and Time</p>
                    <p class="flex items-center text-s gap-2"><Icon icon="tdesign:location-filled"/>Event Location</p>
                </div>
                <img  class="border-1 border-white rounded-2xl max-w-[40%] w-full" src="" alt="dsadasasd">
            </div>
            <div class="flex items-center justify-center w-full px-2 py-2 rounded-2xl bg-[#788bff] text-white gap-2 text-base">
              <Icon class="text-2xl" icon="mingcute:ticket-fill"/>  View Ticket
            </div>
        </div>
        <div class="flex flex-col gap-3 bg-[rgba(0,0,0,0.7)] rounded-3xl px-3 py-3 w-full items-center">
            <div class=" flex justify-between max-w-full w-full">
                <div class="flex flex-col gap-2 text-white justify-between">
                    <div class="flex px-5 py-1 w-fit bg-white text-[#788bff] text-xs items-center justify-center rounded-3xl">
                        Upcomming
                    </div>
                    <h2 class="text-[#5970ff] text-2xl">Event Name</h2>
                    <p class="flex items-center text-s gap-2"><Icon icon="lets-icons:date-fill"/>Date and Time</p>
                    <p class="flex items-center text-s gap-2"><Icon icon="tdesign:location-filled"/>Event Location</p>
                </div>
                <img  class="border-1 border-white rounded-2xl max-w-[40%] w-full" src="" alt="dsadasasd">
            </div>
            <div class="flex items-center justify-center w-full px-2 py-2 rounded-2xl bg-[#788bff] text-white gap-2 text-base">
              <Icon class="text-2xl" icon="mingcute:ticket-fill"/>  View Ticket
            </div>
        </div>
        <div class="flex flex-col gap-3 bg-[rgba(0,0,0,0.7)] rounded-3xl px-3 py-3 w-full items-center">
            <div class=" flex justify-between max-w-full w-full">
                <div class="flex flex-col gap-2 text-white justify-between">
                    <div class="flex px-5 py-1 w-fit bg-white text-[#788bff] text-xs items-center justify-center rounded-3xl">
                        Used
                    </div>
                    <h2 class="text-[#5970ff] text-2xl">Event Name</h2>
                    <p class="flex items-center text-s gap-2"><Icon icon="lets-icons:date-fill"/>Date and Time</p>
                    <p class="flex items-center text-s gap-2"><Icon icon="tdesign:location-filled"/>Event Location</p>
                </div>
                <img  class="border-1 border-white rounded-2xl max-w-[40%] w-full" src="" alt="dsadasasd">
            </div>
            <div class="flex items-center justify-center w-full px-2 py-2 rounded-2xl bg-[#788bff] text-white gap-2 text-base">
              <Icon class="text-2xl" icon="mingcute:ticket-fill"/>  View Ticket
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { Icon } from '@iconify/vue'

const auth = useAuthStore()

function login() {
  auth.login({ name: 'Jonatan' })
}
</script>
