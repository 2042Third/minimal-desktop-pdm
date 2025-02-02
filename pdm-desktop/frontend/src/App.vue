<script setup>
import HelloWorld from './components/HelloWorld.vue';
import TestButton from "./components/TestButton.vue";
</script>

<template>
  <div id="container" >
    <div class="title-bar"></div>
    <img
        id="logo"
        style="--wails-draggable:no-drag"
        alt="Wails logo"
        src="./assets/images/pdmIcon.svg"
        draggable="false"
    />
    <TestButton class="normal-component" />
    <HelloWorld class="normal-component" />
  </div>
</template>

<style>

.title-bar {
  --wails-draggable:drag;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.1);
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}

#container {
  --wails-draggable:drag;
  width: 100%;
  height: 100%;
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}

#logo {
  display: block;
  width: 50%;
  height: 50%;
  margin: auto ;
  padding: 0 0 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-origin: content-box;
  border-radius: 100px;
  /* Prevent interaction */
  pointer-events: none;
  /* Prevent text/image selection */
  user-select: none;
}

normal-component {
  --wails-draggable:no-drag;
  margin: auto;
  /* Prevent interaction */
  pointer-events: all;
  /* Prevent text/image selection */
  user-select: all;
}

</style>
