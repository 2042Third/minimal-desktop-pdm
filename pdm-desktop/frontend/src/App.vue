<script setup>
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <div id="container" style="--wails-draggable:drag">
    <img
        id="logo"
        style="--wails-draggable:no-drag"
        alt="Wails logo"
        src="./assets/images/pdmIcon.svg"
        draggable="false"
    />
    <HelloWorld class="normal-component" style="--wails-draggable:no-drag" />
  </div>
</template>

<style>

#container {
  width: 100%;
  height: 100%;
}

#logo {
  display: block;
  width: 50%;
  height: 50%;
  margin: 10% auto auto ;
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
  margin: auto;

  /* Prevent interaction */
  pointer-events: all;

  /* Prevent text/image selection */
  user-select: all;
}

* {
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
</style>
