<template>
  <div class="login-form relative flex flex-col gap-5 max-w-screen min-h-screen m-0 bg-gradient-to-b from-[#788BFF] to-[#5970FF] items-center justify-top">
    
    <div class="flex items-center justify-between w-full px-10 py-4 pt-10 bg-white text-[#788BFF] text-xl shadow-3xl rounded-br-3xl rounded-bl-3xl">
      <div class="flex flex-row w-full justify-between items-center">
        <Icon icon="ep:back" class="text-3xl cursor-pointer" @click="$router.back()"/>
        <b>Attendance List</b>
        <Icon icon="mingcute:question-fill" class="text-3xl"/>
      </div>
    </div>

    <div class="flex flex-col w-full px-10 pb-3 gap-5">
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-2">
          <input v-model="ticketId" placeholder="Ticket ID (Hash)" class="text-[#788BFF] px-4 py-3 rounded-2xl bg-white/90 focus:outline-none"/>
          <input v-model="eventId" placeholder="Event ID" class="text-[#788BFF] px-4 py-3 rounded-2xl bg-white/90 focus:outline-none"/>
        </div>
        <button @click="handleScan" class="bg-green-500 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all">
          Mark Attendance
        </button>
      </div>

      <div class="flex flex-col gap-4 mt-2">
        <div class="flex justify-between items-center px-2">
          <p class="text-lg text-white font-bold">Recent Arrivals</p>
          <button @click="fetchEventAttendees" class="text-xs bg-white/20 text-white px-3 py-1 rounded-full border border-white/30">
            Refresh
          </button>
        </div>

        <div class="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
          <div
            v-for="record in attendanceRecords"
            :key="record.ticketId"
            class="flex flex-col gap-2 bg-white rounded-3xl p-5 shadow-xl border-l-[6px] border-[#788BFF]"
          >
            <div class="flex justify-between text-sm text-[#788BFF] w-full items-start">
              <div class="flex flex-col">
                <span class="text-[9px] text-gray-400 font-bold uppercase tracking-widest">On-Chain Ticket ID</span>
                <p class="truncate max-w-[180px] font-mono text-[10px] text-gray-700">{{ record.ticketId }}</p>
              </div>
              <p class="font-bold text-[10px] bg-[#788BFF]/10 px-2 py-1 rounded-lg">{{ formatDate(record.timestamp) }}</p>
            </div>
            <div class="flex items-center gap-1.5 mt-1">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-[9px] text-green-600 font-bold uppercase tracking-tight">Verified on Sepolia</span>
            </div>
          </div>

          <div v-if="attendanceRecords.length === 0" class="text-center py-10 text-white/50 italic text-sm">
            Belum ada yang absen di event ini.
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPopup" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-8">
      
      <div v-if="popupStatus === 'success'" class="bg-[#D1FFD1] w-full gap-5 max-w-sm rounded-3xl p-8 flex flex-col items-center shadow-2xl">
        <div class="w-24 h-24 bg-[#00FF00] rounded-full flex items-center justify-center shadow-lg mb-6 ring-8 ring-green-400/20">
          <Icon icon="akar-icons:check" class="text-white text-5xl" />
        </div>
        <h2 class="text-[#2D2D2D] text-3xl font-black mb-6 tracking-tight text-center">Access Granted</h2>
        
        <div class="flex flex-col bg-[#414A3E] gap-3 w-full rounded-[30px] p-6 text-center shadow-xl mb-6 border border-[#00FF00]">
          <h3 class="text-[#00FF00] text-xl font-bold tracking-wide uppercase">{{ scannedData?.name || 'Attendee' }}</h3>
          <div class="border-t border-2 border-[#00FF00] my-4 rounded-3xl"></div>
          <div class="flex justify-between text-white px-2">
            <div class="flex flex-col"><span class="text-[9px] opacity-50 uppercase">Section</span><b class="text-[#00FF00] text-lg">112</b></div>
            <div class="flex flex-col"><span class="text-[9px] opacity-50 uppercase">Row</span><b class="text-[#00FF00] text-lg">G</b></div>
            <div class="flex flex-col"><span class="text-[9px] opacity-50 uppercase">Seat</span><b class="text-[#00FF00] text-lg">14</b></div>
          </div>
        </div>

        <button @click="showPopup = false" class="w-full py-4 bg-[rgba(0,0,0,0.7)] text-[#00FF00] font-black rounded-full border-2 border-[#00FF00] active:scale-95 transition-all shadow-md uppercase text-xs tracking-widest">
          Scan Next Ticket
        </button>
      </div>

      <div v-if="popupStatus === 'error'" class="bg-[#FFD1D1] w-full gap-5 max-w-sm rounded-[45px] p-8 flex flex-col items-center shadow-2xl">
        <div class="w-24 h-24 bg-[#FF4D4D] rounded-full flex items-center justify-center shadow-lg mb-6 ring-8 ring-red-400/20">
          <Icon icon="akar-icons:cross" class="text-white text-5xl" />
        </div>
        <h2 class="text-[#FF4D4D] text-3xl font-black tracking-tight text-center">Access Denied</h2>
        <p class="text-red-600 text-center text-[10px] mb-8 font-bold uppercase tracking-widest">Invalid or Used Ticket</p>
        
        <button @click="showPopup = false" class="w-full py-4 bg-white text-[#FF4D4D] font-black rounded-full border-2 border-[#FF4D4D] active:scale-95 transition-all shadow-md uppercase text-xs tracking-widest">
          Close
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { scanAttendance } from "@/services/attendanceService"

const ticketId = ref('')
const eventId = ref('2') // Sesuai dengan ID di Prisma Studio
const attendanceRecords = ref([])
const showPopup = ref(false)
const popupStatus = ref('success')

// Data untuk detail di popup
const scannedData = ref({
  name: '',
  section: 'G',
  row: '7',
  seat: '16',
  ticketId: ''
});

const formatDate = ts => {
  if (!ts) return ''
  return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const handleScan = async () => {
  if (!ticketId.value) return alert("Masukan Ticket ID!");
  
  try {
    const payload = {
      qrPayload: JSON.stringify({ ticketId: ticketId.value, version: 1 })
    };

    const res = await scanAttendance(payload);
    
    if (res.success) {
      // Ambil objek 'attendeeDetails' dari response controller kamu
      scannedData.value = res.attendeeDetails;
      
      popupStatus.value = 'success';
      showPopup.value = true;
      ticketId.value = ''; 
      await fetchEventAttendees(); 
    }
  } catch (err) {
    console.error("Scan Error:", err.response?.data || err.message);
    popupStatus.value = 'error';
    showPopup.value = true;
  }
};

const fetchEventAttendees = async (evId) => {
  if (!evId) return;
  try {
    const response = await fetch(`http://localhost:3000/api/operator/${evId}`)
    const result = await response.json()
    console.log("Fetch attendees result:", result);
    
    if (result.success && Array.isArray(result.data)) {
      attendanceRecords.value = [...result.data].reverse(); 
    } else {
      attendanceRecords.value = [];
    }
  } catch (err) {
    console.error("Fetch list failed:", err);
    attendanceRecords.value = [];
  }
}

onMounted(() => {
  fetchEventAttendees(eventId.value);
})
</script>