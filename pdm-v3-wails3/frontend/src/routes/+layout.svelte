<script>
        import { page } from '$app/state';

</script>

<div class="app-layout">
    <header>
        <h1>PDM Notes</h1>
        <nav>
            <a
                    href="/wails-tests"
                    class:active={page.url.pathname === '/wails-tests'}
            >
                Wails 3
            </a>
            <a
                    href="/database"
                    class:active={page.url.pathname === '/database'}
            >
                Database
            </a>
        </nav>
    </header>

    <main class="content">
        <slot />
    </main>
</div>

<style>
    .app-layout {
        display: flex;
        min-width: 800px;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }

    header {
        width: 200px;
        min-width: 200px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        padding-top: 8rem;
        border-right: 1px solid var(--color-border);
        background-color: var(--color-background-trans);
        --wails-draggable: drag;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .content {
        flex: 1;
        overflow-y: auto;
        min-width: 600px;
        height: 100%;
    }

    h1 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        padding: 0 1rem;
    }

    nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
    }

    nav a {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background-color 0.2s;
        white-space: nowrap;
    }

    nav a:hover {
        background-color: var(--color-background-soft);
    }

    nav a.active {
        color: var(--color-text);
        background-color: var(--color-background-mute);
    }
</style>
