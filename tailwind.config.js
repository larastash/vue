import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './**/*.blade.php',
        './**/*.js',
        './**/*.vue',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Noto Sans"', ...defaultTheme.fontFamily.sans],
                serif: [...defaultTheme.fontFamily.serif],
                mono: [...defaultTheme.fontFamily.mono],
            },
            colors: {
                primary: colors.orange,
                info: colors.blue,
                success: colors.green,
                danger: colors.red,
                black: '#1c1c1c',
                gray: colors.zinc,
            },
            borderRadius: {
                brand: defaultTheme.borderRadius['xl'],
            },
        },
    },
}
