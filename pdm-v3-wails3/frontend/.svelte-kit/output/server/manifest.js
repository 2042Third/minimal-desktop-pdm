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
		client: {start:"_app/immutable/entry/start.DqRQyfMr.js",app:"_app/immutable/entry/app.BJsNDSdk.js",imports:["_app/immutable/entry/start.DqRQyfMr.js","_app/immutable/chunks/BgykqzTN.js","_app/immutable/chunks/TdN3I5eQ.js","_app/immutable/chunks/En2E40Cu.js","_app/immutable/chunks/DOG_QbrM.js","_app/immutable/entry/app.BJsNDSdk.js","_app/immutable/chunks/TdN3I5eQ.js","_app/immutable/chunks/Cv_58GG0.js","_app/immutable/chunks/BGQeMav5.js","_app/immutable/chunks/CB4pBYuS.js","_app/immutable/chunks/BFcj0Dfg.js","_app/immutable/chunks/En2E40Cu.js","_app/immutable/chunks/DOG_QbrM.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/","/database","/wails-tests"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
