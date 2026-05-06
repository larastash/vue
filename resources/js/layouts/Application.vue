<script setup>
import Toaster from '@/components/Toaster.vue';
import { useFlashToasts } from '@/composables/useFlash';

useFlashToasts();
</script>

<template>
    <slot />
    <Toaster />
</template>
