<script setup lang="ts">
import { ClipboardIcon } from "@heroicons/vue/solid";

const props = defineProps<{
  label: string;
  value: string;
}>();


async function copy(){
  navigator.clipboard.writeText(props.value).then(()=>{console.info('successfully copy to clipboard')}).catch(()=>{console.error('could not copy to clipboard')})
}

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
        :value="value"
        readonly="true"
        class="
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          pr-10
          sm:text-sm
          border-gray-300
          bg-slate-200
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
        "
      >
        <ClipboardIcon class="h-5 w-5 text-gray-400" aria-hidden="true" onclick="copy()"/>
      </div>
    </div>
  </div>
</template>

