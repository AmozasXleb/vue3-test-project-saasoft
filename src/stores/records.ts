import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Record {
  metka: { text: string }[]
  type: 'local' | 'ldap'
  login: string
  pass: string | null
}

export const useRecordsStore = defineStore(
  'records',
  () => {
    const records = ref<Record[]>([])

    function newRecord() {
      records.value.push({
        metka: [],
        type: 'local',
        login: '',
        pass: '',
      })
    }

    function updateRecord(index: number, record: Record) {
      records.value[index] = record
    }

    function deleteRecord(index: number) {
      records.value.splice(index, 1)
    }

    return {
      records,
      newRecord,
      updateRecord,
      deleteRecord,
    }
  },
  {
    persist: true,
  },
)
