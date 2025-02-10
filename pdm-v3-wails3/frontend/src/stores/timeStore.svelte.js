import { writable } from 'svelte/store';
import { Events } from "@wailsio/runtime";

export let time = $state({
  str: ''
});

// Global event listener
// @ts-ignore
Events.On('time', (/** @type {{ data: string[]; }} */ t) => {
  time.str = t.data[0];
});
