// tailwind.config.js
module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/utils/**/*.{js,ts}',
        './public/**/*.html'
    ],
    theme: {
        extend: {
            colors: {
                foreground: 'var(--foreground)',
                background: 'var(--background)',
            },
        },
    },
    plugins: [],
}