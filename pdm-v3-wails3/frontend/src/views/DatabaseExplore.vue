
<script setup>
import {computed, nextTick, onMounted, ref, watch} from 'vue'
import { Database } from '../../bindings/pdm/services/index.js'
import {useDatabaseStore} from "@/stores/databaseExplore.js";
import {storeToRefs} from "pinia";

const store = useDatabaseStore()
// Destructure after creating store instance

// Use storeToRefs for reactive properties
const { query, results, tables, dbFile } = storeToRefs(store)
// Keep actions as regular destructuring
const { setResults, setTables, setDbFile, setQuery } = store

// Add watchers to debug
watch(() => store.results, (newVal) => {
  console.log('Store results changed:', newVal)
}, { deep: true })

watch(() => store.tables, (newVal) => {
  console.log('Store tables changed:', newVal)
}, { deep: true })

// Strip the query string and removes new lines
const cleanQuery = (sql) => sql.trim().replace(/\n/g, ' ')


const executeQuery = async () => {
  try {
    setResults(await Database.ExecuteQuery(cleanQuery(query.value.sql)))
  } catch (error) {
    setResults({ error: error.message })
  }
}

const executeStatement = async () => {
  try {
    const output = await Database.Execute(cleanQuery(query.value.sql));
    console.log(output)
  } catch (error) {
    setResults({ error: "Error occurred" })
  }
}

const loadSQLiteName = async () => {
  setDbFile(await Database.GetName());

}

const loadTables = async () => {
  try {
    const result = await Database.ExecuteQuery("SELECT name FROM sqlite_master WHERE type='table';")
    console.log(result)
    setTables(result.rows.map(row => row[0]))
  } catch (error) {
    console.error('Failed to load tables:', error)
  }
}

const selectTable = (tableName) => {
  setQuery({table: tableName, sql: `SELECT rowid, * FROM ${tableName} LIMIT 100;`})
  executeQuery()
}

onMounted(() => {
  loadTables()
  loadSQLiteName()
})

/////////////////////////////// Floating window
const tesseract = ref({
  top: 0,
  left: 0,
  width: 0,
  height: 0
});

// Add these variables for cell editing
const editingCell = ref(null)
const editValue = ref('')
const inputPosition = ref({ top: 0, left: 0 })

const tableContainer = ref(null)
const scrollHandler = ref(null)

const getEditorStyle = computed(() => {
  if (!editingCell.value) return {};
  return {
    position: 'absolute',
    top: `${editingCell.value.top}px`,
    left: `${editingCell.value.left}px`,
    width: `${editingCell.value.width}px`,
    height: `${editingCell.value.height}px`
  };
});


const startEditing = (event, row, column, value) => {
  const cell = event.target;
  editValue.value = value;
  editingCell.value = { row, column };

  const updatePosition = () => {
    const rect = cell.getBoundingClientRect();

    const editor = document.querySelector('.cell-editor');
    if (editor) {
      editor.style.top = `${rect.top }px`;
      editor.style.left = `${rect.left }px`;
      editor.style.width = `${rect.width}px`;
      editor.style.height = `${rect.height}px`;
    }
  };

  // Store the scroll handler reference so we can remove it later
  scrollHandler.value = updatePosition;

  // Add scroll event listener
  tableContainer.value.addEventListener('scroll', updatePosition);

  nextTick(() => {
    updatePosition();
    const editor = document.querySelector('.cell-editor');
    if (editor) editor.focus();
  });
};


// Update the stopEditing function to remove the scroll listener
const stopEditing = () => {
  if (tableContainer.value && scrollHandler.value) {
    tableContainer.value.removeEventListener('scroll', scrollHandler.value);
    scrollHandler.value = null;
  }
  editingCell.value = null;
}

// Add onBlur handler
const handleBlur = (event) => {
  // Check if the related target is not within the editing context
  if (!event.relatedTarget || !event.relatedTarget.closest('.floating-input')) {
    saveEdit()
  }
}


// Function to save changes
const saveEdit = async () => {
  if (!editingCell.value) return

  try {
    const rowIndex = editingCell.value.row
    const colIndex = editingCell.value.column
    const rowId = results.value.rows[rowIndex][0] // Assuming first column is rowid
    const columnName = results.value.columns[colIndex]
    alert(`UPDATE ${query.value.table} SET ${columnName} = ${editValue.value} WHERE rowid = ${rowId}`)
    // // Update database
    // await Database.ExecuteQuery(
    //   `UPDATE ${query.value.table}
    //    SET ${columnName} = ?
    //    WHERE rowid = ?`,
    //   [editValue.value, rowId]
    // )
    //
    // // Update local results
    // if (results.value && results.value.rows[rowIndex]) {
    //   results.value.rows[rowIndex][colIndex] = editValue.value
    // }
  } catch (error) {
    console.error('Failed to update:', error)
    // Handle error (maybe show a notification)
  } finally {
    stopEditing()
  }
}

</script>

<template>
  <div class="query-runner">
    <div class="container">
      <!-- Left Panel -->
      <div class="left-panel">
        <!-- Query Input -->
        <div class="query-input">
          <textarea
            v-model="query.sql"
            placeholder="Enter your SQL query..."
            @keydown.ctrl.enter="executeQuery"
          ></textarea>
          <button @click="executeQuery">Execute Query</button>
          <button @click="executeStatement">Execute Statement</button>
          <button @click="loadTables">Refresh</button>
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
          <div class="table-container" ref="tableContainer" v-else>
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
                <td v-for="(cell, cellIndex) in row"
                    :key="cellIndex"
                    :data-row="index"
                    :data-col="cellIndex"
                    :style="`--custom-contextmenu: dbTableMenu; --custom-contextmenu-data: ${JSON.stringify({ table:query.table , rowid: row[0], column: results.columns[cellIndex] })}`"
                    @dblclick="startEditing($event, index, cellIndex, cell)"
                >
                  {{ cell }}

                </td>
              </tr>
              </tbody>
            </table>
            <textarea
              v-if="editingCell"
              v-model="editValue"
              class="cell-editor"
              @blur="saveEdit"
              @keyup.enter="saveEdit"
              @keyup.esc="stopEditing"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped>

.table-container {
  position: static;
  height: 100%;
  overflow: auto;
}

.cell-editor {
  position: absolute;
  margin: 0;
  padding: 8px;
  box-sizing: border-box;
  border: 2px solid #3498db;
  background: var(--color-background);
  color: var(--color-text);
  z-index: 1000;
  font-family: inherit;
  font-size: inherit;
}



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
