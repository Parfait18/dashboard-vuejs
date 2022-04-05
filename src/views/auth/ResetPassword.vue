<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex>
        <div class="row justify-content-center">
          <div class="col-md-3 col-lg-3">
            <div class="">
              <v-card class="login-wrap p-4 p-md-3 mx-auto my-auto">
                <div class="d-flex">
                  <v-card-title class="w-100 card-title mb-2 justify-center">
                    Réinitialisation de Mot de Passe
                  </v-card-title>
                </div>
                <v-form @submit.prevent="submit">
                  <v-row>
                    <v-alert v-if="message" type="error">
                      {{ message }}
                    </v-alert>

                    <v-col cols="12">
                      <v-text-field
                        :label="$t('auth.last_password')"
                        type="password"
                        v-model="last_password"
                        @blur="$v.last_password.$touch()"
                        required
                        :error-messages="lastPasswordErrors"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        :label="$t('auth.new_password')"
                        type="password"
                        v-model="password"
                        @blur="$v.password.$touch()"
                        required
                        :error-messages="passwordErrors"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        :label="$t('auth.new_password_confirmation')"
                        type="password"
                        v-model="password_confirmation"
                        required
                        @blur="$v.password_confirmation.$touch()"
                        :error-messages="verifyErrors"
                      ></v-text-field>
                    </v-col>

                    <v-col class="d-flex ml-auto" cols="12">
                      <div class="text-center">
                        <v-btn
                          :loading="loading"
                          color="primary"
                          large
                          type="submit"
                          text
                          rounded
                        >
                       {{$t('btn.valide') }}
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
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
import Dashboard from '../Dashboard.vue'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  sameAs,
  helpers,
} from 'vuelidate/lib/validators'
import i18n from '../../i18n'
const nameRegex = helpers.regex('alphaNum', /^(?![0-9]+$)[A-Za-z0-9_-]{1,30}$/)

export default {
  name: 'Register',
  mixins: [validationMixin],
  validations: {
    last_password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(16),
    },
    password: { required, minLength: minLength(8), maxLength: maxLength(16) },
    password_confirmation: {
      required,
      sameAs: sameAs(function () {
        return this.password
      }),
    },
  },
  data() {
    return {
      password: null,
      last_password: null,
      password_confirmation: null,
      errorMessages: {},
      loading: false,
      message: null,
    }
  },
  components: {
    'dashboard-component': Dashboard,
  },
  watch: {
    registered(value, oldvalue) {},
  },
  created() {},
  computed: {
    verifyErrors() {
      const errors = []
      if (!this.$v.password_confirmation.$dirty) return errors
      !this.$v.password_confirmation.required &&
        errors.push(i18n.t('validations.confirm_password'))
      if (!this.$v.password_confirmation.sameAs)
        errors.push(i18n.t('validations.match_password'))
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      if (!this.$v.password.minLength)
        errors.push(i18n.t('validations.min_caracter'))
      !this.$v.password.required &&
        errors.push(i18n.t('validations.required_password'))
      return errors
    },
    lastPasswordErrors() {
      const errors = []
      if (!this.$v.last_password.$dirty) return errors
      if (!this.$v.last_password.minLength)
        errors.push(i18n.t('validations.min_caracter'))
      !this.$v.last_password.required &&
        errors.push(i18n.t('validations.required_password'))
      return errors
    },

    ...mapGetters(['errors', 'registered', 'countries', 'langLocal']),
  },
  methods: {
    async submit() {
      this.isLoading = true
      this.$v.$touch()
      const data = new FormData()

      data.append('last_password', this.last_password)
      data.append('password', this.password)
      data.append('password_confirmation', this.password_confirmation)

      console.log(data)
      if (!this.$v.$invalid) {
        // await this.$store
        //   .dispatch('register', data)
        //   .then((response) => {
        //     this.isLoading = false
        //   })
        //   .catch((error) => {
        //     this.loading = false
        //     console.error(error)
        //   })
      }
    },
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
