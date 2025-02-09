<script lang="ts">
  import { notifications, type Notification } from '@stores/notifications';
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';
  import {X} from "lucide-svelte";

</script>

<div class="notifications-container">
  {#each $notifications as notification (notification.id)}
    <div
      class="notification {notification.type}"
      animate:flip={{ duration: 300 }}
      transition:fly={{ x: 100, duration: 300 }}
    >
      <div class="icon">
        <notification.icon
        size={20}
        class={notification.type === 'progress' ? 'spin' : ''}
        />
      </div>
      <div class="content">
        {#if notification.title}
          <div class="title">{notification.title}</div>
        {/if}
        <div class="message">{notification.message}</div>
        {#if notification.progress !== undefined}
          <div class="progress-bar">
            <div
              class="progress-fill"
              style="width: {notification.progress}%"
            ></div>
          </div>
        {/if}
        {#if notification.actions}
          <div class="actions">
            {#each notification.actions as action}
              <button onclick={action.onClick}>
                {action.label}
              </button>
            {/each}
          </div>
        {/if}
      </div>
      <button
        class="close icon"
        onclick={() => notifications.remove(notification.id)}
      >
        <X size={16} />
      </button>
    </div>
  {/each}
</div>

<style>
    .notifications-container {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 1000;
        max-width: 400px;
    }

    .notification {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 1rem;
        background-color: var(--color-background-soft);
        border: 1px solid var(--color-border);
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .notification.success { border-left: 4px solid #4caf50; }
    .notification.error { border-left: 4px solid #f44336; }
    .notification.info { border-left: 4px solid #2196f3; }
    .notification.warning { border-left: 4px solid #ff9800; }
    .notification.progress { border-left: 4px solid #9c27b0; }

    .content {
        flex: 1;
        min-width: 0;
    }

    .title {
        font-weight: 600;
        margin-bottom: 0.25rem;
    }

    .message {
        font-size: 0.9rem;
        color: var(--color-text-soft);
    }

    .close {
        background: none;
        border: none;
        padding: 0.25rem;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.2s;
    }

    .close:hover {
        opacity: 1;
    }

    .actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.75rem;
    }

    .actions button {
        background: none;
        border: 1px solid var(--color-border);
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .actions button:hover {
        background-color: var(--color-background-mute);
    }

    .progress-bar {
        margin-top: 0.5rem;
        height: 4px;
        background-color: var(--color-background-mute);
        border-radius: 2px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background-color: #9c27b0;
        transition: width 0.3s ease;
    }

    .spin {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>
