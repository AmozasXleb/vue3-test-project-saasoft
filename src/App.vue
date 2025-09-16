<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRecordsStore, type Record } from '@/stores/records'

const recordsStore = useRecordsStore()
const records = ref<Record[]>([])
const errors = ref<{ [key: string]: { [key: string]: boolean } }>({})

onMounted(() => {
  records.value = recordsStore.records
  records.value.forEach((_, index) => validateAllFields(index))
})

function validateAllFields(index: number) {
  const record = records.value[index]
  validateField(index, 'login', record.login || '')
  if (record.type === 'local') {
    validateField(index, 'pass', record.pass || '')
  }
  if (record.metka) {
    validateField(index, 'metka', metkaToString(record.metka))
  }
}

function validateField(index: number, field: string, value: string): boolean {
  if (!errors.value[index]) {
    errors.value[index] = {}
  }

  if (field === 'login') {
    const strValue = String(value)
    const isValid = strValue.length > 0 && strValue.length <= 100
    errors.value[index][field] = !isValid
    return isValid
  }

  if (field === 'pass') {
    const record = records.value[index]
    if (record.type === 'local') {
      const strValue = value || ''
      const isValid = strValue.length > 0 && strValue.length <= 100
      errors.value[index][field] = !isValid
      return isValid
    }
  }

  if (field === 'metka') {
    if (!value) return true
    const isValid = value.length <= 50
    errors.value[index][field] = !isValid
    return isValid
  }

  return true
}

function handleInputBlur(index: number, field: 'login' | 'pass' | 'metka', event: Event) {
  const value = (event.target as HTMLInputElement).value
  const isValid = validateField(index, field, value)

  if (isValid) {
    const updatedRecord = { ...records.value[index] }

    if (field === 'metka') {
      updatedRecord.metka = value
        .split(';')
        .filter((tag) => tag.trim())
        .map((tag) => ({ text: tag.trim() }))
    } else if (field === 'login' || field === 'pass') {
      updatedRecord[field] = value
    }

    recordsStore.updateRecord(index, updatedRecord)
    records.value[index] = updatedRecord
  }
}

function handleTypeChange(index: number, event: Event) {
  const value = (event.target as HTMLSelectElement).value as 'local' | 'ldap'
  const updatedRecord = { ...records.value[index] }
  updatedRecord.type = value

  if (value === 'ldap') {
    updatedRecord.pass = null
    if (errors.value[index]) {
      delete errors.value[index].pass
    }
  } else {
    updatedRecord.pass = ''
  }

  recordsStore.updateRecord(index, updatedRecord)
  records.value[index] = updatedRecord
  validateAllFields(index)
}

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
            :value="metkaToString(item.metka)"
            @blur="handleInputBlur(index, 'metka', $event)"
            maxlength="50"
            class="col-span-4 p-1.5 border-1 rounded-md border-indigo-500/50"
          />
          <select
            name="typeOfRecord"
            class="col-span-3 p-1.5 border-1 rounded-md bg-white border-indigo-500/50"
            :value="item.type"
            @change="handleTypeChange(index, $event)"
          >
            <option value="local">Локальная</option>
            <option value="ldap">LDAP</option>
          </select>
          <input
            type="text"
            :value="item.login"
            @blur="handleInputBlur(index, 'login', $event)"
            maxlength="100"
            :class="{
              'col-span-8': item.type === 'ldap',
              'col-span-4': item.type === 'local',
              'p-1.5 border-1 rounded-md': true,
              'border-indigo-500/50': true,
            }"
          />

          <input
            v-if="item.type === 'local'"
            type="password"
            :value="item.pass"
            @blur="handleInputBlur(index, 'pass', $event)"
            maxlength="100"
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
