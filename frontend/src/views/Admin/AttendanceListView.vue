<template class="Dashboard-view">
  <div class="login-form  reltive flex flex-col gap-5 max-w-screen min-h-screen m-0 bg-gradient-to-b from-[#788BFF] to-[#5970FF] items-center justify-top">
    <div class="flex items-center justify-between w-full px-10 py-4 pt-10 bg-white text-[#788BFF] text-xl shadow-3xl rounded-br-3xl rounded-bl-3xl">
        <div class="flex flex-row w-full justify-between">
            <Icon icon="ep:back" class="text-3xl"/>
            <b class="">Checked In</b>
            <Icon icon="mingcute:question-fill" class="text-3xl"/>
        </div>
    </div>
    <div class="flex flex-col w-full px-10 pb-3 shadow-3xl gap-5">
        <div class="flex flex w-full gap-5 justify-center items-center flex-wrap">
            <div class="flex flex-col max-w-full gap-2 flex-2 min-w-[280px]">
                <div class="flex justify-between text-white text-lg">
                    <p>Attendance Status</p>
                    <p>850 / 1000</p>
                </div>
                <div class="flex w-full h-2 bg-[#5970FF] rounded-3xl">
                    <div class="w-[85%] h-full bg-[rgba(0,0,0,0.7)] rounded-3xl"></div>
                </div>
            </div>
            <div class="max-w-full flex-1 min-w-[280px]">
                <div class="relative w-full flex">
                    <Icon icon="tabler:search" class="absolute left-3 top-2 text-2xl text-[#5970FF]" />
                    <input
                        v-model="username"
                        type="text"
                        placeholder="Search attendees by name..."
                        class="w-full pl-10 pr-3 py-2 border rounded-4xl focus:outline-none focus:ring-2 focus:ring-primary bg-white text-[#5970FF] shadow-2xs"
                    />
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-lg text-white">Recent Arivals</p>
            <div class="flex flex-wrap w-full gap-2">
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
                <div class="flex flex-1 min-w-[280px] flex-col gap-2 bg-[rgba(0,0,0,0.7)] rounded-2xl px-4 py-2 pb-4 w-full items-center">
                    <div class="flex justify-between text-xl text-[#5970ff] w-full">
                        <p>John Doe</p>
                        <p>19.00</p>
                    </div>
                    <div class="flex justify-between text-xs text-white w-full">
                        <p class="flex items-center gap-2"><Icon icon="mynaui:ticket-solid"/> TICKET ID : AX-9928-KL2 </p>
                        <p>ARRIVED</p>
                    </div>
                </div>
            </div>
        </div>
        <img src="../../assets/images/scan.png" alt="" class="w-[51px] self-center w-[60px] sticky bottom-4 mx-auto"/>
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
