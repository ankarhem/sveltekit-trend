const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: 'Source Sans Pro, sans-serif'
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000',
			white: '#fff',
			// theme colors
			primary: 'hsl(var(--primary) / <alpha-value>)',
			secondary: 'hsl(var(--secondary) / <alpha-value>)',
			accent: 'hsl(var(--accent) / <alpha-value>)',
			neutral: 'hsl(var(--neutral) / <alpha-value>)',
			info: 'hsl(var(--info) / <alpha-value>)',
			success: 'hsl(var(--success) / <alpha-value>)',
			warning: 'hsl(var(--warning) / <alpha-value>)',
			error: 'hsl(var(--error) / <alpha-value>)',
			'primary-focus': 'hsl(var(--primary-focus) / <alpha-value>)',
			'secondary-focus': 'hsl(var(--secondary-focus) / <alpha-value>)',
			'accent-focus': 'hsl(var(--accent-focus) / <alpha-value>)',
			'neutral-focus': 'hsl(var(--neutral-focus) / <alpha-value>)',
			'base-100': 'hsl(var(--base-100) / <alpha-value>)',
			'base-200': 'hsl(var(--base-200) / <alpha-value>)',
			'base-300': 'hsl(var(--base-300) / <alpha-value>)',
			'base-content': 'hsl(var(--base-content) / <alpha-value>)',
			'primary-content': 'hsl(var(--primary-content) / <alpha-value>)',
			'secondary-content': 'hsl(var(--secondary-content) / <alpha-value>)',
			'accent-content': 'hsl(var(--accent-content) / <alpha-value>)',
			'neutral-content': 'hsl(var(--neutral-content) / <alpha-value>)',
			'info-content': 'hsl(var(--info-content) / <alpha-value>)',
			'success-content': 'hsl(var(--success-content) / <alpha-value>)',
			'warning-content': 'hsl(var(--warning-content) / <alpha-value>)',
			'error-content': 'hsl(var(--error-content) / <alpha-value>)'
		},
		extend: {}
	},
	plugins: []
};
