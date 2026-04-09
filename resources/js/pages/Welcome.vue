<script setup lang="ts">
import Guest from '@/components/Auth/Guest.vue';
import Scope from '@/components/Scope.vue';
import { useTheme } from '@/composables/useTheme';
import Application from '@/layouts/Application.vue';
import { Head } from '@inertiajs/vue3';
import { ExternalLinkIcon, MoonIcon, SunIcon, SunMoonIcon } from '@lucide/vue';

defineProps({
    quote: String,
    author: String,
});

const { currentTheme, toggleTheme } = useTheme();
</script>

<template>
    <Head title="Welcome" />

    <Application>
        <div class="absolute top-4 left-4 flex items-center gap-4">
            <Scope :data="{ count: 10, double: 0 }"
                :init="(data: any) => (data.double = data.count * 2)"
                :effect="(data: any) => (data.double = data.count * 2)"
                v-slot="{ data }"
            >
                <div class="flex items-center gap-2">
                    <button @click="data.count--" class="px-2.5 py-0.5 rounded-brand border bg-white dark:bg-gray-800">-</button>
                    <button @click="data.count++" class="px-2.5 py-0.5 rounded-brand border bg-white dark:bg-gray-800">+</button>
                    <button @click="data.count *= 2" class="px-2.5 py-0.5 rounded-brand border bg-white dark:bg-gray-800">*</button>
                    <code>{{ data }}</code>
                </div>
            </Scope>
        </div>

        <div class="absolute top-4 right-4 flex items-center gap-4">
            <button @click="toggleTheme" class="block text-black dark:text-white">
                <SunIcon v-if="currentTheme === 'light'" class="shrink-0 size-5" />
                <MoonIcon v-if="currentTheme === 'dark'" class="shrink-0 size-5" />
                <SunMoonIcon v-if="currentTheme === 'system'" class="shrink-0 size-5" />
            </button>
        </div>

        <div class="min-h-dvh flex flex-col items-center justify-center bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-size-[20px_20px]">
            <figure class="text-center">
                <blockquote>
                    <p class="text-lg max-w-lg text-pretty w-full leading-relaxed hyphens-auto">
                        {{ quote }}
                    </p>
                </blockquote>
                <figcaption class="mt-4 text-gray-500 dark:text-gray-500">
                    — {{ author }}
                </figcaption>
            </figure>

            <div class="absolute bottom-4 inset-x-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <figure class="shrink-0 size-1.5 rounded-full bg-green-500 dark:bg-green-600 ring-2 ring-green-300 dark:ring-green-500 animate-pulse" />
                        <p class="text-gray-500 dark:text-gray-500">ready for something awesome</p>
                    </div>
                    <a
                        href="https://github.com/larastash/vue-kit"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-2"
                    >
                        <ExternalLinkIcon class="shrink-0 size-4" />
                        <span>larastash/vue-kit</span>
                    </a>
                </div>
            </div>
        </div>
    </Application>
</template>
