<script >
    // import {GreetService, initialize} from "../wrapper.js";
    import {GreetService} from "../../../bindings/pdm";
    import {NativeModules} from "@pdm/services";
    import {time} from "@stores/timeStore.js";

    import {notifications} from "@stores/notifications";
    import {untrack} from "svelte";

    import { Tween } from 'svelte/motion';
    import {Loader} from "lucide-svelte";

    console.log("Mounted");

    let resultElement = $state("");
    let name = $state("Wails");
    let cHelloOut = $state("");
    let cStringOut = $state("");
    let getString = $state("");
    let progress = $state(0);
    let progressId = $state('');


    const makeNotification = () => {
        notifications.add({
            type: 'success',
            title: 'Success',
            message: 'Operation completed successfully',
            duration: 5000
        });
    }

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

    const startProgress = async () => {
        console.log("Starting progress");
        for (let i = 0; i <= 10; i += 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.log("Progress: ", i);
            progress = i*10;
        }
    }

    $effect(() => {
        $inspect(progress);
        if (progressId === ''){
            return;
        }
        if (progress < 100) {
            console.log("$effect: ", progress);
            notifications.updateProgress(progressId, progress);
        } else {
            console.log("$effect remove: ", progressId);
            notifications.remove(progressId);
            notifications.add({
                type: 'success',
                title: 'Download',
                message: 'Download completed successfully',
                duration: 5000
            });
            untrack(() => {
                console.log("Cleanup");
                progressId = ''; // Reset progress id, and prevents $effect loop. But untrack will also do that.
                progress = 0;
            })

        }
    });

</script>

<div class="about">
    <h1>Hello {name}!</h1>

    <button onclick={ () => {
        notifications.add({
            type: 'success',
            title: 'Success',
            message: 'Operation completed successfully',
            duration: 5000
        });
    }}>Success Notification</button>

    <button onclick={ () => {
        notifications.add({
            type: 'error',
            title: 'Error',
            message: 'Something went wrong',
            actions: [
                {
                    label: 'Retry',
                    onClick: () => console.log('Retrying...')
                }
            ]
        });
    }}>Show Error</button>
    <button onclick={()=> {
        progressId = notifications.add({
            type: 'progress',
            title: 'Downloading',
            message: 'file.pdf',
            progress: 0
        });
        startProgress();
    }}>Show Progress</button>

    <button onclick={ () => {
        notifications.add({
            type: 'info',
            title: 'Information',
            message: 'Email is sent',
            duration: 5000
        });
    }}>Info Notification</button>

    <button onclick={ () => {
        notifications.add({
            type: 'warning',
            title: 'Warning',
            message: 'Bad completed warningly',
            duration: 5000
        });
    }}>Warning Notification</button>

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

    <p>Time: {$time}</p>

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

<style >

    .about {
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