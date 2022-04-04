<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex>
        <div class="row justify-content-center">
          <div class="col-md-3 col-lg-3">
            <div class="">
              <v-card class="login-wrap p-5 p-md-5">
                <div class="d-flex">
                  <v-card-title class="w-100 card-title mb-2 justify-center">
                    {{ $t('title.login') }}
                  </v-card-title>
                </div>
                <v-form>
                  <v-text-field
                    :error-messages="emailErrors"
                    required
                    @blur="$v.email.$touch()"
                    prepend-icon="email"
                    v-model="email"
                    name="email"
                    :label="$t('auth.email')"
                    type="email"
                  ></v-text-field>
                  <v-text-field
                    :error-messages="passwordErrors"
                    required
                    @blur="$v.password.$touch()"
                    v-model="password"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    :label="$t('auth.password')"
                    type="password"
                  ></v-text-field>

                  <v-btn
                    block
                    depressed
                    style="margin-top: 18px; margin-bottom: 18px;"
                    :loading="isLOading"
                    :disabled="this.$v.$invalid"
                    @click.prevent="submit"
                    type="submit"
                    color="warning"
                  >
                    {{ $t('btn.login') }}
                  </v-btn>
                  <!-- <v-btn class="text-right" color="primary" depressed plain link to="/register" > 
            {{$t('btn.register')}}
            </v-btn> -->
                  <div class="form-group d-md-flex"></div>
                </v-form>
              </v-card>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import i18n from '../../i18n'
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },
  data() {
    return {
      isLOading: false,
      email: '',
      password: '',
    }
  },
  methods: {
    submit() {
      this.isLOading = true;
      this.$v.$touch();
      const data = {
        email: this.email,
        password: this.password,
      };
      if (!this.$v.$invalid) {

        this.$store
          .dispatch("login", data)
          .then((response) => {
            console.log(response)
            this.isLOading = false;
          })
          .catch((error) => {
            this.isLOading = false;
            console.log(error);
          });
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch('clear')
  },
  created() {
    this.$root.$i18n.locale = this.langLocal
  },
  watch: {
    authenticated(value, oldvalue) {
      if (value === true) {
        this.$store.dispatch('clear')
        console.log('authenticated a changé')
        this.$router.push('/dashboard')
      }
    },
  },
  computed: {
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength &&
        errors.push(i18n.t('validations.min_caracter'))
      !this.$v.password.required &&
        errors.push(i18n.t('validations.required_password'))
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push(i18n.t('validations.valid_email'))
      !this.$v.email.required &&
        errors.push(i18n.t('validations.required_email'))
      return errors
    },
    ...mapGetters(['errors', 'authenticated', 'langLocal']),
  },
}
</script>
<style scoped>
@import '../../../public/assets/css/style.css';

#contact-grid {
  width: 100%;
  min-height: 50vh;
}

.mobile-position {
  margin: 10px;
}
.card-title {
  color: rgb(63, 53, 99);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.w3l-footer {
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 100;
  width: 100%;
}

@media (max-width: 700px) {
}
</style>
