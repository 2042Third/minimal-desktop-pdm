<script setup>
import {GreetService} from '../../bindings/pdm/index.js';
import {ref} from 'vue';
import {useAppStore} from "@/stores/app.js";
import {computed} from 'vue';
import {Events} from '@wailsio/runtime';

const resultElement = ref('');
const appStore = useAppStore();
const time = computed(()=>appStore.time);

const localTime = ref("");

Events.On('time', (time) => {
  localTime.value = time.data[0];
});

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


</script>

<template>
  <div class="about">
    <h1>Wails 3 Tests</h1>
    <p>Enter your name:</p>
    <input id="name" type="text" />
    <button onclick="doGreet()">Greet</button>
    <p id="result">The output is: {{ resultElement }}</p>
    <p>Time: {{time}}</p>
    <p>Local Time: {{localTime}}</p>
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
