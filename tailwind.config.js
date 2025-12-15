/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                keto: {
                    primary: '#10B981',
                    secondary: '#059669',
                    accent: '#34D399',
                    dark: '#064E3B',
                    light: '#D1FAE5',
                    bacon: '#B45309',
                    avocado: '#84CC16',
                    butter: '#FCD34D',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
