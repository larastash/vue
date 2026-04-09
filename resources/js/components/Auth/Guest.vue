<script setup lang="ts">
import { useUser } from '@/composables/useUser';

const { isGuest } = useUser()
</script>

<template>
    <template v-if="isGuest">
        <slot v-bind="useUser()" />
    </template>
</template>
