<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRecordsStore, type Record } from '@/stores/records'

const recordsStore = useRecordsStore()
const records = ref<Record[]>([])

onMounted(() => {
  records.value = recordsStore.records
})

function metkaToString(array: any[]) {
  if (!Array.isArray(array)) return ''
  return array
    .map((item) => item.text)
    .filter(Boolean)
    .join(';')
}
</script>

<template>
  <main class="flex flex-col m-6 gap-6">
    <nav class="flex items-center gap-6">
      <h1 class="text-indigo-500/50 text-xl">Учетные записи</h1>
      <button
        @click="recordsStore.newRecord()"
        class="size-10 border-1 rounded-md transition duration-200 ease-in-out border-indigo-500/50 hover:bg-indigo-500/50 text-indigo-500/50 text-xs text-center hover:text-white"
      >
        ✚
      </button>
    </nav>
    <div class="flex flex-row gap-4 items-center p-2 bg-indigo-300 rounded-md">
      <img src="/public/vopros.png" alt="Подсказка" class="size-8 invert" />
      <p class="m-[0] text-center h-full text-white">
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </p>
    </div>

    <!-- основной блок -->
    <div class="flex flex-col gap-4">
      <!-- предупреждение -->
      <div class="grid grid-cols-16 w-full text-indigo-500/50 font-bold gap-4">
        <div class="col-span-4">Метки</div>
        <div class="col-span-3">Тип записи</div>
        <div class="col-span-4">Логин</div>
        <div class="col-span-5">Пароль</div>
      </div>

      <div class="flex flex-col gap-4">
        <div
          class="grid grid-cols-16 w-full gap-4 text-indigo-500/50"
          :id="`${index}`"
          v-for="(item, index) in records"
        >
          <input
            type="text"
            :value="`${metkaToString(item.metka)}`"
            class="col-span-4 p-1.5 border-1 rounded-md border-indigo-500/50"
          />
          <select
            name="typeOfRecord"
            class="col-span-3 p-1.5 border-1 rounded-md bg-white border-indigo-500/50"
            :value="`${item.type}`"
          >
            <option value="local" class="bg-white">Локальная</option>
            <option value="ldap" class="bg-white">LDAP</option>
          </select>
          <input
            type="text"
            :value="`${item.login}`"
            :class="
              item.pass === null
                ? 'col-span-8 p-1.5 border-1 rounded-md border-indigo-500/50'
                : 'col-span-4 p-1.5 border-1 rounded-md border-indigo-500/50'
            "
          />

          <input
            v-if="item.pass !== null"
            type="password"
            :value="`${item.pass}`"
            class="col-span-4 p-1.5 border-1 rounded-md border-indigo-500/50"
          />

          <button
            :id="`${index}`"
            @click="recordsStore.deleteRecord(index)"
            class="transition-all duration-250 ease-in-out hover:text-xl"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
