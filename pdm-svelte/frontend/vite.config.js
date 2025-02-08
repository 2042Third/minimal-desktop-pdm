import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import path from 'path';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    ssr: {
        noExternal: [
            '@wailsio/runtime',
            ' ./bindings/*',
            '../runtime-debug',
            '../runtime'
        ], // Prevent Vite from running this in SSR
    },
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
            '@wailsio/runtime': path.resolve('../runtime-debug'),
            '@pdm': path.resolve('./bindings/pdm'),
        },
        extensions: ['.js', '.ts']
    },
    optimizeDeps: {
        include: ['@wailsio/runtime'],
    },
    build: {
        rollupOptions: {
            external: ['@wailsio/runtime'], // Mark it as external to prevent SSR bundling
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        }
    },
    plugins: [
        sveltekit(),
        tailwindcss(),
    ],
});