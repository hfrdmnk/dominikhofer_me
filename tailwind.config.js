/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Switzer Variable', ...defaultTheme.fontFamily.sans],
				serif: ['Sentient Variable', ...defaultTheme.fontFamily.serif]
			}
		}
	},
	plugins: []
};
