<script setup>
import { useUser } from '@js/Composables/useUser';

const user = useUser();
</script>

<template>
    <template v-if="user.isGuest">
        <slot v-bind="user" />
    </template>
</template>
