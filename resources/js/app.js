import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';

createInertiaApp({
    title: (title) => (title ? `${title} - ${import.meta.env.VITE_APP_NAME}` : import.meta.env.VITE_APP_NAME),
    withApp(app) {
        // app.use();
    },
    progress: {
        delay: 300,
        color: 'var(--progress-color)',
        includeCSS: true,
        showSpinner: false,
    },
    defaults: {
        //
    },
});
