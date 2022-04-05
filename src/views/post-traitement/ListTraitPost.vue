<template>
  <MainLayout-component>
    <div class="row justify-content-center">
      <div class="mt-5 col-md-12 col-lg-12">
        <v-card
      class="d-flex align-center justify-center pa-4 mx-auto mb-4"
      min-height="76"
      outlined
    >
      <div class="text-center">
      Les postes de Traitement
      </div>
    </v-card>

        <v-data-table
          :headers="getHeaders"
          :items="posts"
          :search="search"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :items-per-page="5"
          class="elevation-2"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title></v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>

              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                :label="$t('fields.search_text')"
                single-line
                hide-details
              ></v-text-field>

              <v-dialog
                content-class="custimize-dialog"
                transition="dialog-bottom-transition"
                scrollable
                v-model="dialog"
                style="z-index: 1500;"
                max-width="1000px"
              >
                <v-card>
                  <v-card-text>
                    <v-container
                      row
                      justify-center
                      align-center
                      class="mx-auto mt-1"
                    >
                      <v-flex xs12 sm12 md12 lg12 xl12>
                        <div>
                          <v-text-field
                            readonly
                            v-model="editedItem.post_name"
                            name="fristname"
                            :label="$t('fields.post_name')"
                          ></v-text-field>                 
                          <v-select
                            v-model="editedItem.country"
                            item-text="country"
                            :items="countries"
                            filled
                            :label="$t('fields.country')"
                            readonly
                          ></v-select>         
                          <v-spacer></v-spacer>                   
                        </div>
                      </v-flex>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      {{ $t('btn.cancel') }}
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      :disabled="
                        (postNameErrors != '')
                      "
                      text
                      @click="save"
                    >
                      {{ $t('btn.valide') }}
                    </v-btn>
                    <v-btn
                      color="red darken-1"
                      
                      text
                      @click="reject"
                    >
                      {{ $t('btn.reject') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
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
import 'viewerjs/dist/viewer.css'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import i18n from '../../i18n'
import MainLayout from '../MainLayout'
export default {
  name: 'ListDemands',
  components: {
    'MainLayout-component': MainLayout,
    'vue-phone-number-input': VuePhoneNumberInput,
  },
  mixins: [validationMixin],
  validations: {
    editedItem: {
      postName: { required },
      country: { required },
    },
  },
  data: () => ({

    search: null,
    sortBy: 'created_at',
    sortDesc: true,
    countries: null,
    sortBy: 'created_at',
    sortDesc: true,
    isLoading: false,  
    country: null,
    dialog: false,
    dialogDelete: false,
    headers: [],
    editedIndex: -1,
    editedItem: {
      post_name: null,
      country: null,
    },
    defaultItem: {},
    posts:null
  }),

  computed: {
    getHeaders() {
      this.headers = [
        {
          text: 'N°',
          align: 'center',
          value: 'id',
        },
        {
          text: i18n.t('headers.post_name'),
          align: 'center',
          value: 'post_name',
        },   
        {
          text: i18n.t('headers.country'),
          align: 'center',
          value: 'country',
        },
        { text: 'Actions', align: 'center', value: 'actions' },
      ]
      return this.headers
    },
    postNameErrors() {
      const errors = [];
      if (!this.$v.editedItem.postName.$dirty) return errors;
      !this.$v.editedIte.postName.required &&
        errors.push(i18n.t("validations.required_firstname"));
      !this.$v.editedItem.postName.nameRegex &&
        errors.push(i18n.t("validations.caracter_firstname"));
      return errors;
    },
    countryErrors() {
      const errors = [];
      if (!this.$v.editedItem.country.$dirty) return errors;
      !this.$v.editedItem.country.required &&
        errors.push(i18n.t("validations.required_homecountry"));
      return errors;
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    reject(){
    this.demand_status='Rejeté'
    },
    initialize() {
          this.posts = [
        {
          id: 1,
          post_name: "Post2",
          country: "Benin",
        },
        {
          id: 2,
          post_name: "Post1",
          country: "TOGO",
        },
     
      ];
    },
    getColor(statut) {
      if (statut == 'Validé' || statut == 'Valided') return 'green'
      else if (statut == 'En cours' || statut == 'Pending') return 'orange'
      else return 'red'
    },
    editItem(item) {
      this.editedIndex = this.demands.indexOf(item)
      const passport_file = new File(['blob'], item.copypassport, {
        lastModified: new Date(Date.now()).toISOString().substr(0, 10),
        type: 'text/jpg',
      })
      item.copypassport = passport_file
      const logement_file = new File(['blob'], item.justificatiflogement, {
        lastModified: new Date(Date.now()).toISOString().substr(0, 10),
        type: 'text/jpg',
      })
      item.justificatiflogement = logement_file
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close() {
      this.show_comment = false
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        this.editedItem.statut_demande =this.demand_status;
        Object.assign(this.demands[this.editedIndex], this.editedItem)
      } else {
        this.demands.push(this.editedItem)
      }
      
      this.demand_status='Validé'
      this.close()
    },
    show_logement() {
      this.$viewerApi({
        images: this.logement_images,
      })
    },
    async submit() {},
  },
}
</script>
<style scoped>
.custimize-dialog {
  z-index: 33000;
}
</style>
