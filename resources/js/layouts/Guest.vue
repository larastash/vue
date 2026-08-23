<script setup>
import Toaster from '@/Components/Toaster.vue';
import { useFlashToasts } from '@/Composables/useFlash';

useFlashToasts();
</script>

<template>
    <slot />
    <Toaster />
</template>
