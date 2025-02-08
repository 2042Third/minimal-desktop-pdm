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
		client: {start:"_app/immutable/entry/start.DkgQ6TZc.js",app:"_app/immutable/entry/app.BTKYiBI-.js",imports:["_app/immutable/entry/start.DkgQ6TZc.js","_app/immutable/chunks/C-Bfzokj.js","_app/immutable/chunks/TdN3I5eQ.js","_app/immutable/chunks/En2E40Cu.js","_app/immutable/chunks/DOG_QbrM.js","_app/immutable/entry/app.BTKYiBI-.js","_app/immutable/chunks/TdN3I5eQ.js","_app/immutable/chunks/Cv_58GG0.js","_app/immutable/chunks/BGQeMav5.js","_app/immutable/chunks/CB4pBYuS.js","_app/immutable/chunks/BFcj0Dfg.js","_app/immutable/chunks/En2E40Cu.js","_app/immutable/chunks/DOG_QbrM.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
