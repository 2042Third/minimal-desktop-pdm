import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import path from 'path';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    server: {
        fs: {
            allow: [
                searchForWorkspaceRoot(process.cwd()),
                './bindings/*'
            ]
        }
    },
    resolve: {
        alias: {
            '@wailsio/runtime': path.resolve('./runtime-debug'),
            '@pdm': path.resolve('./bindings/pdm'),
            "@stores": path.resolve('./src/stores'),
        },
        extensions: ['.js', '.ts']
    },
    plugins: [
        sveltekit(),
        tailwindcss(),
    ],
});
