<script setup lang="ts">
import { useUser } from '@/composables/useUser';

const { isAuthenticated } = useUser()
</script>

<template>
    <template v-if="isAuthenticated">
        <slot v-bind="useUser()" />
    </template>
</template>
