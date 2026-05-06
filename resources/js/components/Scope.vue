<script setup>
import { reactive, watchEffect } from 'vue';

const props = defineProps({
  data: { type: Object, default: () => ({}) },
  init: { type: Function, default: null },
  effect: { type: Function, default: null },
});

const data = reactive({ ...props.data });

if (props.init) {
  props.init(data);
}

if (props.effect) {
  watchEffect(() => props.effect(data));
}
</script>

<template>
  <slot :data="data" v-bind="data" />
</template>
