<template>
  <div class="login-form relative flex flex-col gap-5 max-w-screen min-h-screen m-0 bg-gradient-to-b from-[#788BFF] to-[#5970FF] items-center justify-top">

    <div class="flex items-center justify-between w-full px-10 py-4 pt-10 bg-white text-[#788BFF] text-xl shadow-3xl rounded-br-3xl rounded-bl-3xl">
      <div class="flex flex-row w-full justify-between">
        <Icon icon="ep:back" class="text-3xl"/>
        <b>Checked In</b>
        <Icon icon="mingcute:question-fill" class="text-3xl"/>
      </div>
    </div>

    <div class="w-full px-10 py-4">
      <button
        v-if="!isConnected"
        @click="connectMetaMask"
        class="bg-white text-[#5970FF] px-4 py-2 rounded-2xl shadow-md font-bold"
      >
        Connect MetaMask
      </button>

      <div v-else class="flex items-center gap-4">
        <p class="text-white font-semibold">MetaMask connected ✅</p>
        <button
          @click="disconnectMetaMask"
          class="bg-red-500 text-white px-4 py-2 rounded-2xl shadow-md font-bold"
        >
          Disconnect
        </button>
      </div>
    </div>

    <div v-if="isConnected" class="flex flex-col w-full px-10 pb-3 shadow-3xl gap-5">

      <div class="flex flex-col gap-2">
        <input v-model="ticketId" placeholder="Ticket ID (e.g. TICKET123)" class="px-3 py-2 rounded-lg"/>
        <input v-model="eventId" placeholder="Event ID (e.g. EVENT456)" class="px-3 py-2 rounded-lg"/>
        <button @click="markAttendance" class="bg-green-500 text-white px-4 py-2 rounded-lg">
          Mark Attendance
        </button>
      </div>

      <div class="flex flex-col gap-2">
        <input v-model="checkTicketId" placeholder="Check Ticket ID" class="px-3 py-2 rounded-lg"/>
        <button @click="checkAttendance" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Verify Ticket
        </button>
        <p v-if="verified !== null" class="text-white">
          Ticket Verified: {{ verified ? "✅ Yes" : "❌ No" }}
        </p>
      </div>

      <div class="flex flex-col gap-2 mt-4">
        <p class="text-lg text-white">Recent Arrivals (Event ID {{ eventId }})</p>
        <div class="flex flex-wrap w-full gap-2">
          <div
            v-for="record in attendanceRecords"
            :key="record.ticketId"
            class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center"
          >
            <div class="flex justify-between text-sm text-[#788BFF] w-full">
              <p class="truncate max-w-[150px]">{{ record.ticketId }}</p>
              <p>{{ formatDate(record.timestamp) }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, markRaw } from 'vue'
import { Icon } from '@iconify/vue'
import { ethers } from 'ethers'
import AttendanceABI from '../../../../backend/abi/Attendance.json'

const SEPOLIA_CHAIN_ID = '0xaa36a7';

const isConnected = ref(false)
const provider = shallowRef(null)
const signer = shallowRef(null)
const contract = shallowRef(null)

const ticketId = ref('')
const eventId = ref('')
const checkTicketId = ref('')
const verified = ref(null)
const attendanceRecords = ref([])

const formatDate = ts => {
  if (!ts) return ''
  return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Switch to Sepolia
const switchToSepolia = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: SEPOLIA_CHAIN_ID }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: SEPOLIA_CHAIN_ID,
              chainName: 'Sepolia Test Network',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'SEP', decimals: 18 },
              rpcUrls: ['https://sepolia.infura.io/v3/'],
              blockExplorerUrls: ['https://sepolia.etherscan.io'],
            },
          ],
        });
      } catch (addError) {
        console.error("Could not add Sepolia network", addError);
      }
    }
    console.error("Failed to switch to Sepolia", switchError);
  }
}

// Connect MetaMask
const connectMetaMask = async () => {
  try {
    if (!window.ethereum) return alert("MetaMask not detected!")

    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (currentChainId !== SEPOLIA_CHAIN_ID) {
      await switchToSepolia();
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    
    const rawProvider = new ethers.BrowserProvider(window.ethereum)
    provider.value = markRaw(rawProvider)
    
    const rawSigner = await provider.value.getSigner()
    signer.value = markRaw(rawSigner)

    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
    if (!contractAddress) throw new Error("Contract address missing from .env")

    const abi = AttendanceABI.abi

    const rawContract = new ethers.Contract(contractAddress, abi, signer.value)
    contract.value = markRaw(rawContract)

    isConnected.value = true
    console.log("Connected to Sepolia:", accounts[0])
  } catch (err) {
    console.error("Connection failed:", err)
    alert("Check console. Make sure you are on Sepolia.")
  }
}

// Mark attendance
const markAttendance = async () => {
  if (!contract.value) return alert("Not connected")
  try {
    const _ticketId = ethers.id(ticketId.value)
    const _eventId = ethers.id(eventId.value)

    const isOp = await contract.value.operators(signer.value.address);
    if (!isOp) {
      alert("Error: Your wallet is not registered as an Operator!");
      return;
    }

    const tx = await contract.value.markAttendance(_ticketId, _eventId)
    await tx.wait()
    alert("Attendance marked ✅")
    fetchEventAttendees(_eventId)
  } catch (err) {
    if (err.message.includes("Ticket already used")) {
      alert("This ticket has already been checked in!");
    } else if (err.message.includes("Not operator")) {
      alert("Access Denied: You are not a registered Operator.");
    } else {
      console.error("Detailed Error:", err);
      alert("Transaction failed. Check console.");
    }
  }
}

// Check ticket
const checkAttendance = async () => {
  if (!checkTicketId.value) return alert("Please enter a Transaction Hash to verify");
  
  verified.value = null;
  
  try {
    const response = await fetch('http://localhost:3000/api/tickets/verify-transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        txHash: checkTicketId.value // Nama key harus 'txHash' agar sesuai controller
      })
    });

    const result = await response.json();

    if (result.success) {
      verified.value = true;
      alert("Transaction Verified via Etherscan API! ✅");
    } else {
      verified.value = false;
      alert("Transaction Failed or Not Found on Etherscan ❌");
    }
  } catch (err) {
    console.error("API Verification failed:", err);
    alert("System error during verification");
  }
}

// Fetch attendees
const fetchEventAttendees = async (specificEventId) => {
  if (!contract.value) return
  try {
    const targetEvent = specificEventId || ethers.id(eventId.value)
    const tickets = await contract.value.getEventAttendees(targetEvent)
    
    const records = []
    for (let t of tickets) {
      const record = await contract.value.getAttendanceRecord(t)
      records.push({
        ticketId: t,
        timestamp: Number(record.timestamp)
      })
    }
    attendanceRecords.value = records.reverse()
  } catch (err) {
    console.error("Fetch failed:", err)
  }
}

const disconnectMetaMask = () => {
  provider.value = null
  signer.value = null
  contract.value = null
  isConnected.value = false
  attendanceRecords.value = []
}
</script>