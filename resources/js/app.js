import { createInertiaApp } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/dist/tippy.css';
import 'vue-sonner/style.css'; // https://vue-sonner.vercel.app/
import { plugin as VueTippy } from 'vue-tippy';
import { ZiggyVue } from 'ziggy-js';

dayjs.locale('ru'); // https://day.js.org/
dayjs.extend(relativeTime);

const pinia = createPinia(); // https://pinia.vuejs.org/
pinia.use(piniaPluginPersistedstate); // https://codeberg.org/praz/pinia-plugin-persistedstate/

createInertiaApp({
    title: (title) => title ? `${title} - ${import.meta.env.VITE_APP_NAME}` : import.meta.env.VITE_APP_NAME,
    withApp(app) {
        app
            .use(pinia)
            .use(ZiggyVue) // https://github.com/tighten/ziggy
            .use(VueTippy, { // https://vue-tippy.netlify.app/
                directive: 'tooltip',
                component: 'tippy',
                componentSingleton: 'tippy-singleton',
                defaultProps: {
                    theme: 'custom',
                    animation: 'scale-subtle',
                    inertia: true,
                    arrow: true,
                    allowHTML: false,
                    delay: [150, 100],
                    duration: [150, 150],
                    touch: false,
                },
            });
    },
    progress: {
        delay: 500,
        color: "var(--progress-color)",
        includeCSS: true,
        showSpinner: false,
    },
    defaults: {
        //
    },
});
