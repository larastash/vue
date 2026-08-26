<script setup>
import { reactive, watch } from 'vue';

// Renderless-компонент для локального реактивного состояния прямо в шаблоне,
// аналог x-data из Alpine.js.
//
// Способы задать поле в :data — выбирайте по назначению, не смешивайте:
// - дефолтное значение:            :data="{ count: 10 }"
// - вычисляемое поле для показа:   get double() { return this.count * 2 }
// - разовая сложная инициализация: :init="(state) => state.id = crypto.randomUUID()"
// - побочный эффект (НЕ для отображения): :effect="(state) => localStorage.setItem('c', state.count)"
//
// ОГРАНИЧЕНИЕ: `data` читается один раз при маунте. Если родитель позже передаст
// другой объект в :data — компонент это не подхватит. Это не двусторонний биндинг,
// а разовая инициализация состояния (как x-data), а не :model.
const props = defineProps({
  data: { type: Object, default: () => ({}) },
  init: { type: Function, default: null },
  effect: { type: Function, default: null },
});

// Клонируем через дескрипторы, а не spread:
// - spread вычислил бы геттеры сразу и превратил их в статичные значения;
// - клон нужен, чтобы не мутировать объект, переданный через проп,
//   если это чья-то переменная, а не литерал прямо в шаблоне.
const state = reactive(
  Object.create(Object.getPrototypeOf(props.data), Object.getOwnPropertyDescriptors(props.data))
);

if (props.init) {
  props.init(state);
}

if (props.effect) {
  // immediate: false — эффект реагирует только на последующие изменения,
  // никогда не бежит при маунте, поэтому не конфликтует с init.
  watch(state, () => props.effect(state), { immediate: false });
}
</script>

<template>
  <slot :data="state" v-bind="state" />
</template>
