
<script lang="ts">
    import {GreetService} from "@pdm";
    import {NativeModules} from "@pdm/services";
    import { time } from '@stores/timeStore.svelte';
    import {onMount} from "svelte";
    import {notifications} from "@stores/notifications";

    onMount(()=> {
        notifications.add({
            type: 'info',
            title: 'Information',
            message: 'Wails 3 Default Testing Components are loaded',
            duration: 5000
        });
    })

    let resultElement = $state("");
    let name = $state("Wails");
    let cHelloOut = $state("");
    let cStringOut = $state("");
    let getString = $state("");


    const doGreet = () => {

        GreetService.Greet(name).then((result) => {
            console.log(result);
            resultElement = result;
        }).catch((err) => {
            console.log(err);
            resultElement = 'Error: ' + err;
        });
    }

    const doCHello = () => {
        try {
            NativeModules.Hello();
        }
        catch(err) {
            console.log(err);
            cHelloOut = 'Error: ' + err;
        }
    }

    const doGetString = () => {

        NativeModules.GetHelloString(getString).then((result) => {
            console.log("C String Output: "+result);
            cStringOut = result;
        }).catch((err) => {
            console.log(err);
            cStringOut = 'Error: ' + err;
        });
    }

</script>
<h1>Hello {name}!</h1>

<p>Enter your name:</p>
<input
        bind:value={name}
        onkeyup={(e) => e.key === 'Enter' && doGreet()}
        type="text"
/>
<button onclick={doGreet}>Greet</button>
<p id="result">The output is: {resultElement }</p>
<button onclick="{doCHello}">Call C Hello</button>
<p id="result">The output is: { cHelloOut }</p>

<input bind:value={getString} type="text" />

<button onclick="{doGetString}">Call C String With Input</button>
<p id="result">The output is: {cStringOut }</p>

<p>Time: {time.str}</p>

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