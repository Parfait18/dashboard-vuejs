<template>
 <MainLayout-component>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex>
        <div class="mt-5 row justify-content-center">
          <div class="col-md-6 col-lg-6">
            <div class="">
              <v-card class="login-wrap p-5 p-md-5">
                <div class="d-flex">
                  <v-card-title class="w-100 card-title mb-2 justify-center">
                    {{ $t("title.newrole") }}
                  </v-card-title>
                </div>
                <v-form @submit.prevent="submit">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        :label="$t('fields.role')"
                        v-model="role"
                        required
                        @blur="$v.role.$touch()"
                        :error-messages="roleErrors"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-card flat>
                    <v-card-text>
                      <v-container fluid>
                        <v-row>
                          <v-col
                            v-for="role in role_items"
                            :key="role.id"
                            cols="12"
                            sm="6"
                            md="6"
                            
                          >
                            <v-checkbox
                              v-model="permissions"
                              :label="role.name"
                              color="indigo"
                              :value="role.name"
                              hide-details
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                  <v-btn
                    block
                    depressed
                    style="margin-top: 18px; margin-bottom: 18px"
                    :loading="isLOading"
                    :disabled="this.$v.$invalid"
                    type="submit"
                    color="warning"
                  >
                    {{ $t("btn.saverole") }}</v-btn
                  >
                  <div class="form-group d-md-flex"></div>
                </v-form>
              </v-card>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</MainLayout-component>
</template>

<script>
import MainLayout from "../MainLayout.vue";
import i18n from "../../i18n";
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, helpers } from "vuelidate/lib/validators";
const roleReguex = helpers.regex(
  "alphaNum",
  /^(?![0-9]+$)[A-Za-z0-9_ -]{1,30}$/
);

export default {
  name: "Login",
  mixins: [validationMixin],
  validations: {
    role: { required, roleReguex },
    permissions: { required },
  },
  components: {
    "MainLayout-component": MainLayout,
  },
  data() {
    return {
      isLOading: false,
      role: "agent niveau1",
      permissions: [],
    };
  },
  methods: {
    submit() {
      this.isLOading = true;
      this.$v.$touch();
      const data = {
        role: this.role,
        permissions: this.permissions,
      };
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("createrole", data)
          .then((response) => {
            this.isLOading = false;
          })
          .catch((error) => {
            this.isLOading = false;
            console.error(error);
          });
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch("clear");
  },
  created() {
    this.$root.$i18n.locale = this.langLocal;
    this.role_items = [
      {
        id: 0,
        name: "Validation niveau 1",
      },
      {
        id: 1,
        name: "Validation niveau 2",
      },
      {
        id: 3,
        name: "Rejeter demande",
      },
     
    ];
  },
  watch: {
    permissions(value) {
      console.log(value);
    },
  },
  computed: {
    roleErrors() {
      const errors = [];
      if (!this.$v.role.$dirty) return errors;
      !this.$v.role.roleReguex && errors.push(i18n.t("validations.rolereguex"));
      !this.$v.role.required &&
        errors.push(i18n.t("validations.required_role"));
      return errors;
    },
    permissionsErrors() {
      const errors = [];
      if (!this.$v.permissions.$dirty) return errors;
      !this.$v.permissions.required &&
        errors.push(i18n.t("validations.required_permissions"));
      return errors;
    },
    ...mapGetters(["errors", "authenticated", "langLocal"]),
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
  #img-block {
    display: none;
  }
  .login-wrap {
    min-height: 60vh;
  }
}
</style>
