<template>
  <div class="query-runner">
    <div class="container">
      <!-- Left Panel -->
      <div class="left-panel">
        <!-- Query Input -->
        <div class="query-input">
          <textarea
            v-model="query"
            placeholder="Enter your SQL query..."
            @keydown.ctrl.enter="executeQuery"
          ></textarea>
          <button @click="executeQuery">Execute Query</button>
        </div>
        <div>
          <h3>Database Name</h3>
          <p>{{ dbFile }}</p>
        </div>
        <!-- Tables List -->
        <div class="tables-list">
          <h3>Available Tables</h3>
          <ul>
            <li
              v-for="table in tables"
              :key="table"
              @click="selectTable(table)"
            >
              {{ table }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Right Panel - Results Display -->
      <div class="results-panel">
        <div class="query-results" v-if="results">
          <!-- Error Display -->
          <div class="error" v-if="results.error">
            {{ results.error }}
          </div>

          <!-- Results Table -->
          <div class="table-container" v-else>
            <table>
              <thead>
              <tr>
                <th v-for="column in results.columns" :key="column">
                  {{ column }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(row, index) in results.rows" :key="index">
                <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                  {{ cell }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Database } from '../../bindings/pdm/services/index.js'

const query = ref('')
const results = ref(null)
const tables = ref([])
const dbFile = ref('')

const executeQuery = async () => {
  try {
    results.value = await Database.ExecuteQuery(query.value)
  } catch (error) {
    results.value = { error: error.message }
  }
}

const loadSQLiteName = async () => {
  dbFile.value = await Database.GetName();

}

const loadTables = async () => {
  try {
    const result = await Database.ExecuteQuery("SELECT name FROM sqlite_master WHERE type='table';")
    tables.value = result.rows.map(row => row[0])
  } catch (error) {
    console.error('Failed to load tables:', error)
  }
}

const selectTable = (tableName) => {
  query.value = `SELECT * FROM ${tableName} LIMIT 100;`
  executeQuery()
}

onMounted(() => {
  loadTables()
  loadSQLiteName()
})
</script>

<style scoped>
.query-runner {
  height: 100vh;
  padding: 20px;
  color: var(--color-text);
}

.container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  height: calc(100vh - 40px);
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.query-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.query-input textarea {
  width: 100%;
  min-height: 150px;
  padding: 10px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 4px;
  resize: vertical;
}

.query-input button {
  padding: 8px 16px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  border-radius: 4px;
}

.query-input button:hover {
  border-color: var(--color-border-hover);
}

.tables-list {
  flex: 1;
  overflow-y: auto;
}

.tables-list h3 {
  margin-bottom: 10px;
}

.tables-list ul {
  list-style: none;
  padding: 0;
}

.tables-list li {
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
}

.tables-list li:hover {
  background: var(--color-background-soft);
}

.results-panel {
  height: 100%;
  overflow: hidden;
}

.query-results {
  height: 100%;
}

.table-container {
  height: 100%;
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid var(--color-border);
  padding: 8px;
  text-align: left;
}

th {
  position: sticky;
  top: 0;
  background: var(--color-background-soft);
  z-index: 1;
}

.error {
  color: #ff4444;
  padding: 10px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 4px;
}
</style>
