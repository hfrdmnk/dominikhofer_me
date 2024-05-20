/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultTheme.fontFamily.sans],
			serif: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
			mono: ['"Space Grotesk"', ...defaultTheme.fontFamily.mono],
		},
		extend: {
			colors: {
				brand: {
					50: '#fdffe4',
					100: '#f8ffc4',
					200: '#f0ff90',
					300: '#e0ff50',
					400: '#c9ff00',
					500: '#afe600',
					600: '#88b800',
					700: '#668b00',
					800: '#516d07',
					900: '#455c0b',
					950: '#233400',
				},
			},
		},
	},
	plugins: [],
};
