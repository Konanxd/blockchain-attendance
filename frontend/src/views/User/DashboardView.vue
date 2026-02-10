<template class="Dashboard-view">
  <div
    class="login-form flex flex-col gap-5 max-w-screen min-h-screen m-0 bg-gradient-to-b from-[#788BFF] to-[#5970FF] items-center justify-top"
  >
    <div
      class="flex items-center justify-between w-full px-10 py-4 pt-10 bg-white text-[#788BFF] text-xl shadow-3xl rounded-br-3xl rounded-bl-3xl"
    >
      <div class="flex flex-row w-full justify-between">
        <Icon icon="ep:back" class="text-3xl" />
        <b class="">My Ticket</b>
        <Icon icon="material-symbols:person-rounded" class="text-3xl" />
      </div>
    </div>

    <div v-if="loading" class="text-white text-center">Loading tickets...</div>
    <div v-else-if="error" class="text-red-200 text-center">{{ error }}</div>
    <div v-else-if="tickets && tickets.length === 0">No tickets found</div>

    <div class="flex flex-wrap w-full px-5 gap-5" v-else>
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="flex flex-1 flex-col min-w-[300px] pb-3 shadow-3xl gap-5"
        :class="{ 'opacity-50': isTicketDisabled(ticket) }"
      >
        <div
          class="flex flex-col gap-3 bg-[rgba(0,0,0,0.7)] rounded-3xl px-3 py-3 w-full items-center"
        >
          <div class="flex justify-between max-w-full w-full">
            <div class="flex flex-col gap-2 text-white justify-strecth">
              <div
                class="flex px-5 py-1 w-fit bg-white text-[#788bff] text-xs items-center justify-center rounded-3xl"
                :class="ticket.used ? 'bg-gray-400 text-gray-700' : 'bg-white text-[#788bff]'"
              >
                {{ ticket.used ? 'Used' : 'Upcoming' }}
              </div>
              <h2 class="text-[#5970ff] text-2xl">
                {{ ticket.event.name }}
              </h2>
              <p class="flex items-center text-s gap-2">
                <Icon icon="lets-icons:date-fill" />
                {{ new Date(ticket.event.dateTime).toDateString() }}
              </p>
              <p class="flex items-center text-s gap-2">
                <Icon icon="tdesign:location-filled" />
                {{ ticket.event.Location }}
              </p>
            </div>
            <img
              class="border-1 border-white rounded-2xl max-w-[40%] w-full"
              src=""
              alt="dsadasasd"
            />
          </div>
          <button
            class="flex items-center justify-center w-full px-2 py-2 rounded-2xl bg-[#788bff] text-white gap-2 text-base"
            @click="handleView(ticket.id)"
          >
            <Icon class="text-2xl" icon="mingcute:ticket-fill" /> 
            View Ticket
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { getByUserId } from '@/services/ticketService'
import { Icon } from '@iconify/vue'

const auth = useAuthStore()
const tickets = ref([])
const loading = ref(true)
const error = ref('')

const router = useRouter()

onMounted(async () => {
  try {
    const res = await getByUserId(auth.user.id)
    tickets.value = res
    console.log(tickets.value)
  } catch (err) {
    error.value = 'Failed to load tickets'
  } finally {
    loading.value = false
  }
})

function isTicketDisabled(ticket) {
  const eventDate = new Date(ticket.event.dateTime)
  const now = new Date()

  return ticket.used === true || eventDate <= now
}

async function handleView(id) {
  try {
    router.push(`/detail/${id}`)
  } catch (err) {
    error.value = err?.response?.data?.message || 'Invalid email or password'
    console.error(err)
  } finally {
    loading.value = false
  }
}

</script>
