<template>
  <div class="onboarding-container">
    <div>
      <div class="brand">
        <img src="~/assets/img/logo-icon.svg" alt="" />
        <div class="brand-name primary--text">Project Name</div>
      </div>
      <div class="intro">
        <h3>Welcome Back</h3>
        <p>
          But I must explain to you how all this mistaken idea of denouncing
        </p>
      </div>
      <v-alert v-if="error" text type="error" class="mb-10">{{
        error
      }}</v-alert>
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
              rules="required"
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
          <!-- <div class="field text-right">
            <a href="/">Forgot Password?</a>
          </div> -->
          <v-row>
            <v-col cols="6">
              <v-btn
                to="/register"
                @click="login = false"
                x-large
                block
                depressed
                min-height="72px"
                outlined
                >Sign up</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn
                type="submit"
                @click="login"
                x-large
                block
                depressed
                color="primary"
                min-height="72px"
                :loading="loading"
              >
                <span class="absolute">Login</span>
                <v-icon icon right light class="absolute right">
                  mdi-login
                </v-icon></v-btn
              >
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </div>
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
      error: null,
      loading: false,
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("registration");
    },
    async login() {
      const isValid = await this.$refs.observer.validate();
      this.loading = true;

      if (isValid) {
        try {
          let res = await this.$auth.loginWith("local", {
            data: {
              username: this.user.email,
              password: this.user.password,
            },
          });
          this.loading = false;
          let user = res.data.data.user;
          console.log(user);
          this.$auth.setUser(user);
          this.$toast.success("Login successful");
        } catch (e) {
          this.loading = false;
          this.error = e.response.data.message;
        }
      } else {
        this.loading = false;
      }
    },
  },
};
</script>
