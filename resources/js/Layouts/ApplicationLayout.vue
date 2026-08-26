<script setup>
import Toaster from '@js/Components/Toaster.vue';
import { useFlashToasts } from '@js/Composables/useFlash';

useFlashToasts();
</script>

<template>
    <slot />
    <Toaster />
</template>
