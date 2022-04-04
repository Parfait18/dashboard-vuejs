<template>
  <MainLayout-component>
    <div class="row justify-content-center">
      <div class="col-md-12 col-lg-12">
        <v-data-table
          :headers="getHeaders"
          :items="agents"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :items-per-page="5"
          class="elevation-2"
          :search="search"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{ $t('title.agent_list') }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>

              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                :label="$t('fields.search_text')"
                single-line
                hide-details
                class="mr-5"
              ></v-text-field>

              <v-dialog
                v-model="dialog"
                style="z-index: 1500;"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ $t('btn.new_agent') }}
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <v-container fluid fill-height>
                      <div class="d-flex">
                        <v-card-title
                          class="w-100 card-title mb-2 justify-center"
                        >
                          {{ $t('title.register') }}
                        </v-card-title>
                      </div>
                      <v-form @submit.prevent="submit">
                        <v-row>
                          <v-alert v-if="message" type="error">
                            {{ message }}
                          </v-alert>

                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              :label="$t('auth.firstname')"
                              prepend-icon="mdi-account"
                              v-model="editedItem.firstname"
                              required
                              @blur="$v.editedItem.firstname.$touch()"
                              :error-messages="firstNameErrors"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              :label="$t('auth.lastname')"
                              prepend-icon="mdi-account"
                              v-model="editedItem.lastname"
                              @blur="$v.editedItem.lastname.$touch()"
                              required
                              :error-messages="lastNameErrors"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              :label="$t('auth.email')"
                              prepend-icon="mdi-email"
                              v-model="editedItem.email"
                              @blur="$v.editedItem.email.$touch()"
                              required
                              :error-messages="emailErrors"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <vue-phone-number-input
                              class="mt-4 mb-4"
                              default-country-code="CM"
                              required
                              @blur="$v.editedItem.phonenumber.$touch()"
                              v-model="editedItem.phonenumber"
                              :error-messages="phonenumberErrors"
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-select
                              required
                              v-model="editedItem.homecountry"
                              @blur="$v.editedItem.homecountry.$touch()"
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
                              v-model="editedItem.password"
                              @blur="$v.editedItem.password.$touch()"
                              required
                              :error-messages="passwordErrors"
                            ></v-text-field>
                          </v-col>

                          <v-col>
                            <v-select
                              class="d-flex ml-auto"
                              cols="12"
                              v-model="editedItem.roles"
                              :items="roles_items"
                              filled
                              @blur="$v.editedItem.roles.$touch()"
                              required
                              label="Role"
                              :error-messages="roleErrors"
                              multiple
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      {{ $t('btn.cancel') }}
                    </v-btn>
                    <v-btn
                      :loading="loading"
                      color="primary"
                      large
                      type="submit"
                      text
                      @click="save"
                    >
                      {{ $t('btn.register') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">
                    {{ $t('validations.confirmation_delete') }}
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">
                      {{ $t('btn.cancel') }}
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="closeDelete">
                      {{ $t('btn.valide') }}
                    </v-btn>

                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </div>
    </div>
  </MainLayout-component>
</template>
<script>
import MainLayout from '../MainLayout.vue'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  helpers,
} from 'vuelidate/lib/validators'
import i18n from '../../i18n'
const nameRegex = helpers.regex('alphaNum', /^(?![0-9]+$)[A-Za-z0-9_-]{1,30}$/)

export default {
  name: 'UserList',
  mixins: [validationMixin],
  validations: {
    editedItem: {
      email: { required, email },
      password: { required, minLength: minLength(8), maxLength: maxLength(16) },
      firstname: { required, nameRegex },
      lastname: { required, nameRegex },
      homecountry: { required },
      phonenumber: { required },
      roles: { required },
    },
  },
  components: {
    'MainLayout-component': MainLayout,
    'vue-phone-number-input': VuePhoneNumberInput,
  },
  watch: {
    registered(value, oldvalue) {
      if (value === true) {
        this.$store.dispatch('clear')
        // this.$router.push("/confirm");
      }
    },
  },
  data: () => ({
    search: null,
    sortBy: 'created_at',
    sortDesc: true,
    roles_items: null,
    errorMessages: {},
    loading: false,
    message: null,
    dialog: false,
    dialogDelete: false,
    headers: [],
    agents: [],
    editedIndex: -1,
    editedItem: {
      roles: null,
      roles_value: null,
      firstname: null,
      lastname: null,
      phonenumber: null,
      email: null,
      homecountry: null,
      password: null,
    },
    defaultItem: {
      roles: null,
      roles_value: null,
      firstname: null,
      lastname: null,
      phonenumber: null,
      email: null,
      homecountry: null,
      password: null,
      password_confirmation: null,
    },
  }),
  computed: {
    getHeaders() {
      this.headers = [
        {
          text: i18n.t('headers.firstname'),
          align: 'center',
          value: 'firstname',
        },
        {
          text: i18n.t('headers.lastname'),
          align: 'center',
          value: 'lastname',
        },
        { text: i18n.t('headers.role'), value: 'roles' },
        { text: 'Actions', value: 'actions' },
      ]
      return this.headers
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.editedItem.password.$dirty) return errors
      if (!this.$v.editedItem.password.minLength)
        errors.push(i18n.t('validations.min_caracter'))
      !this.$v.editedItem.password.required &&
        errors.push(i18n.t('validations.required_password'))
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.editedItem.email.$dirty) return errors
      !this.$v.editedItem.email.email &&
        errors.push(i18n.t('validations.valid_email'))
      !this.$v.editedItem.email.required &&
        errors.push(i18n.t('validations.required_email'))
      return errors
    },
    firstNameErrors() {
      const errors = []
      if (!this.$v.editedItem.firstname.$dirty) return errors
      !this.$v.editedItem.firstname.required &&
        errors.push(i18n.t('validations.required_firstname'))
      !this.$v.editedItem.firstname.nameRegex &&
        errors.push(i18n.t('validations.caracter_firstname'))
      return errors
    },
    lastNameErrors() {
      const errors = []
      if (!this.$v.editedItem.lastname.$dirty) return errors
      !this.$v.editedItem.lastname.required &&
        errors.push(i18n.t('validations.required_lastname'))
      !this.$v.editedItem.lastname.nameRegex &&
        errors.push(i18n.t('validations.caracter_lastname'))
      return errors
    },
    phonenumberErrors() {
      const errors = []
      if (!this.$v.editedItem.phonenumber.$dirty) return errors
      !this.$v.editedItem.phonenumber.required &&
        errors.push(i18n.t('validations.required_phonenumber'))
      return errors
    },
    homecountryErrors() {
      const errors = []
      if (!this.$v.editedItem.homecountry.$dirty) return errors
      !this.$v.editedItem.homecountry.required &&
        errors.push(i18n.t('validations.required_homecountry'))
      return errors
    },
    roleErrors() {
      const errors = []
      if (!this.$v.editedItem.roles.$dirty) return errors
      !this.$v.editedItem.roles.required &&
        errors.push(i18n.t('validations.role_required'))
      return errors
    },
    ...mapGetters(['errors', 'registered', 'countries']),
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
    this.getRoles()
    this.$store.dispatch('getcountries')
    console.log(this.countries)
  },

  methods: {
    initialize() {
      this.agents = [
        {
          firstname: 'Toto 1',
          lastname: 'Toto 1',
          roles: ['Agent niveau 1', 'Agent niveau2'],
        },
        {
          firstname: 'Toto 1',
          lastname: 'Toto 1',
          roles: ['Agent niveau 1'],
        },
        {
          firstname: 'Toto 1',
          lastname: 'Toto 1',
          roles: ['Agent niveau 1'],
        },
      ]
    },
    async getRoles() {
      this.roles_items = ['agent1', 'agent2']
    },
    editItem(item) {
      this.editedIndex = this.agents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.agents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.agents.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.agents[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    async submit() {
      this.isLoading = true
      this.$v.$touch()
      const data = new FormData()
      data.append('prenom', this.editedItem.firstname)
      data.append('nom', this.editedItem.lastname)
      data.append('email', this.editedItem.email)
      data.append('password', this.editedItem.password)
      // data.append("password_confirmation", this.password_confirmation);
      data.append('phonenumber', this.editedItem.phonenumber)
      data.append('paysorigine', this.editedItem.homecountry)

      if (!this.$v.$invalid) {
        await this.$store
          .dispatch('register', data)
          .then((response) => {
            this.isLoading = false
          })
          .catch((error) => {
            this.loading = false
            console.error(error)
          })
      }
    },
  },
}
</script>
