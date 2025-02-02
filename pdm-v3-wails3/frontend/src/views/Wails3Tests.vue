<script setup>
import {GreetService} from '../../bindings/changeme/';
import {Events} from "../../../runtime.js";
import {ref} from 'vue';

const resultElement = ref('');
const timeElement = ref('');

window.doGreet = () => {
  let name = document.getElementById('name').value;
  if (!name) {
    name = 'anonymous';
  }
  GreetService.Greet(name).then((result) => {
    resultElement.value = result;
  }).catch((err) => {
    console.log(err);
  });
}

Events.On('time', (time) => {
  timeElement.value = time.data;
});

</script>

<template>
  <div class="about">

    <h1>Wails 3 Tests</h1>
    <p>Enter your name:</p>
    <input id="name" type="text" />
    <button onclick="doGreet()">Greet</button>
    <p id="result">{{ resultElement }}</p>
    <p>Time: <span >{{timeElement}}}</span></p>
  </div>
</template>

<style>
.about {
  margin: 3rem auto auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
