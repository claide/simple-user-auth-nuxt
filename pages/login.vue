<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" lg="6" class="d-none d-md-flex">
        <v-img :src="require('~/assets/img/river.png')"></v-img>
      </v-col>
      <v-col cols="12" lg="6">
        <LoginForm />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";

export default {
  transition: "fade",
  layout: "auth",
  middleware: "guest",
  components: { LoginForm },
};
</script>
