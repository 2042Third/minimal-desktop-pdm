<script setup>
import {GreetService} from '../../bindings/pdm/index.js';
import {ref} from 'vue';
import {useAppStore} from "@/stores/app.js";
import {computed} from 'vue';
import {Events} from '@wailsio/runtime';
import {NativeModules} from "../../bindings/pdm/services/index.js";

const resultElement = ref('');
const cHelloOut = ref('');
const cStringOut = ref('');
const appStore = useAppStore();
const time = computed(()=>appStore.time);

const localTime = ref("");

Events.On('time', (time) => {
  localTime.value = time.data[0];
});

window.doCHello = () => {
  try {
    NativeModules.Hello();
  }
  catch(err) {
    console.log(err);
    cHelloOut.value = 'Error: ' + err;
  }
}

window.doGreet = () => {
  let name = document.getElementById('name').value;
  if (!name) {
    name = 'anonymous';
  }
  GreetService.Greet(name).then((result) => {
    console.log(result);
    resultElement.value = result;
  }).catch((err) => {
    console.log(err);
    resultElement.value = 'Error: ' + err;
  });
}

window.doGetString = () => {
  let str = document.getElementById('get-string').value;
  if (!str) {
    str = 'anonymous';
  }
  NativeModules.GetHelloString(str).then((result) => {
    console.log("C String Output: "+result);
    cStringOut.value = result;
  }).catch((err) => {
    console.log(err);
    cStringOut.value = 'Error: ' + err;
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  let copyButton = document.querySelector('#copyButton');
  copyButton.addEventListener('click', function(event) {
    let preElement = document.querySelector('#cmd');
    let text = preElement.textContent.trim();
    navigator.clipboard.writeText(text).then(function() {
      console.log('Copying to clipboard was successful!');
      // Select the text in the pre element
      let selection = window.getSelection();
      selection.selectAllChildren(preElement);
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  });
});

</script>

<template>
  <div class="about">
    <h1>Wails 3 Tests</h1>
    <p>Enter your name:</p>
    <input id="name" type="text" />
    <button onclick="doGreet()">Greet</button>
    <p id="result">The output is: {{ resultElement }}</p>
    <button onclick="doCHello()">Call C Hello</button>
    <p id="result">The output is: {{ cHelloOut }}</p>

    <input id="get-string" type="text" />

    <button onclick="doGetString()">Call C String With Input</button>
    <p id="result">The output is: {{ cStringOut }}</p>

    <p>Time: {{time}}</p>
    <p>Local Time: {{localTime}}</p>

    <div id="test">
      <p class="region" style="--custom-contextmenu: test; --custom-contextmenu-data: item-123">
        Right click me to see the custom menu!
      </p>

      <div style="--default-contextmenu: hide">
        No context menu here
      </div>

      <div style="--default-contextmenu: auto">
        <p style="user-select: text">Select this text to see the default menu</p>
        <input type="text" placeholder="Type here to see the default menu"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  height: 100%; /* Instead of 100vh */
  width: 100%; /* Take full width of parent */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center; /* Centers content vertically */
  padding: 2rem;
  box-sizing: border-box;
}

input {
  max-width: 300px;
  width: 100%;
  padding: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
}

/* Remove the media query unless you need specific large-screen behavior */
</style>
