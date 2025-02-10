<script lang="ts">
    import {notifications} from "@stores/notifications";
    import {onMount, untrack} from "svelte";
    onMount(() => {
        notifications.add({
            type: 'info',
            title: 'Information',
            message: 'Notification buttons are loaded',
            duration: 5000
        });
    })

    let progress = $state(0);
    let progressId = $state('');

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


<button
        onclick={ () => {
        notifications.add({
            type: 'success',
            title: 'Success',
            message: 'Operation completed successfully',
            duration: 5000
        });
    }}>Success Notification</button>

<button
        onclick={ () => {
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