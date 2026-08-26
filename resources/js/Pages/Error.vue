<script setup>
import ApplicationLayout from '@js/Layouts/ApplicationLayout.vue';

defineProps({
    status: Number,
});

const messages = {
    404: 'Page not found',
    403: 'Forbidden',
    500: 'Something went wrong',
    503: 'Service Unavailable',
};

const message = (status) => messages[status] ?? 'Что-то пошло не так';
</script>

<template>
    <ApplicationLayout>
        <div class="min-h-dvh flex items-center justify-center">
            <div class="text-center">
                <h1 class="text-6xl font-bold font-serif">{{ status }}</h1>
                <p class="mt-4 text-base text-gray-500">{{ message(status) }}</p>
                <a href="/" class="mt-6 inline-block text-brand-500 text-primary-500">Go home</a>
            </div>
        </div>
    </ApplicationLayout>
</template>
