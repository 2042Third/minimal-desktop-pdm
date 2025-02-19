<script lang="ts">
  import {AppState, NativeModules} from "@pdm/services";
  import {ReadFileTree} from "@pdm/services/appstate";
  let getString = $state("");

  const getTreemap = () => {

    AppState.ReadFileTree().then((result) => {
      console.log(JSON.stringify(JSON.parse(result), null, 2));
      getString = result;
    }).catch((err) => {
      console.log(err);
      getString = 'Error: ' + err;
    });

    // NativeModules.GetHelloString(getString).then((result) => {
    //   console.log("C String Output: "+result);
    //   cStringOut = result;
    // }).catch((err) => {
    //   console.log(err);
    //   cStringOut = 'Error: ' + err;
    // });
  }
</script>

<h1>File Treemap</h1>

<button onclick={getTreemap}>
  Get File Treemap
</button>