<script >
    import NotificationTestingButtons from "$lib/components/testing/notificationTestingButtons.svelte";
    import Wails3included from "$lib/components/testing/wails3included.svelte";

    console.log("Mounted");

    let openNotificationTesting = $state(false);
    let openWailsDefaultTests = $state(false);

</script>

<div class="about">



    <button onclick={() => {openNotificationTesting = !openNotificationTesting; }}>
        {openNotificationTesting? "Close" :"Open"} Notification Testing Buttons
    </button>

    {#if openNotificationTesting}
        <NotificationTestingButtons/>
    {/if}

    <button onclick={() => {openWailsDefaultTests = !openWailsDefaultTests; }}>
        {openWailsDefaultTests? "Close" :"Open"} Wails 3 Included Testing Components
    </button>

    {#if openWailsDefaultTests}
        <Wails3included/>
    {/if}


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

</style>