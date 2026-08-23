<script setup>
import { useUser } from '@/Composables/useUser';

const user = useUser();
</script>

<template>
    <template v-if="user.isAuthenticated">
        <slot v-bind="user" />
    </template>
</template>
