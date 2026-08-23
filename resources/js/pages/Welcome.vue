<script setup>
import Reactive from '@/Components/Reactive.vue';
import { useTheme } from '@/Composables/useTheme';
import Application from '@/Layouts/Application.vue';
import { Head } from '@inertiajs/vue3';
import { ExternalLinkIcon, MoonIcon, SmileIcon, SunIcon, SunMoonIcon } from '@lucide/vue';
import { toast } from 'vue-sonner';

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
            <Reactive
                :data="{
                    count: 10,
                    double: 0,
                    recalc() { this.double = this.count * 2 },
                }"
                :init="(data) => data.recalc()"
                :effect="(data) => data.recalc()"
                v-slot="{ data }"
            >
                <div class="flex items-center gap-2">
                    <button @click="data.count--" class="size-8 flex items-center justify-center rounded-brand border bg-white dark:bg-gray-800/50 active:translate-y-0.5">-</button>
                    <button @click="data.count++" class="size-8 flex items-center justify-center rounded-brand border bg-white dark:bg-gray-800/50 active:translate-y-0.5">+</button>
                    <button @click="data.count *= 2" class="size-8 flex items-center justify-center rounded-brand border bg-white dark:bg-gray-800/50 active:translate-y-0.5">*</button>
                    <code>{{ data }}</code>
                </div>
            </Reactive>
        </div>

        <div class="absolute top-4 right-4 flex items-center gap-4">
            <button @click="toast.success('Hello world!', { description: 'This is a toast message' })" v-tooltip="`Toast`" class="block text-black dark:text-white">
                <SmileIcon class="shrink-0 size-5" />
            </button>
            <button @click="toggleTheme" v-tooltip="`Theme`" class="block text-black dark:text-white">
                <SunIcon v-if="currentTheme === 'light'" class="shrink-0 size-5" />
                <MoonIcon v-if="currentTheme === 'dark'" class="shrink-0 size-5" />
                <SunMoonIcon v-if="currentTheme === 'system'" class="shrink-0 size-5" />
            </button>
        </div>

        <div class="min-h-dvh flex flex-col items-center justify-center bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-size-[20px_20px]">
            <figure class="text-center font-serif">
                <blockquote>
                    <p class="text-2xl font-medium text-primary-500 max-w-lg text-pretty w-full leading-relaxed hyphens-auto">
                        {{ quote }}
                    </p>
                </blockquote>
                <figcaption class="mt-4 text-base">
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
                        href="https://github.com/larastash/vue"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-2"
                    >
                        <ExternalLinkIcon class="shrink-0 size-4" />
                        <span>larastash/vue</span>
                    </a>
                </div>
            </div>
        </div>
    </Application>
</template>
