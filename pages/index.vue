<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center"></div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (!store.state.authenticated) {
      return redirect("/login");
    }
  },
};
</script>
