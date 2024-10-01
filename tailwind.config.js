/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.vue', './src/**/*.ts'],
    theme: {
        extend: {
            width: {
                screen: ['100vw', '100dvw'],
            },
            height: {
                screen: ['100vh', '100dvh'],
            },
        },
    },
}
