<template>
  <dashboard-component>
    <div class="row justify-content-center">
      <div class="col-md-12 col-lg-12">
        <v-data-table
          :headers="getHeaders"
          :items="demands"
          sort-by="calories"
          class="elevation-1 p-2"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Liste des demandes</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <!-- <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                 Ajouter un agent
                  </v-btn> -->
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                  <v-container
     
      row
      justify-center
      align-center
      class="mx-auto mt-1"
    >
      <v-flex xs12 sm12 md12 lg12 xl12 >
        <h4 class="ask-title blue-grey--text darken-1 text-center m-2">
          {{ $t("ask_title") }}
        </h4>
        <div>
          <v-stepper v-model="step">
            <v-stepper-header>
              <v-stepper-step :complete="step > 1" step="1">{{
                $t("personal_info")
              }}</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="step > 2" step="2">{{
                $t("visa_info")
              }}</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="step > 3" step="3">{{
                $t("piecesjointes")
              }}</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="isOkay"
                >Payment</v-stepper-step
              >
            </v-stepper-header>
            <v-stepper-items class="mt-10">
              <v-stepper-content ref="step1" step="1">
                <v-text-field
                  v-model="editedItem.firstname"
                  required
                  @blur="$v.editedItem.firstname.$touch()"
                  name="fristname"
                  :label="$t('firstName')"
                  :error-messages="firstnameErrors"
                >
                </v-text-field>
                <v-text-field
                  v-model="editedItem.lastname"
                  required
                  @blur="$v.editedItem.lastname.$touch()"
                  name="lastname"
                  :label="$t('lastName')"
                  :error-messages="lastnameErrors"
                >
                </v-text-field>
                <v-select
                  v-model="editedItem.gender"
                  required
                  item-text="name"
                  @blur="$v.editedItem.gender.$touch()"
                  :items="genders"
                  :label="$t('gender')"
                  :error-messages="genderErrors"
                >
                </v-select>
                <div>
             
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        required
                        v-model="editedItem.birthdate"
                        @blur="$v.editedItem.birthdate.$touch()"
                        :label="$t('birthday')"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="birthdateErrors"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                  
                      v-model="editedItem.birthdate"
                      :active-picker.sync="activePicker"
                      :max="
                        new Date(
                          Date.now() - new Date().getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .substr(0, 10)
                      "
                      min="1950-01-01"
                      @change="save_birthdate"
                    ></v-date-picker>
                  </v-menu>
                </div>
                <v-select
                  v-model="editedItem.nationality"
                  required
                  item-text="nationalite"
                  @blur="$v.editedItem.nationality.$touch()"
                  :items="nationalities"
                  filled
                  :label="$t('nationality')"
                  :error-messages="nationalityErrors"
                >
                </v-select>
                <vue-phone-number-input
                default-country-code="CM"
                  @blur="$v.editedItem.phonenumber.$touch()"
                  required
                  v-model="editedItem.phonenumber"
                  :error-messages="phonenumberErrors"
                />
                <v-btn
                  @click="new_demand = false"
                  class="mx-5 m-5"
                  color="error"
                  >{{ $t("close_btn") }}
                </v-btn>
                <v-btn color="primary" @click="step = 2; goto('step2')" :disabled="stepTwo">{{
                  $t("next_btn")
                }}</v-btn>
              </v-stepper-content>

              <v-stepper-content ref="step2" step="2">
                <v-select
                  required
                  v-model="editedItem.homecountry"
                  @blur="$v.editedItem.homecountry.$touch()"
                  filled
                  :items="countries"
                  :label="$t('home_country')"
                  :error-messages="homecountryErrors"
                  item-text="nom"
                  item-value="nom"
                >
                </v-select>
                <v-select
                  v-model="editedItem.visatype"
                  item-text="designation"
                  item-value="id"
                  filled
                  required
                  @blur="$v.editedItem.visatype.$touch()"
                  :items="typesvisa"
                  :label="$t('visa_type')"
                  :error-messages="visaTypeErrors"
                ></v-select>
                <v-textarea
                  v-model="editedItem.motif"
                  filled
                  required
                  @blur="$v.editedItem.motif.$touch()"
                  :label="$t('travel_reason')"
                  auto-grow
                  :error-messages="motifErrors"
                ></v-textarea>
                <v-textarea
                  v-model="editedItem.ordremission"
                  filled
                  required
                  @blur="$v.editedItem.ordremission.$touch()"
                  :label="$t('mission_order')"
                  auto-grow
                  :error-messages="ordremissionErrors"
                >
                </v-textarea>
                <v-btn @click="step = 1; goto('step1')" color="warning" class="mx-5">{{
                  $t("return_btn")
                }}</v-btn>
                <v-btn
                  color="primary"
                  class="mx-5"
                  :disabled="stepThree"
                  @click="step = 3; goto('step3')"
                >
                  {{ $t("next_btn") }}
                </v-btn>
              </v-stepper-content>

              <v-stepper-content ref="step3" step="3">
                <v-text-field
                  v-model="editedItem.passportnumber"
                  required
                  @blur="$v.editedItem.passportnumber.$touch()"
                  :error-messages="passportnumberErrors"
                  type="text"
                  :label="$t('passport_number')"
                >
                </v-text-field>
                <v-menu
                    ref="expi"
                    v-model="expi"
                    :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      required
                      v-model="editedItem.expiredate"
                      @blur="$v.editedItem.expiredate.$touch()"
                      :label="$t('expir_date')"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="expiredateErrors"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                   
                    v-model="editedItem.expiredate"
                    :active-picker.sync="activeExpirePicker"
                    :min="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    @change="expi_save"
                  ></v-date-picker>
                </v-menu>
                <v-file-input
                  required
                  @blur="$v.editedItem.copypassport.$touch()"
                  v-model="editedItem.copypassport"
                  :label="$t('copypassport')"
                  filled
                  prepend-icon="mdi-camera"
                  :error-messages="copypassportErrors"
                ></v-file-input>
                <v-file-input
                  required
                  @blur="$v.editedItem.justificatiflogement.$touch()"
                  v-model="editedItem.justificatiflogement"
                  :label="$t('justificatiflogement')"
                  filled
                  prepend-icon="mdi-camera"
                  :error-messages="justificatiflogementErrors"
                ></v-file-input>
                <v-btn
                  @click="
                    step = 2;
                    goto('step2')
                    isLoading = false;
                  "
                  class="mx-5"
                  color="warning"
                  >{{ $t("return_btn") }}</v-btn
                >
                <v-btn
                  color="success"
                  :loading="isLoading"
                  :disabled="stepFour"
                  @click="submit"
                  
                  >{{ $t("valider") }}</v-btn
                >
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </div>
      </v-flex>
    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >{{ $t("validations.confirmation_delete") }}</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
               <template v-slot:[`item.statut_demande`]="{ item }">    
              <v-chip
                
                :color="getColor(item.statut_demande)"
                dark
              >
                {{ item.statut_demande }}
              </v-chip>
            </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </div>
    </div>
  </dashboard-component>
</template>
<script>
import moment from "moment";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  helpers,
} from "vuelidate/lib/validators";
const alphaNumAndDotValidator = helpers.regex("alphaNumAndDot", /^[a-z\d.]*$/i);
const regEx = new RegExp(/^.*\.(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|pdf|PDF)$/i);
const nameRegex = helpers.regex("alphaNum",/^(?![0-9]+$)[A-Za-z0-9_-]{1,30}$/);

