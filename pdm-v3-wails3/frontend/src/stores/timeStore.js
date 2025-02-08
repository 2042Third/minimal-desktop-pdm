import { writable } from 'svelte/store';
import { Events } from "@wailsio/runtime";

export const time = writable("");

// Global event listener
// @ts-ignore
Events.On('time', (/** @type {{ data: string[]; }} */ t) => {
  time.set(t.data[0]);
});
