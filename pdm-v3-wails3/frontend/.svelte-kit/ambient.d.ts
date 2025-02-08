
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const ACSETUPSVCPORT: string;
	export const ACSVCPORT: string;
	export const ALLUSERSPROFILE: string;
	export const ANDROID_HOME: string;
	export const ANDROID_SDK_ROOT: string;
	export const APPDATA: string;
	export const BASH_ENV: string;
	export const CGO_ENABLED: string;
	export const CHOCOLATEYINSTALL: string;
	export const CHOCOLATEYLASTPATHUPDATE: string;
	export const CLION: string;
	export const COLOR: string;
	export const COMMONPROGRAMFILES: string;
	export const COMMONPROGRAMW6432: string;
	export const COMPUTERNAME: string;
	export const COMSPEC: string;
	export const DRIVERDATA: string;
	export const EDITOR: string;
	export const GIT_INSTALL_ROOT: string;
	export const GO111MODULE: string;
	export const GOPATH: string;
	export const GOROOT: string;
	export const HOME: string;
	export const HOMEDRIVE: string;
	export const HOMEPATH: string;
	export const IJ_RESTARTER_LOG: string;
	export const INIT_CWD: string;
	export const INTEL_DEV_REDIST: string;
	export const JAVA_HOME: string;
	export const JETBRAINS_INTELLIJ_COMMAND_END_MARKER: string;
	export const LOCALAPPDATA: string;
	export const LOGONSERVER: string;
	export const MIC_LD_LIBRARY_PATH: string;
	export const MINGW_INC_PATH: string;
	export const MSMPI_BENCHMARKS: string;
	export const MSMPI_BIN: string;
	export const NODE: string;
	export const NODE_ENV: string;
	export const NODE_EXE: string;
	export const NPM_CLI_JS: string;
	export const npm_command: string;
	export const npm_config_cache: string;
	export const npm_config_globalconfig: string;
	export const npm_config_global_prefix: string;
	export const npm_config_init_module: string;
	export const npm_config_local_prefix: string;
	export const npm_config_loglevel: string;
	export const npm_config_node_gyp: string;
	export const npm_config_noproxy: string;
	export const npm_config_npm_version: string;
	export const npm_config_prefix: string;
	export const npm_config_userconfig: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const npm_lifecycle_event: string;
	export const npm_lifecycle_script: string;
	export const npm_node_execpath: string;
	export const npm_package_json: string;
	export const npm_package_name: string;
	export const npm_package_version: string;
	export const NPM_PREFIX_JS: string;
	export const NPM_PREFIX_NPM_CLI_JS: string;
	export const NUMBER_OF_PROCESSORS: string;
	export const NVM_HOME: string;
	export const NVM_SYMLINK: string;
	export const ONEDRIVE: string;
	export const ONEDRIVECONSUMER: string;
	export const OS: string;
	export const PATH: string;
	export const PATHEXT: string;
	export const POWERSHELL_DISTRIBUTION_CHANNEL: string;
	export const PROCESSOR_ARCHITECTURE: string;
	export const PROCESSOR_IDENTIFIER: string;
	export const PROCESSOR_LEVEL: string;
	export const PROCESSOR_REVISION: string;
	export const PRODUCTION: string;
	export const PROGRAMDATA: string;
	export const PROGRAMFILES: string;
	export const PROGRAMW6432: string;
	export const PROMPT: string;
	export const PSEXECUTIONPOLICYPREFERENCE: string;
	export const PSMODULEPATH: string;
	export const PUBLIC: string;
	export const PYTHONPATH: string;
	export const RLSSVCPORT: string;
	export const SESSIONNAME: string;
	export const SYSTEMDRIVE: string;
	export const SYSTEMROOT: string;
	export const TEMP: string;
	export const TERMINAL_EMULATOR: string;
	export const TERM_SESSION_ID: string;
	export const TMP: string;
	export const TOOLBOX_VERSION: string;
	export const USERDOMAIN: string;
	export const USERDOMAIN_ROAMINGPROFILE: string;
	export const USERNAME: string;
	export const USERPROFILE: string;
	export const VBOX_MSI_INSTALL_PATH: string;
	export const VK_SDK_PATH: string;
	export const VULKAN_SDK: string;
	export const WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS: string;
	export const WEBVIEW2_BROWSER_EXECUTABLE_FOLDER: string;
	export const WEBVIEW2_PIPE_FOR_SCRIPT_DEBUGGER: string;
	export const WEBVIEW2_RELEASE_CHANNEL_PREFERENCE: string;
	export const WEBVIEW2_USER_DATA_FOLDER: string;
	export const WINDIR: string;
	export const WSLENV: string;
	export const WXWIN: string;
	export const ZES_ENABLE_SYSMAN: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		ACSETUPSVCPORT: string;
		ACSVCPORT: string;
		ALLUSERSPROFILE: string;
		ANDROID_HOME: string;
		ANDROID_SDK_ROOT: string;
		APPDATA: string;
		BASH_ENV: string;
		CGO_ENABLED: string;
		CHOCOLATEYINSTALL: string;
		CHOCOLATEYLASTPATHUPDATE: string;
		CLION: string;
		COLOR: string;
		COMMONPROGRAMFILES: string;
		COMMONPROGRAMW6432: string;
		COMPUTERNAME: string;
		COMSPEC: string;
		DRIVERDATA: string;
		EDITOR: string;
		GIT_INSTALL_ROOT: string;
		GO111MODULE: string;
		GOPATH: string;
		GOROOT: string;
		HOME: string;
		HOMEDRIVE: string;
		HOMEPATH: string;
		IJ_RESTARTER_LOG: string;
		INIT_CWD: string;
		INTEL_DEV_REDIST: string;
		JAVA_HOME: string;
		JETBRAINS_INTELLIJ_COMMAND_END_MARKER: string;
		LOCALAPPDATA: string;
		LOGONSERVER: string;
		MIC_LD_LIBRARY_PATH: string;
		MINGW_INC_PATH: string;
		MSMPI_BENCHMARKS: string;
		MSMPI_BIN: string;
		NODE: string;
		NODE_ENV: string;
		NODE_EXE: string;
		NPM_CLI_JS: string;
		npm_command: string;
		npm_config_cache: string;
		npm_config_globalconfig: string;
		npm_config_global_prefix: string;
		npm_config_init_module: string;
		npm_config_local_prefix: string;
		npm_config_loglevel: string;
		npm_config_node_gyp: string;
		npm_config_noproxy: string;
		npm_config_npm_version: string;
		npm_config_prefix: string;
		npm_config_userconfig: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		npm_lifecycle_event: string;
		npm_lifecycle_script: string;
		npm_node_execpath: string;
		npm_package_json: string;
		npm_package_name: string;
		npm_package_version: string;
		NPM_PREFIX_JS: string;
		NPM_PREFIX_NPM_CLI_JS: string;
		NUMBER_OF_PROCESSORS: string;
		NVM_HOME: string;
		NVM_SYMLINK: string;
		ONEDRIVE: string;
		ONEDRIVECONSUMER: string;
		OS: string;
		PATH: string;
		PATHEXT: string;
		POWERSHELL_DISTRIBUTION_CHANNEL: string;
		PROCESSOR_ARCHITECTURE: string;
		PROCESSOR_IDENTIFIER: string;
		PROCESSOR_LEVEL: string;
		PROCESSOR_REVISION: string;
		PRODUCTION: string;
		PROGRAMDATA: string;
		PROGRAMFILES: string;
		PROGRAMW6432: string;
		PROMPT: string;
		PSEXECUTIONPOLICYPREFERENCE: string;
		PSMODULEPATH: string;
		PUBLIC: string;
		PYTHONPATH: string;
		RLSSVCPORT: string;
		SESSIONNAME: string;
		SYSTEMDRIVE: string;
		SYSTEMROOT: string;
		TEMP: string;
		TERMINAL_EMULATOR: string;
		TERM_SESSION_ID: string;
		TMP: string;
		TOOLBOX_VERSION: string;
		USERDOMAIN: string;
		USERDOMAIN_ROAMINGPROFILE: string;
		USERNAME: string;
		USERPROFILE: string;
		VBOX_MSI_INSTALL_PATH: string;
		VK_SDK_PATH: string;
		VULKAN_SDK: string;
		WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS: string;
		WEBVIEW2_BROWSER_EXECUTABLE_FOLDER: string;
		WEBVIEW2_PIPE_FOR_SCRIPT_DEBUGGER: string;
		WEBVIEW2_RELEASE_CHANNEL_PREFERENCE: string;
		WEBVIEW2_USER_DATA_FOLDER: string;
		WINDIR: string;
		WSLENV: string;
		WXWIN: string;
		ZES_ENABLE_SYSMAN: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
