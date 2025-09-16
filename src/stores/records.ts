import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Record {
  metka: { text: string }[]
  pass: string | null
  login: string
  type: string
}

export const useRecordsStore = defineStore(
  'records',
  () => {
    const records = ref<Record[]>([])
    const metka = ref('')
    const pass = ref('')
    const login = ref('')
    const type = ref('')

    function dumpMetka() {
      return metka.value
        .split(';')
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
        .map((item) => ({ text: item }))
    }

    function newRecord() {
      const record = {
        metka: dumpMetka(),
        pass: pass.value,
        login: login.value,
        type: type.value,
      }
      records.value.push(record)
    }

    function updateRecord(id: number) {
      const record = {
        metka: dumpMetka(),
        pass: pass.value,
        login: login.value,
        type: type.value,
      }
      records.value.splice(id, 1, record)
    }

    function deleteRecord(id: number) {
      records.value.splice(id, 1)
      console.log('Deleted record with id:', id)
    }

    return { records, metka, pass, login, type, newRecord, deleteRecord, updateRecord }
  },
  {
    persist: true,
  },
)
