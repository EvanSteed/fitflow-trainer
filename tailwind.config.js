/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				spectrashell: ['Spectrashell', 'sans-serif'],
				anton: ['Anton', 'sans-serif'],
				bebas: ['Bebas Neue', 'sans-serif'],
				cinzel: ['Cinzel', 'serif'],
				rajdhani: ['Rajdhani', 'sans-serif'],
			},
			colors: {
				// HUD Theme Colors
				hud: {
					bg: '#0a0a12',
					panel: '#1a1a2e',
					'dark': '#0d0d1a',
					'card': '#141428',
					'border': '#2a2a4e',
					'border-light': '#333366',
				},
				gold: {
					DEFAULT: '#ffd700',
					'50': '#fffde6',
					'100': '#fffacc',
					'200': '#fff599',
					'300': '#ffee66',
					'400': '#ffe833',
					'500': '#ffd700',
					'600': '#ccac00',
					'700': '#998100',
					'800': '#665600',
					'900': '#332b00',
				},
				teal: {
					DEFAULT: '#00ffcc',
					'50': '#e6fff8',
					'100': '#ccfff2',
					'200': '#99ffe5',
					'300': '#66ffd8',
					'400': '#33ffcb',
					'500': '#00ffcc',
					'600': '#00cca3',
					'700': '#00997a',
					'800': '#006652',
					'900': '#003329',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#202020',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: '#2533d5',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				accent: {
					DEFAULT: '#faf5f1',
					foreground: 'hsl(var(--accent-foreground))',
				},
				green: {
					DEFAULT: '#2B5D3A',
					foreground: 'hsl(var(--green-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'xp-glow': {
					'0%, 100%': { boxShadow: '0 0 10px #00ffcc88' },
					'50%': { boxShadow: '0 0 20px #00ffccaa' },
				},
				'xp-pulse': {
					'0%, 100%': { opacity: 1 },
					'50%': { opacity: 0.5 },
				},
				'float-particle': {
					'0%, 100%': { transform: 'translateY(0) scale(1)', opacity: 0.6 },
					'50%': { transform: 'translateY(-10px) scale(1.5)', opacity: 1 },
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' },
				},
				'gold-pulse': {
					'0%, 100%': { boxShadow: '0 0 15px #ffd70044' },
					'50%': { boxShadow: '0 0 30px #ffd70088' },
				},
				'xp-fill': {
					'0%': { width: '0%' },
					'80%': { width: '100%' },
					'100%': { width: '0%' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'xp-glow': 'xp-glow 2s ease-in-out infinite',
				'xp-pulse': 'xp-pulse 1s ease-in-out infinite',
				'float-particle': 'float-particle 4s ease-in-out infinite',
				'shimmer': 'shimmer 2s ease-in-out infinite',
				'gold-pulse': 'gold-pulse 2s ease-in-out infinite',
				'xp-fill': 'xp-fill 6s linear infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
