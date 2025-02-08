import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDatabaseStore = defineStore('database', () => {
  const state = ref({
    query: {table: '', sql: ''},
    results: {error:"", columns: [], rows: []},
    tables: [],
    dbFile: ''
  })

  // Computed properties that will only update when the actual data changes
  const query = computed({
    get: () => state.value.query,
    set: (val) => state.value.query = val
  })
  const results = computed(() => state.value.results)
  const tables = computed(() => state.value.tables)
  const dbFile = computed(() => state.value.dbFile)

  // Actions
  function setQuery(qry) {
    state.value.query = qry
  }

  function setResults(res) {
    state.value.results = res
  }

  function setTables(tbls) {
    state.value.tables = tbls
  }

  function setDbFile(file) {
    state.value.dbFile = file
  }

  return {
    query,
    results,
    tables,
    dbFile,
    setQuery,
    setResults,
    setTables,
    setDbFile
  }
})