import i18n from "../../i18n";
import Dashboard from "../Dashboard";
export default {
  name: "ListDemands",
  components: {
    "dashboard-component": Dashboard,
      "vue-phone-number-input": VuePhoneNumberInput,

  },
mixins: [validationMixin],
 validations: {
   editedItem:{
      firstname: { required ,nameRegex},
    lastname: { required ,nameRegex},
    gender: { required },
    birthdate: { required },
    visatype: { required },
    homecountry: { required },
    motif: { required },
    ordremission: { required },
    nationality: { required },
    expiredate: { required },
    phonenumber: { required },
    copypassport: { required },
    justificatiflogement: { required },
    passportnumber: {
      required,
      alphaNumAndDotValidator,
      minLength: minLength(5),
      maxLength: maxLength(30),
    },
   }
   
  },
  data: () => ({
    countries:null,
    typesvisa:null,
       menu: false,
      expi: false,
      sortBy: "created_at",
      sortDesc: true,
      visa: null,
      isLoading: false,
      nationalities:null, 
      activePicker: null,
      activeExpirePicker: null,
      menu: false,
      expi: false,
      isOkay: false,
      birthdate: null,
      expiredate: null,
      homecountry: null,
      step: 1,
      genders: [
        {
          name: "F",
          value: "f",
        },
        {
          name: "M",
          value: "m",
        },
      ],
    dialog: false,
    dialogDelete: false,
    headers: [],
    demands: [],
    editedIndex: -1,
    editedItem: {
        firstname: null,
      lastname:null,
      gender: null,
      birthdate: null,
      visatype:null,
      homecountry:null,
      motif:null,
      ordremission: null,
      nationality: null,
      expiredate:null,
      phonenumber: null,
      copypassport:null,
      justificatiflogement:null,
      copypassportfilename:null,
      passportnumber: null
    },
    defaultItem: {
        firstname: null,
      lastname:null,
      gender: null,
      birthdate: null,
      visatype:null,
      homecountry:null,
      motif:null,
      ordremission: null,
      nationality: null,
      expiredate:null,
      phonenumber: null,
      copypassport:null,
      justificatiflogement:null,
      copypassportfilename:null,
      passportnumber: null
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New demand" : "Edit Demand";
    },
    getHeaders() {
      this.headers = [
        {
          text: "N°",
          align: "center",
          value: "code_demande",
        },
        {
          text: i18n.t("headers.firstname"),
          align: "center",
          value: "firstname",
        },
         {
          text: i18n.t("headers.lastname"),
          align: "center",
          value:"lastname",
        },
        {
          text: i18n.t("headers.country"),
          align: "center",
          value: "pays_demande",
        },
        {
          text: i18n.t("headers.visatype"),
          align: "center",
          value: "type_visas",
        },
        {
          text: i18n.t("headers.statut"),
          align: "center",
          value: "statut_demande",
        },
        { text: "Date", align: "center", value: "created_at" },
        ,
        { text: "Actions", align: "center", value: "actions" },
      ];
      return this.headers;
    },
     stepTwo() {
      if (
        this.$v.editedItem.firstname.$invalid ||
        this.$v.editedItem.lastname.$invalid ||
        this.$v.editedItem.gender.$invalid ||
        this.$v.editedItem.birthdate.$invalid ||
       this.$v.editedItem.nationality.$invalid ||
        this.$v.editedItem.phonenumber.$invalid
      ) {
        return true;
      } else {
        return false;
      }
    },
    stepThree() {
      if (
        this.$v.editedItem.motif.$invalid ||
        this.$v.editedItem.ordremission.$invalid ||
        this.$v.editedItem.visatype.$invalid ||
        this.$v.editedItem.homecountry.$invalid
      ) {
        return true;
      } else {
        return false;
      }
    },
    stepFour() {
      if (
        this.$v.editedItem.expiredate.$invalid ||
        this.$v.editedItem.passportnumber.$invalid ||
        this.$v.editedItem.copypassport.$invalid ||
        this.$v.editedItem.justificatiflogement.$invalid
      ) {
        return true;
      } else {
        return false;
      }
    },
        phonenumberErrors() {
      const errors = [];
      if (!this.$v.editedItem.phonenumber.$dirty) return errors;
      !this.$v.editedItem.phonenumber.required &&
        errors.push(this.getLocaleMessages["required_phonenumber"]);
      return errors;
    },
    firstnameErrors() {
      const errors = [];
      if (!this.$v.editedItem.firstname.$dirty) return errors;
      !this.$v.editedItem.firstname.required &&
        errors.push(this.getLocaleMessages["required_firstname"]);
      !this.$v.editedItem.firstname.nameRegex &&
        errors.push(this.getLocaleMessages["caracter_firstname"]);
      return errors;
    },
    lastnameErrors() {
      const errors = [];
      if (!this.$v.editedItem.lastname.$dirty) return errors;
      !this.$v.editedItem.lastname.required &&
        errors.push(this.getLocaleMessages["required_lastname"]);
      !this.$v.editedItem.lastname.nameRegex &&
        errors.push(this.getLocaleMessages["caracter_lastname"]);
      return errors;
    },
    genderErrors() {
      const errors = [];
      if (!this.$v.editedItem.gender.$dirty) return errors;
      !this.$v.editedItem.gender.required &&
        errors.push(this.getLocaleMessages["required_gender"]);
      return errors;
    },
    birthdateErrors() {
      const errors = [];
      if (!this.$v.editedItem.birthdate.$dirty) return errors;
      !this.$v.editedItem.birthdate.required &&
        errors.push(this.getLocaleMessages["required_birthdate"]);
      return errors;
    },
    homecountryErrors() {
      const errors = [];
      if (!this.$v.editedItem.homecountry.$dirty) return errors;
      !this.$v.editedItem.homecountry.required &&
        errors.push(this.getLocaleMessages["required_homecountry"]);
      return errors;
    },
    visaTypeErrors() {
      const errors = [];
      if (!this.$v.editedItem.nationality.$dirty) return errors;
      !this.$v.editedItem.nationality.required &&
        errors.push(this.getLocaleMessages["required_visatype"]);
      return errors;
    },
    motifErrors() {
      const errors = [];
      if (!this.$v.editedItem.motif.$dirty) return errors;
      !this.$v.editedItem.motif.required &&
        errors.push(this.getLocaleMessages["required_motif"]);
      return errors;
    },
    ordremissionErrors() {
      const errors = [];
      if (!this.$v.editedItem.ordremission.$dirty) return errors;
      !this.$v.editedItem.ordremission.required &&
        errors.push(this.getLocaleMessages["required_ordremission"]);
      return errors;
    },
    nationalityErrors() {
      const errors = [];
      if (!this.$v.editedItem.nationality.$dirty) return errors;
      !this.$v.editedItem.nationality.required &&
        errors.push(this.getLocaleMessages["required_nationality"]);
      return errors;
    },
    expiredateErrors() {
      const errors = [];
      if (!this.$v.editedItem.expiredate.$dirty) return errors;
      !this.$v.editedItem.expiredate.required &&
        errors.push(this.getLocaleMessages["required_expiredate"]);
      return errors;
    },
    passportnumberErrors() {
      const errors = [];
      if (!this.$v.editedItem.passportnumber.$dirty) return errors;
      !this.$v.editedItem.passportnumber.required &&
        errors.push(this.getLocaleMessages["required_passportnumber"]);
      !this.$v.editedItem.passportnumber.alphaNumAndDotValidator &&
        errors.push(this.getLocaleMessages["caracter_passportnumber"]);
      !this.$v.editedItem.passportnumber.minLength &&
        errors.push(this.getLocaleMessages["min_passportnumber"]);
      !this.$v.editedItem.passportnumber.maxLength &&
        errors.push(this.getLocaleMessages["max_passportnumber"]);
      return errors;
    },
    copypassportErrors() {
      const errors = [];
      if (!this.$v.editedItem.copypassport.$dirty) return errors;
      !this.$v.editedItem.copypassport.required &&
        errors.push(this.getLocaleMessages["required_copypassport"]);
      !regEx.test(this.copypassportfilename) &&
        errors.push(this.getLocaleMessages["file_required"]);
      return errors;
    },
    justificatiflogementErrors() {
      const errors = [];
      if (!this.$v.editedItem.justificatiflogement.$dirty) return errors;
      !this.$v.editedItem.justificatiflogement.required &&
        errors.push(this.getLocaleMessages["required_justificatiflogement"]);
      !regEx.test(this.justificatiflogementfilename) &&
        errors.push(this.getLocaleMessages["file_required"]);
      return errors;
    },
    
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
       menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    expi(val) {
      val && setTimeout(() => (this.activeExpirePicker = "YEAR"));
    },
    copypassport(val) {
      if (val) {
        this.copypassportfilename = this.copypassport.name;
      }
    },
    justificatiflogement(val) {
      if (val) {
        this.justificatiflogementfilename = this.justificatiflogement.name;
      }
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.demands = [
        {
          code_demande: "78EZ7EDD",

         lastname: "Tony Stark",
          firstname: "Tony Stark",
          pays_demande: "Ghana",
          type_visas: "Visa de travail",

          statut_demande: "Validé",
          created_at: "12-04-2022",
        },
        // {
        //   code_demande: "78EZ7EDD",

        //   full_name: "Tony Stark",

        //   pays_demande: "Ghana",
        //   type_visas: "Visa de travail",

        //   statut_demande: "Validé",
        //   created_at: "12-04-2022",
        // },
        // {
        //   code_demande: "78EZ7EDD",

        //   full_name: "Tony Stark",

        //   pays_demande: "Ghana",
        //   type_visas: "Visa de travail",

        //   statut_demande: "Validé",
        //   created_at: "12-04-2022",
        // },
        // {
        //   code_demande: "78EZ7EDD",

        //   full_name: "Tony Stark",

        //   pays_demande: "Ghana",
        //   type_visas: "Visa de travail",

        //   statut_demande: "Validé",
        //   created_at: "12-04-2022",
        // },
      ];
    },
      getColor(statut) {
      if (statut == "Validé" || statut == "Valided") return "green";
      else if (statut == "En cours" || statut == "Pending") return "orange";
      else return "red";
    },
    editItem(item) {
      this.editedIndex = this.demands.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.demands.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.demands.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.demands[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    save_birthdate(date) {
     // this.birthdate = date;
      this.$refs.menu.save(date)
    },
    expi_save(newdate) {
     // this.expiredate = newdate;
      this.$refs.expi.save(newdate)
    },
      async submit() {
    
    },
  },
};
</script>
