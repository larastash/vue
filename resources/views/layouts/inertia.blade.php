<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <script>
            (function () {
                try {
                    var raw = localStorage.getItem('theme');
                    var theme = 'system';

                    if (raw) {
                        var parsed = JSON.parse(raw);
                        theme = parsed.currentTheme ?? 'system';
                    }

                    var isDark = theme === 'dark' ||
                        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

                    document.documentElement.classList.toggle('dark', isDark);
                    document.documentElement.dataset.theme = theme;
                } catch (e) {
                    //
                }
            })();
        </script>

        <title>{{ config('app.name') }}</title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">

        @routes

        @vite(['resources/css/app.css', 'resources/js/app.js'])

        <x-inertia::head />
    </head>
    <body>
        <x-inertia::app />
    </body>
</html>
