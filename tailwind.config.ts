import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./resources/views/**/*.blade.php', './resources/js/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
        },
        extend: {
            colors: {
                primary: {
                    50: '#e6f0f7',
                    100: '#cce1ef',
                    200: '#99c3df',
                    300: '#66a5cf',
                    400: '#3387bf',
                    500: '#115e9b',
                    600: '#0e4b7c',
                    700: '#0a385d',
                    800: '#07253e',
                    900: '#03121f',
                },
                secondary: {
                    50: '#eef5f0',
                    100: '#ddebe1',
                    200: '#bbd7c3',
                    300: '#99c3a5',
                    400: '#77af87',
                    500: '#559b69',
                    600: '#3a7e4f',
                    700: '#2c5e3b',
                    800: '#1d3f28',
                    900: '#0f1f14',
                },
                accent: {
                    50: '#fdf8e9',
                    100: '#fbf1d3',
                    200: '#f7e3a7',
                    300: '#f3d57b',
                    400: '#efc74f',
                    500: '#e6b31e',
                    600: '#b88f18',
                    700: '#8a6b12',
                    800: '#5c480c',
                    900: '#2e2406',
                },
                success: {
                    500: '#10b981',
                    600: '#059669',
                },
                warning: {
                    500: '#f59e0b',
                    600: '#d97706',
                },
                error: {
                    500: '#ef4444',
                    600: '#dc2626',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
            },
            boxShadow: {
                soft: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                medium: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-in-right': 'slideInRight 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
            },
            maxWidth: {
                container: '1440px',
            },
        },
    },
    plugins: [],
};

export default config;
