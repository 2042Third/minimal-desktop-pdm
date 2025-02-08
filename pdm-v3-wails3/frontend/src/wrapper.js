import { browser } from '$app/environment';

let greetService = {
    Greet: async () => '' // Default implementation for SSR
};

function initService() {
    if (browser) {
        console.log("Is in browser");
        return import('@pdm/index.js')
            .then(module => {
                greetService = module;
                return module;
            });
    }
    return Promise.resolve(greetService);
}

export const initialize = ()=> initService();
export const GreetService = (...args) => greetService.Greet(...args);
