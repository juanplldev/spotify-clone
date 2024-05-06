/** @type {import("tailwindcss").Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				"primary": "#FFF",
				"secondary": "#B3B3B3",
				"tertiary": "#FFFFFFB3",
				"green_1": "#1ED760",
				"green_2": "#1DB954",
			},
		},
	},
	plugins: [],
}