<script lang="ts">
    import { onMount } from 'svelte';
    import { query,
            results,
            tables,
            dbFile,
            editingCell,
    } from '@stores/databaseStore';
    import {Database} from "@pdm/services/index.js";
    import { derived } from 'svelte/store';
    import {QueryResult} from "@pdm/models";



    // Clean query string
    const cleanQuery = (sql:string) => sql.trim().replace(/\n/g, ' ');

    // Database operations
    async function executeQuery() {
        try {
            // Using $results to set the store value
            $results = await Database.ExecuteQuery(cleanQuery($query.sql));
        } catch (error: any) {
            $results.error = error.message;
        }
    }

    async function executeStatement() {
        try {
            const output = await Database.Execute(cleanQuery($query.sql));
            console.log(output);
        } catch (error: any) {
            $results.error = error.message;
        }
    }

    async function loadSQLiteName() {
        $dbFile = await Database.GetName();
    }

    async function loadTables() {
        try {
            const result:QueryResult = await Database.ExecuteQuery("SELECT name FROM sqlite_master WHERE type='table';");
            // @ts-ignore
            $tables = result.rows.map(row => row[0]);
        } catch (error) {
            console.error('Failed to load tables:', error);
        }
    }

    function selectTable(tableName:string) {
        $query = {
            table: tableName,
            sql: `SELECT rowid, * FROM ${tableName} LIMIT 100;`
        };
        executeQuery();
    }


    // Cell editing
    let editValue = $state('');
    let tableContainer:any;


    // Define a derived store for editorStyle
    const editorStyle = derived(editingCell, ($editingCell) => {
        if (!$editingCell.editing) return '';
        return `
            position: absolute;
            top: ${$editingCell.top}px;
            left: ${$editingCell.left}px;
            width: ${$editingCell.width}px;
            height: ${$editingCell.height}px;
        `;
    });

    function startEditing(event: any, row: number, column: number, value: string) {
        const cell = event.target;
        const rect = cell.getBoundingClientRect();
        const tableRect = tableContainer.getBoundingClientRect();


        editValue = value;
        $editingCell = {
            editing: true,
            row,
            column,
            width: rect.width,
            height: rect.height,
            top: rect.top - tableRect.top + tableContainer.scrollTop,
            left: rect.left - tableRect.left + tableContainer.scrollLeft
        };
        setTimeout(() => {
            const textarea = document.querySelector('.cell-editor');
            if (textarea) {
                textarea.focus();
            }
        }, 0);
    }

    function stopEditing() {
        $editingCell.editing = false;
    }

    async function saveEdit() {
        if (!$editingCell.editing) return;

        try {
            const rowIndex = $editingCell.row;
            const colIndex = $editingCell.column;
            const rowId = $results.rows[rowIndex][0];
            const columnName = $results.columns[colIndex];
            // alert(`UPDATE ${$query.table} SET ${columnName} = ${editValue} WHERE rowid = ${rowId}`);
        } catch (error) {
            console.error('Failed to update:', error);
        } finally {
            stopEditing();
        }
    }

    onMount(() => {
        loadTables();
        loadSQLiteName();
    });
</script>

<div class="query-runner">
    <div class="container">
        <!-- Left Panel -->
        <div class="left-panel">
            <div class="query-input">
        <textarea
                bind:value={$query.sql}
                placeholder="Enter your SQL query..."
                onkeydown={(e) => e.ctrlKey && e.key === 'Enter' && executeQuery()}
        ></textarea>
                <button onclick={executeQuery}>Execute Query</button>
                <button onclick={executeStatement}>Execute Statement</button>
                <button onclick={loadTables}>Refresh</button>
            </div>

            <div>
                <h3>Database Name</h3>
                <p>{$dbFile}</p>
            </div>

            <div class="tables-list">
                <h3>Available Tables</h3>
                <ul>
                    {#each $tables as table}
                        <li onclick={() => selectTable(table)}>
                            {table}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>

        <!-- Right Panel -->
        <div class="results-panel">
            {#if results}
                <div class="query-results">
                    {#if $results.error}
                        <div class="error">{$results.error}</div>
                    {:else}
                        <div class="table-container" bind:this={tableContainer}>
                            <table>
                                <thead>
                                <tr>
                                    {#each $results.columns as column}
                                        <th>{column}</th>
                                    {/each}
                                </tr>
                                </thead>
                                <tbody>
                                {#each $results.rows as row, index}
                                    <tr>
                                        {#each row as cell, cellIndex}
                                            <td
                                                    data-row={index}
                                                    data-col={cellIndex}
                                                    style="--custom-contextmenu: dbTableMenu; --custom-contextmenu-data: {JSON.stringify({ table: $query.table, rowid: row[0], column: $results.columns[cellIndex] })}"
                                                    ondblclick={(e) => startEditing(e, index, cellIndex, cell)}
                                            >
                                                {cell}
                                            </td>
                                        {/each}
                                    </tr>
                                {/each}
                                </tbody>
                            </table>

                            {#if $editingCell.editing}
                                <textarea
                                        class="cell-editor"
                                        bind:value={editValue}
                                        style={$editorStyle}
                                        onblur={saveEdit}
                                        onkeydown={(e) => {
                                            if (e.key === 'Enter') saveEdit();
                                            if (e.key === 'Escape') stopEditing();
                                        }}
                                ></textarea>
                            {/if}
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>

    td {
        height: var(--cell-height, 40px);
        width: var(--cell-width, 100px);
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
        resize: none;
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

    .table-container {
        position: relative;
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
    /* CSS remains largely the same, but with these additions/modifications */
    :global(body) {
        color-scheme: light dark;
    }

    .query-runner {
        --text-primary: var(--color-text, #000);
        --text-secondary: var(--color-text-secondary, #666);
        --bg-primary: var(--color-background, #fff);
        --bg-secondary: var(--color-background-soft, #f5f5f5);
        --border-color: var(--color-border, #ddd);

        @media (prefers-color-scheme: dark) {
            --text-primary: var(--color-text, #fff);
            --text-secondary: var(--color-text-secondary, #aaa);
            --bg-primary: var(--color-background, #1a1a1a);
            --bg-secondary: var(--color-background-soft, #2a2a2a);
            --border-color: var(--color-border, #444);
        }

        color: var(--text-primary);
        background: var(--bg-primary);
    }


</style>
