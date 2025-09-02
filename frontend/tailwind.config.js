/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: ["class"],
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
   	extend: {
   		colors: {
   			background: 'hsl(var(--background))',
   			foreground: 'hsl(var(--foreground))',
   			border: 'hsl(var(--border))',
   			input: 'hsl(var(--input))',
   			ring: 'hsl(var(--ring))',
   			primary: {
   				'50': '#F9E7F1',
   				'100': '#F2CFE1',
   				'200': '#E6A6C9',
   				'300': '#DA7DB0',
   				'400': '#CE5398',
   				'500': '#C42A81',
   				'600': '#A7256B',
   				'700': '#861F55',
   				'800': '#661746',
   				'900': '#4D1030',
   				DEFAULT: 'hsl(var(--primary))',
   				foreground: 'hsl(var(--primary-foreground))'
   			},
   			secondary: {
   				'50': '#FFF0F7',
   				'100': '#FFE0F0',
   				'200': '#FFCCE6',
   				'300': '#FFB3D9',
   				'400': '#FF99CC',
   				'500': '#FF80BF',
   				'600': '#E66AB3',
   				'700': '#CC5599',
   				'800': '#B24080',
   				'900': '#993366',
   				DEFAULT: 'hsl(var(--secondary))',
   				foreground: 'hsl(var(--secondary-foreground))'
   			},
   			success: {
   				'50': '#ECFDF5',
   				'100': '#D1FAE5',
   				'200': '#A7F3D0',
   				'300': '#6EE7B7',
   				'400': '#34D399',
   				'500': '#10B981',
   				'600': '#059669',
   				'700': '#047857',
   				'800': '#065F46',
   				'900': '#064E3B',
   				DEFAULT: 'hsl(var(--success))',
   				foreground: 'hsl(var(--success-foreground))'
   			},
   			warning: {
   				'50': '#FFFBEB',
   				'100': '#FEF3C7',
   				'200': '#FDE68A',
   				'300': '#FCD34D',
   				'400': '#FBBF24',
   				'500': '#F59E0B',
   				'600': '#D97706',
   				'700': '#B45309',
   				'800': '#92400E',
   				'900': '#78350F',
   				DEFAULT: 'hsl(var(--warning))',
   				foreground: 'hsl(var(--warning-foreground))'
   			},
   			error: {
   				'50': '#FEF2F2',
   				'100': '#FEE2E2',
   				'200': '#FECACA',
   				'300': '#FCA5A5',
   				'400': '#F87171',
   				'500': '#EF4444',
   				'600': '#DC2626',
   				'700': '#B91C1C',
   				'800': '#991B1B',
   				'900': '#7F1D1D',
   				DEFAULT: 'hsl(var(--error))',
   				foreground: 'hsl(var(--error-foreground))'
   			},
   			white: '#ffffff',
   			sidebar: {
   				DEFAULT: 'hsl(var(--sidebar-background))',
   				foreground: 'hsl(var(--sidebar-foreground))',
   				primary: 'hsl(var(--sidebar-primary))',
   				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
   				accent: 'hsl(var(--sidebar-accent))',
   				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
   				border: 'hsl(var(--sidebar-border))',
   				ring: 'hsl(var(--sidebar-ring))'
   			}
   		},
   		fontFamily: {
   			sans: [
   				'Inter',
   				'sans-serif'
   			],
   			display: [
   				'Poppins',
   				'sans-serif'
   			]
   		},
   		spacing: {
   			'18': '4.5rem',
   			'88': '22rem',
   			'128': '32rem'
   		},
   		borderRadius: {
   			'4xl': '2rem'
   		},
   		boxShadow: {
   			soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
   			medium: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
   			large: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)'
   		},
   		animation: {
   			'fade-in': 'fadeIn 0.5s ease-in-out',
   			'slide-up': 'slideUp 0.3s ease-out',
   			'slide-down': 'slideDown 0.3s ease-out',
   			'scale-in': 'scaleIn 0.2s ease-out',
   			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
   		},
   		keyframes: {
   			fadeIn: {
   				'0%': {
   					opacity: '0'
   				},
   				'100%': {
   					opacity: '1'
   				}
   			},
   			slideUp: {
   				'0%': {
   					transform: 'translateY(10px)',
   					opacity: '0'
   				},
   				'100%': {
   					transform: 'translateY(0)',
   					opacity: '1'
   				}
   			},
   			slideDown: {
   				'0%': {
   					transform: 'translateY(-10px)',
   					opacity: '0'
   				},
   				'100%': {
   					transform: 'translateY(0)',
   					opacity: '1'
   				}
   			},
   			scaleIn: {
   				'0%': {
   					transform: 'scale(0.95)',
   					opacity: '0'
   				},
   				'100%': {
   					transform: 'scale(1)',
   					opacity: '1'
   				}
   			}
   		}
   	}
   },
   plugins: [require("tailwindcss-animate")],
};
