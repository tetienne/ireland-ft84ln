
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>
		};
		Pathname(): "/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/data.json" | "/img/03b9b18fb9.webp" | "/img/10db5424f4.webp" | "/img/193ceee8fd.webp" | "/img/33f7eda447.webp" | "/img/3ea7462e25.webp" | "/img/45bbcfb588.webp" | "/img/47c55c39e7.webp" | "/img/51978d8c29.webp" | "/img/5f1d902a76.webp" | "/img/6f82821671.webp" | "/img/802e462117.webp" | "/img/86152267a5.webp" | "/img/9882d9c27f.webp" | "/img/c051e26ccc.webp" | "/img/c130cb18d6.webp" | "/img/c2686f7f1e.webp" | "/img/c2f4fb368b.webp" | "/img/da04077369.webp" | "/img/e6b41e4858.webp" | "/img/e7e576eed6.webp" | "/img/e92d85d7d4.webp" | "/img/f6096bdf27.webp" | "/kml/j1.kml" | "/kml/j2.kml" | "/kml/j3.kml" | "/kml/j4.kml" | "/kml/j5.kml" | "/kml/j6.kml" | "/kml/j7.kml" | "/kml/j8.kml" | "/manifest.json" | string & {};
	}
}