<template>
    <Toaster :visibleToasts="3" :closeButton="true" position="bottom-center" :duration="5000" offset="16px" :toastOptions="{
        unstyled: true,
        classes: {
            toast: 'bg-100 p-4 rounded-brand border flex items-center gap-4 md:min-w-96 shadow-xl shadow-gray-950/5 [&:has(.description)]:items-start font-sans [&:has(.description)_.icon-wrapper]:mt-0.5',
            content: 'flex-1',
            title: 'text-2 text-[13px] text-300 leading-5 hyphens-auto',
            description: 'description mt-0 text-600 text-xs leading-5 hyphens-auto',
            icon: 'icon-wrapper flex shrink-0',
            actionButton: 'border border-transparent px-4 py-1 rounded-brand font-medium text-xs bg-black dark:bg-white text-white dark:text-black',
            cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-xs',
            closeButton: 'order-2 text-700 hover:text-600 flex-shrink-0',
        }
    }">
        <template #loading-icon>
            <Loader2Icon class="shrink-0 size-4 text-gray-500 animate-loader" />
        </template>
        <template #success-icon>
            <CheckCheckIcon class="shrink-0 size-4 text-success-500" />
        </template>
        <template #error-icon>
            <BanIcon class="shrink-0 size-4 text-danger-400" />
        </template>
        <template #info-icon>
            <InfoIcon class="shrink-0 size-4 text-info-500" />
        </template>
        <template #warning-icon>
            <CircleAlertIcon class="shrink-0 size-4 text-yellow-500" />
        </template>
        <template #close-icon>
            <XIcon class="shrink-0 size-4 stroke-[2.5]" />
        </template>
    </Toaster>
</template>

<script setup>
import { BanIcon, CheckCheckIcon, CircleAlertIcon, InfoIcon, Loader2Icon, XIcon } from '@lucide/vue';
import { Toaster } from 'vue-sonner';
</script>
