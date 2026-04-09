import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

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
                sans: ['"Google Sans"', ...defaultTheme.fontFamily.sans],
                serif: [...defaultTheme.fontFamily.serif],
                mono: [...defaultTheme.fontFamily.mono],
            },
            colors: {
                primary: colors.yellow,
                info: colors.blue,
                success: colors.green,
                danger: colors.red,
                black: '#111111',
                gray: colors.zinc,
            },
            borderRadius: {
                brand: defaultTheme.borderRadius['xl'],
            },
        },
    },
    plugins: [
        //
    ],
}
