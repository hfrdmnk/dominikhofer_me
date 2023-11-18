/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			center: true,
			padding: '5vw'
		},
		extend: {
			colors: {
				brand: {
					50: '#fafee8',
					100: '#f3fec3',
					200: '#efff89',
					300: '#eafe46',
					400: '#ecfb13',
					500: '#e5eb07',
					600: '#cbbf03',
					700: '#a28b06',
					800: '#866d0d',
					900: '#715812',
					950: '#423006'
				}
			},
			fontFamily: {
				sans: ['Switzer Variable', ...defaultTheme.fontFamily.sans],
				serif: ['Sentient Variable', ...defaultTheme.fontFamily.serif]
			}
		}
	},
	plugins: []
};
