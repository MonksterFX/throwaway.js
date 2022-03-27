<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Switch,
  SwitchDescription,
  SwitchGroup,
  SwitchLabel,
} from "@headlessui/vue";

const props = defineProps<{ initState: boolean }>();
const emit = defineEmits<{ (e: "toggle", state: boolean): void }>();

const enabled = ref(props.initState || false);

watch(enabled, (newState) => {
  emit("toggle", newState);
});
</script>

<template>
  <SwitchGroup as="div" class="flex items-center justify-between">
    <span class="flex-grow flex flex-col">
      <SwitchLabel as="span" class="text-sm font-medium text-gray-900" passive
        >Use Your Own Password</SwitchLabel
      >
      <SwitchDescription as="span" class="text-sm text-gray-500"
        >You have to seperatly store it!</SwitchDescription
      >
    </span>
    <Switch
      v-model="enabled"
      :class="[
        enabled ? 'bg-indigo-600' : 'bg-gray-200',
        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
        ]"
      />
    </Switch>
  </SwitchGroup>
</template>

