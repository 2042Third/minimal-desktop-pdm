<script>
    export const prerender = false;
    // import {GreetService, initialize} from "../wrapper.js";
    import {GreetService} from "@pdm";
    import {onMount} from "svelte";

    console.log("Mounted");

    let resultElement = $state("");
    let name = "Wails";

    onMount(() => {
        console.log("Mounted");
        // initialize();
    });

    const doGreet = () => {
        let name = document.getElementById('name').value;
        if (!name) {
            name = 'anonymous';
        }
        GreetService.Greet(name).then((result) => {
            console.log(result);
            resultElement = result;
        }).catch((err) => {
            console.log(err);
            resultElement = 'Error: ' + err;
        });
    }



    // window.doGetString = () => {
    //     let str = document.getElementById('get-string').value;
    //     if (!str) {
    //         str = 'anonymous';
    //     }
    //     NativeModules.GetHelloString(str).then((result) => {
    //         console.log("C String Output: "+result);
    //         cStringOut.value = result;
    //     }).catch((err) => {
    //         console.log(err);
    //         cStringOut.value = 'Error: ' + err;
    //     });
    // }

</script>

<h1>Hello {name}!</h1>

<div class="about">
    <h1>Wails 3 Tests</h1>
    <p>Enter your name:</p>
    <input id="name" type="text" />
    <button onclick="{doGreet}">Greet</button>
    <p id="result">The output is: {{ resultElement }}</p>
<!--    <button onclick="doCHello()">Call C Hello</button>-->
<!--    <p id="result">The output is: {{ cHelloOut }}</p>-->

<!--    <input id="get-string" type="text" />-->

<!--    <button onclick="doGetString()">Call C String With Input</button>-->
<!--    <p id="result">The output is: {{ cStringOut }}</p>-->

<!--    <p>Time: {{time}}</p>-->
<!--    <p>Local Time: {{localTime}}</p>-->

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