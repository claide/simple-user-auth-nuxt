<template>
  <v-row align="center" justify="center">
    <v-col md="3">
      <div class="verification">
        <div>
          <h2>Verify your email</h2>
          <p class="mb-5">
            Please enter the code sent to {{ loggedInUser.email }}
          </p>
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <div class="field">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="verification code"
                  rules="required"
                >
                  <div class="control">
                    <input
                      class="input"
                      :class="{ 'is-danger': errors[0] || error }"
                      v-model="code"
                      type="text"
                      placeholder="Type in Verification code"
                      required
                    />
                  </div>
                  <p class="red--text">{{ error }}</p>
                </ValidationProvider>
              </div>
              <v-btn
                type="submit"
                @click="verify"
                x-large
                depressed
                color="primary"
                >Verify</v-btn
              >
            </form>
          </ValidationObserver>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

import {
  ValidationObserver,
  ValidationProvider,
} from "vee-validate/dist/vee-validate.full";

export default {
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      code: null,
      error: "",
      isVerified: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  methods: {
    onSubmit() {
      console.log("verification");
    },
    async verify() {
      try {
        await this.$axios.post("auth/verification/verify", {
          token: this.code,
          via: "email",
        });
        location.reload();
        this.$toast.success("Email verified");
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
  },
};
</script>
