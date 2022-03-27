         
<script setup lang="ts">
import { ref } from "vue";
import { handleInputChange } from "./../utils";

defineProps<{
  label: string;
  name?: string;
  rows?: number;
  modelValue: string;
  readonly?: boolean;
}>();
</script>

<template>
  <div>
    <label for="comment" class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <div class="mt-1">
      <textarea
        :rows="rows"
        :name="name"
        :id="name"
        :placeholder="name"
        :value="modelValue"
        :readonly="readonly || false"
        @input="$emit('update:modelValue', handleInputChange($event))"
        class="
          shadow-sm
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          sm:text-sm
          border-gray-300
          rounded-md
        "
      />
    </div>
  </div>
</template>         