<script setup>
import { useUser } from '@js/Composables/useUser';

const user = useUser();
</script>

<template>
    <template v-if="user.isAuthenticated">
        <slot v-bind="user" />
    </template>
</template>
