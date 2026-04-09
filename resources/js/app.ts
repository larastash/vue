import 'vue-sonner/style.css';

import { createInertiaApp } from "@inertiajs/vue3";
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createInertiaApp({
    title: (title) => title ? `${title} - ${import.meta.env.VITE_APP_NAME}` : import.meta.env.VITE_APP_NAME,
    withApp(app) {
        app.use(pinia);
    },
    progress: {
        delay: 300,
        color: "var(--progress-color)",
        includeCSS: true,
        showSpinner: false,
    },
    defaults: {
        //
    },
});

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('ru');
dayjs.extend(relativeTime);
