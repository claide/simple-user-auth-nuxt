<template>
  <div>
    <Verification v-if="isAuthenticated && !loggedInUser.verified" />
    <v-row v-else justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          <h1>Login successful!</h1>
          <p>Welcome to the club {{ loggedInUser.email }}!</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Verification from "@/components/Verification";
import { mapGetters } from "vuex";

export default {
  middleware: "auth",
  components: { Verification },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
};
</script>
