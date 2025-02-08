export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["app.css","base.css","main.css"]),
	mimeTypes: {".css":"text/css"},
	_: {
		client: {start:"_app/immutable/entry/start.B-6iLgVP.js",app:"_app/immutable/entry/app.qoLDqVUa.js",imports:["_app/immutable/entry/start.B-6iLgVP.js","_app/immutable/chunks/CcvgdUSE.js","_app/immutable/chunks/Bo0lOMDE.js","_app/immutable/chunks/B1dp9kIC.js","_app/immutable/chunks/CgmrDAx4.js","_app/immutable/entry/app.qoLDqVUa.js","_app/immutable/chunks/Bo0lOMDE.js","_app/immutable/chunks/Cmbyf9Qi.js","_app/immutable/chunks/CpkR0JiJ.js","_app/immutable/chunks/CfXxC5un.js","_app/immutable/chunks/CBE6O7iT.js","_app/immutable/chunks/B1dp9kIC.js","_app/immutable/chunks/CgmrDAx4.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/database",
				pattern: /^\/database\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/wails-tests",
				pattern: /^\/wails-tests\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
