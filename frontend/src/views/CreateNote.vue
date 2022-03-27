<script setup lang="ts">
import { onMounted, ref } from "vue";
import Button from "../components/Button.vue";
import TextArea from "../components/TextArea.vue";
import Toggle from "../components/Toggle.vue";
import Input from "../components/Input.vue";
import CopyText from "../components/CopyText.vue";
import { createNote, redeemNote } from "../adapter";
import { useRoute } from "vue-router";

const ownPassword = ref(false);
const generatedLink = ref("");

function toggle(state: boolean) {
  ownPassword.value = state;
}

// How To Bind V-MODEL
// https://learnvue.co/2021/01/everything-you-need-to-know-about-vue-v-model/#tips-for-using-v-model

const form = ref({
  note: "",
  payload: "",
  passphrase: "",
  url: "",
});

async function onSubmit() {
  const url = await createNote({
    passphrase: form.value.passphrase,
    payload: form.value.payload,
    note: form.value.note,
    notification: "",
  });

  generatedLink.value = url;
}
</script>

<template>
  <form class="space-y-6" v-on:submit.prevent="onSubmit">
    <div>
      <TextArea label="Note" name="note" :rows="10" v-model="form.note" />
    </div>
    <div v-if="false">
      <TextArea
        label="Payload"
        name="payload"
        :rows="6"
        v-model="form.payload"
      />
    </div>
    <div>
      <Toggle @toggle="toggle" :initState="false" />
    </div>
    <div v-if="ownPassword">
      <Input
        label="Password"
        name="password"
        :error="false"
        v-model="form.passphrase"
        errorText="Your password must be at least 8 characters long and contain lowercase,
      uppercase and one of !@#$%^&*"
      />
    </div>
    <div>
      <Button label="Generate" />
    </div>
    <div v-if="generatedLink">
      <CopyText :value="generatedLink" label="This Link is valid 24h" />
    </div>
  </form>
</template>

<style scoped>
</style>
