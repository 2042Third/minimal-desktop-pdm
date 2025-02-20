<script lang="ts">
  import {AppState } from "@pdm/services";
  import {FileTreeMap} from "@pdm/models";
  import {notifications} from "@stores/notifications";
  import Treemap from "$lib/components/treemap/Treemap.svelte";
  let fileTreeMap: FileTreeMap = $state(FileTreeMap.createFrom());

  const getTreemap = () => {

    AppState.ReadFileTree().then((result) => {
      // console.log(JSON.stringify(JSON.parse(result), null, 2));
      fileTreeMap = FileTreeMap.createFrom(JSON.parse(result));
    }).catch((err) => {
      console.log(err);
      notifications.add({
        type: 'error',
        title: 'Error',
        message: err.message || 'Something went wrong',
      });
    });
  }

  const testData = {
    name: "root",
    isDir: true,
    size: 300, // Total size must be > 0
    children: [
      {
        name: "file1.txt",
        isDir: false,
        size: 100,
        children: []
      },
      {
        name: "file2.txt",
        isDir: false,
        size: 100,
        children: []
      },
      {
        name: "folder",
        isDir: true,
        size: 100,
        children: [
          {
            name: "nested-file.txt",
            isDir: false,
            size: 100,
            children: []
          }
        ]
      }
    ]
  };

</script>

<h1>File Treemap</h1>

<button onclick={getTreemap}>
  Get File Treemap
</button>

{#if fileTreeMap.root}
  <h2> {fileTreeMap.root.name}</h2>
  <Treemap data={fileTreeMap.root} />
{/if}