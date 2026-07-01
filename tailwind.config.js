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
                sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
                serif: ['"Lora"', ...defaultTheme.fontFamily.serif],
                mono: ['"Source Code Pro"', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                primary: colors.orange,
                info: colors.blue,
                success: colors.green,
                danger: colors.red,
                black: '#1c1c1c',
                gray: colors.neutral,
            },
            borderRadius: {
                brand: defaultTheme.borderRadius['xl'],
            },
        },
    },
}
