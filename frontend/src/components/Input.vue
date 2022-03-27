<script setup lang="ts">
import { QuestionMarkCircleIcon } from "@heroicons/vue/solid";
import { handleInputChange } from "./../utils";

defineProps<{
  label: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  modelValue: string;
}>();
</script>

<template>
  <div>
    <label
      for="account-number"
      class="block text-sm font-medium text-gray-700"
      >{{ label }}</label
    >
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        type="text"
        :name="name"
        :id="name"
        :placeholder="name"
        :value="modelValue"
        @input="$emit('update:modelValue', handleInputChange($event))"
        class="
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          pr-10
          sm:text-sm
          border-gray-300
          rounded-md
        "
      />
      <div
        class="
          absolute
          inset-y-0
          right-0
          pr-3
          flex
          items-center
          pointer-events-none
        "
      >
        <QuestionMarkCircleIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
    </div>
    <p class="mt-2 text-sm text-red-600" id="email-error" v-if="error">
      {{ errorText || "an error occured" }}
    </p>
  </div>
</template>

