import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: undefined,
    }),
    paths: {
      base: process.env.NODE_ENV === "production" ? "/ireland-ft84ln" : "",
    },
    prerender: {
      entries: ["/"],
      handleMissingId: "ignore",
    },
  },
};

export default config;
