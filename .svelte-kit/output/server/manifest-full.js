export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["data.json","img/03b9b18fb9.webp","img/10db5424f4.webp","img/193ceee8fd.webp","img/33f7eda447.webp","img/3ea7462e25.webp","img/45bbcfb588.webp","img/47c55c39e7.webp","img/51978d8c29.webp","img/5f1d902a76.webp","img/6f82821671.webp","img/802e462117.webp","img/86152267a5.webp","img/9882d9c27f.webp","img/c051e26ccc.webp","img/c130cb18d6.webp","img/c2686f7f1e.webp","img/c2f4fb368b.webp","img/da04077369.webp","img/e6b41e4858.webp","img/e7e576eed6.webp","img/e92d85d7d4.webp","img/f6096bdf27.webp","kml/j1.kml","kml/j2.kml","kml/j3.kml","kml/j4.kml","kml/j5.kml","kml/j6.kml","kml/j7.kml","kml/j8.kml","manifest.json"]),
	mimeTypes: {".json":"application/json",".webp":"image/webp"},
	_: {
		client: {start:"_app/immutable/entry/start.K-13oRHs.js",app:"_app/immutable/entry/app.DE9jLkWl.js",imports:["_app/immutable/entry/start.K-13oRHs.js","_app/immutable/chunks/BhuPUYtA.js","_app/immutable/chunks/CIw2SDev.js","_app/immutable/chunks/s7fLFvbM.js","_app/immutable/entry/app.DE9jLkWl.js","_app/immutable/chunks/DWuVTDaa.js","_app/immutable/chunks/CIw2SDev.js","_app/immutable/chunks/CFvMyRA2.js","_app/immutable/chunks/DEDh6TSu.js","_app/immutable/chunks/DW3n6JEE.js","_app/immutable/chunks/s7fLFvbM.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
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
