<script setup lang="ts">
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import TextArea from "../components/TextArea.vue";
import { useRoute } from "vue-router";
import { redeemNote } from "../adapter";
import { onMounted, ref } from "vue";

type State = "unkown" | "decrypted" | "encrypted";

const route = useRoute();

let state = ref<State>("unkown");
let password = ref("");
let token = ref("");

const form = ref({ note: "", payload: "" });

async function redeem(passphrase: string, token: string) {
  const payload = await redeemNote(passphrase, token);
  form.value.note = payload.msg;
  form.value.payload = payload.payload;

  state.value = "decrypted";

  // reset token and password, no longer needed
  password.value = "";
  token = "";
}

function onSubmit() {
  redeem(password.value, token.value);
}

onMounted(() => {
  token.value = route.query.token as string;

  // if passphrase is in url redeem instantly, else show password dialog
  if (route.query.p) {
    redeem(route.query.p as string, token.value);
  } else {
    state.value = "encrypted";
  }
});
</script>

<template>
  <form
    class="space-y-6"
    v-on:submit.prevent="onSubmit"
    v-if="state === 'encrypted'"
  >
    <div>
      <Input label="Password" name="password" v-model="password" />
    </div>
    <div>
      <Button label="Decrypt Message" />
    </div>
  </form>
  <div class="space-y-6 py-6" v-if="state === 'decrypted'">
    <h1 class="text-center text-xl">Decrypted Message</h1>
    <div>
      <TextArea :readonly="true" label="Note" :rows="2" v-model="form.note" />
    </div>
    <!-- <div>
      <TextArea
        label="Payload"
        v-model="form.payload"
        :readonly="true"
        :rows="10"
      />
    </div> -->
  </div>
</template>
<style>
</style>