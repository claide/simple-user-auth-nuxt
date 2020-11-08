<template>
  <v-app light>
    <v-app-bar flat app color="#ffffff">
      <v-toolbar-side-icon>
        <v-img
          :src="require('~/assets/img/logo-icon.svg')"
          height="30"
          width="30"
          class="mr-3"
        />
      </v-toolbar-side-icon>

      <v-toolbar-title>
        <span class="primary--text">{{ title }}</span></v-toolbar-title
      >
      <v-spacer />
      <v-btn
        v-if="isAuthenticated && loggedInUser.verified"
        @click="logout"
        class="mr-3"
        large
        text
        >Logout
        <v-icon icon right light>mdi-power-standby</v-icon>
      </v-btn>
      <v-btn v-if="!isAuthenticated" to="/login" class="mr-3" text>Login</v-btn>
      <v-btn v-if="!isAuthenticated" to="/register" depressed color="primary"
        >Register</v-btn
      >
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      title: "ProjectName",
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
      this.$toast.info("Logout successful");
    },
  },
};
</script>
