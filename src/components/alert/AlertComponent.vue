<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  color: string;
  message: string;
  icon: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", onAlert: boolean): void;
}>();
</script>

<template>
  <v-snackbar
    :modelValue="props.modelValue"
    @update="emit"
    :timeout="2000"
    transition="slide-y-reverse-transition"
    :color="props.color"
    multi-line
  >
    <v-icon :icon="props.icon"></v-icon>
    {{ props.message }}
    <template v-slot:actions>
      <v-btn icon="mdi-close" @click="emit('update:modelValue', false)" />
    </template>
  </v-snackbar>
</template>
