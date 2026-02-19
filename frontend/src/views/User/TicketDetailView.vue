<template class="Ticket-view">
  <div class="login-form flex flex-col gap-5 max-w-screen min-h-screen m-0 bg-gradient-to-b from-[#788BFF] to-[#5970FF] items-center justify-top">
    <!-- Header -->
    <div class="flex items-center justify-between w-full px-10 py-4 pt-10 bg-white text-[#788BFF] text-xl shadow-3xl rounded-br-3xl rounded-bl-3xl">
      <div class="flex flex-row w-full justify-between">
        <Icon icon="ep:back" class="text-3xl" @click="router.back()"/>
        <b class="">Ticket Details</b>
        <Icon icon="material-symbols:download-rounded" class="text-3xl"/>
      </div>
    </div>

    <!-- Ticket Info -->
    <div class="flex flex-col w-full px-10 pb-3 items-center">
      <div class="flex flex-col gap-4 max-w-[375px] bg-[rgba(0,0,0,0.7)] rounded-3xl rounded-b-xl px-5 py-3 pb-8 w-full items-center shadow-3xl">
        <div class="flex flex-col w-full gap-3 text-white">
          <h2 class="text-[#5970ff] text-2xl">{{ ticket?.event?.name }}</h2>
          <p>{{ ticket?.event?.Location }} - 
            {{ new Date(ticket?.event?.dateTime).toLocaleDateString() }} - 
            {{ new Date(ticket?.event?.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </p>
          <hr class="border-[#5970ff]">
        </div>
        <div class="flex w-full gap-16 text-white">
          <div>
            <p>Section</p>
            <h2 class="text-2xl text-[#5970ff]">102</h2>
          </div>
          <div>
            <p>Row</p>
            <h2 class="text-2xl text-[#5970ff]">G</h2>
          </div>
          <div>
            <p>Seat</p>
            <h2 class="text-2xl text-[#5970ff]">14</h2>
          </div>
        </div>
      </div>

      <!-- QR Code -->
      <div class="flex flex-col gap-4 max-w-[375px] bg-[rgba(0,0,0,0.7)] border-t-2 border-dashed border-[#788BFF] rounded-3xl rounded-t-xl px-15 py-10 w-full items-center shadow-3xl">
        <canvas ref="qrCanvas" class="w-full rounded-3xl"></canvas>
        <div class="flex flex-col w-full gap-3 text-white text-center items-center">
            <h2 class="flex w-fit px-5 py-1 w-fit items-center justify-center gap-2 bg-[rgba(0,0,0,0.7)] rounded-3xl border-1 border-[#5970ff] text-[#5970ff]">
                <Icon icon="icon-park-outline:dot"/> {{ ticket?.used ? "USED" : "READY TO SCAN" }}
            </h2>
          <p>Please present this QR code at the gate for entry.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import QRCode from 'qrcode'
import { useAuthStore } from "@/stores/auth"
import { getById } from "@/services/ticketService" 
import { Icon } from '@iconify/vue'

const route = useRoute()
const auth = useAuthStore()
const id = route.params.id
const ticket = ref(null)
const qrCanvas = ref(null)

onMounted(async () => {
  try {
    const res = await getById(id)
    ticket.value = res 
    console.log(ticket.value)

    QRCode.toCanvas(qrCanvas.value, ticket.value.ticketId, {
      width: 260,
      color: { dark: "#5970ff", light: "#FFFFFF" }
    })
  } catch (err) {
    console.error(err)
  }
})
</script>
