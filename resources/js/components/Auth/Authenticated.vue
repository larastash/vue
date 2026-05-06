<script setup>
import { useUser } from '@/composables/useUser';

const user = useUser();
</script>

<template>
    <template v-if="user.isAuthenticated">
        <slot v-bind="user" />
    </template>
</template>
