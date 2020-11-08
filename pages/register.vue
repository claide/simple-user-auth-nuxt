<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" lg="6" class="d-none d-md-flex">
        <v-img :src="require('~/assets/img/river.png')"></v-img>
      </v-col>
      <v-col cols="12" lg="6">
        <RegistrationForm />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RegistrationForm from "@/components/RegistrationForm";

export default {
  layout: "auth",
  middleware: "guest",
  components: { RegistrationForm },
};
</script>
