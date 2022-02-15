<template>
  <dashboard-component>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex>
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-">
              <div class="">
                <v-card class="login-wrap p-4 p-md-3 mx-auto my-auto">
                  <div class="d-flex">
                    <v-card-title class="w-100 card-title mb-2 justify-center">
                      {{ $t("title.register") }}
                    </v-card-title>
                  </div>
                  <v-form @submit.prevent="submit">
                    <v-row>
                      <v-alert v-if="message" type="error">{{
                        message
                      }}</v-alert>

                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          :label="$t('auth.firstname')"
                          prepend-icon="mdi-account"
                          v-model="firstname"
                          required
                          @blur="$v.firstName.$touch()"
                          :error-messages="firstNameErrors"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          :label="$t('auth.lastname')"
                          prepend-icon="mdi-account"
                          v-model="lastname"
                          @blur="$v.lastName.$touch()"
                          required
                          :error-messages="lastNameErrors"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          :label="$t('auth.email')"
                          prepend-icon="mdi-email"
                          v-model="email"
                          @blur="$v.email.$touch()"
                          required
                          :error-messages="emailErrors"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <vue-phone-number-input
                          class="mt-4 mb-4"
                          default-country-code="CM"
                          required
                          @blur="$v.phonenumber.$touch()"
                          v-model="phonenumber"
                          :error-messages="phonenumberErrors"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          required
                          v-model="homecountry"
                          @blur="$v.homecountry.$touch()"
                          :items="countries"
                          :label="$t('auth.homecountry')"
                          :error-messages="homecountryErrors"
                          item-text="nom"
                          item-value="nom"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          :label="$t('auth.password')"
                          type="password"
                          v-model="password"
                          @blur="$v.password.$touch()"
                          required
                          :error-messages="passwordErrors"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          :label="$t('auth.password_confirmation')"
                          type="password"
                          v-model="password_confirmation"
                          required
                          @blur="$v.password_confirmation.$touch()"
                          :error-messages="verifyErrors"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-select
                          class="d-flex ml-auto"
                          cols="12"
                          v-model="roles_value"
                          :items="roles_items"
                          filled
                          @blur="$v.roles.$touch()"
                          required
                          label="Role"
                          :error-messages="roleErrors"
                          multiple
                        ></v-select>
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
                            {{ $t("btn.register") }}</v-btn
                          >
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
  </dashboard-component>
</template>

<script>
import Dashboard from "../Dashboard.vue";

import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  helpers,
} from "vuelidate/lib/validators";
import i18n from "../../i18n";
const nameRegex = helpers.regex("alphaNum", /^(?![0-9]+$)[A-Za-z0-9_-]{1,30}$/);

export default {
  name: "Register",
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(16) },
    firstName: { required, nameRegex },
    lastName: { required, nameRegex },
    homecountry: { required },
    phonenumber: { required },
    roles : { required},
    password_confirmation: {
      required,
      sameAs: sameAs(function () {
        return this.password;
      }),
    },
  },
  data() {
    return {
      roles_items:null,
      roles_value:null, 
      firstname: null,
      lastname: null,
      phonenumber: null,
      email: null,
      homecountry: null,
      password: null,
      password_confirmation: null,
      errorMessages: {},
      loading: false,
      message: null,
    };
  },
  components: {
    "vue-phone-number-input": VuePhoneNumberInput,
    "dashboard-component": Dashboard,
  },
  watch: {
    registered(value, oldvalue) {
      if (value === true) {
        this.$store.dispatch("clear");
        // this.$router.push("/confirm");
      }
    },
  },
  created() {
    this.$store.dispatch("getcountries");
    this.getRoles();
  },
  computed: {
  
    verifyErrors() {
      const errors = [];
      if (!this.$v.password_confirmation.$dirty) return errors;
      !this.$v.password_confirmation.required &&
        errors.push(i18n.t("validations.confirm_password"));
      if (!this.$v.password_confirmation.sameAs)
        errors.push(i18n.t("validations.match_password"));
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.minLength)
        errors.push(i18n.t("validations.min_caracter"));
      !this.$v.password.required &&
        errors.push(i18n.t("validations.required_password"));
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push(i18n.t("validations.valid_email"));
      !this.$v.email.required &&
        errors.push(i18n.t("validations.required_email"));
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required &&
        errors.push(i18n.t("validations.required_firstname"));
      !this.$v.firstName.nameRegex &&
        errors.push(i18n.t("validations.caracter_firstname"));
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required &&
        errors.push(i18n.t("validations.required_lastname"));
      !this.$v.lastName.nameRegex &&
        errors.push(i18n.t("validations.caracter_lastname"));
      return errors;
    },
    phonenumberErrors() {
      const errors = [];
      if (!this.$v.phonenumber.$dirty) return errors;
      !this.$v.phonenumber.required &&
        errors.push(i18n.t("validations.required_phonenumber"));
      return errors;
    },
    homecountryErrors() {
      const errors = [];
      if (!this.$v.homecountry.$dirty) return errors;
      !this.$v.homecountry.required &&
        errors.push(i18n.t("validations.required_homecountry"));
      return errors;
    },
     roleErrors() {
      const errors = [];
      if (!this.$v.roles.$dirty) return errors;
      !this.$v.roles.required &&
        errors.push(i18n.t("validations.role_required"));
      return errors;
    },
    ...mapGetters(["errors", "registered", "countries", "langLocal"]),
  },
  methods: {
    async submit() {
      this.isLoading = true;
      this.$v.$touch();
      const data = new FormData();
      data.append("prenom", this.firstname);
      data.append("nom", this.lastname);
      data.append("email", this.email);
      data.append("password", this.password);
      data.append("password_confirmation", this.password_confirmation);
      data.append("phonenumber", this.phonenumber);
      data.append("paysorigine", this.homecountry);
      data.append("role", this.leveltype);

      console.log(data);
      if (!this.$v.$invalid) {
        await this.$store
          .dispatch("register", data)
          .then((response) => {
            this.isLoading = false;
          })
          .catch((error) => {
            this.loading = false;
            console.error(error);
          });
      }
    },
    async getRoles(){
      this.roles_items =[
        "agent1",
        "agent2",
      ]
    }
  },
};
</script>
<style scoped>
@import "../../../public/assets/css/style.css";

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