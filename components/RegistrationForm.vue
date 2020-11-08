<template>
  <div class="onboarding-container">
    <div class="brand">
      <img src="~/assets/img/logo-icon.svg" alt="" />
      <div class="brand-name primary--text">Project Name</div>
    </div>
    <div class="intro">
      <h3>New Account</h3>
      <p>But I must explain to you how all this mistaken idea of denouncing</p>
    </div>
    <v-alert v-if="error" text type="error" class="mb-10">{{ error }}</v-alert>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="field">
          <ValidationProvider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <label for="email" class="label">Email</label>
            <div class="control">
              <input
                v-model="user.email"
                class="input"
                :class="{ 'is-danger': errors[0] }"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>
            <p class="red--text">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="field">
          <ValidationProvider
            v-slot="{ errors }"
            name="password"
            rules="required|min:9|max:32"
          >
            <label for="password" class="label">Password</label>
            <div class="control">
              <input
                v-model="user.password"
                class="input"
                :class="{ 'is-danger': errors[0] }"
                type="password"
                placeholder="Type in Password"
                required
              />
            </div>
            <p class="red--text">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="field">
          <ValidationProvider
            name="confirm password"
            rules="required|confirmed:password"
            v-slot="{ errors }"
          >
            <label for="password" class="label">Confirm Password</label>
            <div class="control">
              <input
                v-model="user.confirmation"
                class="input"
                :class="{ 'is-danger': errors[0] }"
                type="password"
                placeholder="Re-type Password"
                required
              />
            </div>
            <p class="red--text">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <v-row>
          <v-col cols="6">
            <v-btn
              to="/login"
              x-large
              block
              depressed
              min-height="72px"
              outlined
              >Back</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn
              type="submit"
              @click="registerUser"
              x-large
              block
              depressed
              color="primary"
              min-height="72px"
              :loading="loading"
            >
              <span class="absolute">Sign up</span>
              <v-icon icon right light class="absolute right">
                mdi-arrow-right
              </v-icon></v-btn
            >
          </v-col>
        </v-row>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
} from "vee-validate/dist/vee-validate.full";

export default {
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      loading: false,
      user: {
        email: "",
        password: "",
        confirmation: "",
      },
      error: null,
    };
  },
  methods: {
    onSubmit() {
      console.log("registration");
    },
    async registerUser() {
      const isValid = await this.$refs.observer.validate();
      this.loading = true;

      const userInfo = {
        email: this.user.email,
        password: this.user.password,
        password_confirmation: this.user.confirmation,
      };

      if (isValid) {
        try {
          await this.$axios.post("auth/register", userInfo);
          this.$toast.success("Account created");
          this.$router.push("/login");
          this.loading = false;
        } catch (e) {
          this.error = e.response.data.message;
          console.log(this.error);
        }
      } else {
        this.loading = false;
      }
    },
  },
};
</script>
