<template>
  <MainLayout-component>
    <div class="row justify-content-center">
      <div class="mt-5 col-md-12 col-lg-12">
           
        <v-data-table
          :headers="getHeaders"
          :items="demands"
          :search="search"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :items-per-page="5"
          class="elevation-2"
  
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Liste des demandes</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
         
             
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$t('search_text')"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
              <v-dialog content-class="custimize-dialog" 
        transition="dialog-bottom-transition"
        scrollable v-model="dialog"  style='z-index:1500;' max-width="1000px">
                     <v-card >
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
                                  v-model="editedItem.firstname"
                                  required
                                  @blur="$v.editedItem.firstname.$touch()"
                                  name="fristname"
                                  :label="$t('fields.firstname')"
                                  :error-messages="firstnameErrors"
                                ></v-text-field>
                                <v-text-field
                                  v-model="editedItem.lastname"
                                  required
                                  @blur="$v.editedItem.lastname.$touch()"
                                  name="lastname"
                                  :label="$t('fields.lastname')"
                                  :error-messages="lastnameErrors"
                                ></v-text-field>
                                <v-select
                                  v-model="editedItem.gender"
                                  required
                                  item-text="name"
                                  @blur="$v.editedItem.gender.$touch()"
                                  :items="genders"
                                  :label="$t('fields.gender')"
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
                                        :label="$t('fields.birthdate')"
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
                                          Date.now() -
                                            new Date().getTimezoneOffset() *
                                              60000
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
                                  :label="$t('fields.nationality')"
                                  :error-messages="nationalityErrors"
                                >
                                </v-select>
                                <vue-phone-number-input
                                class="mb-5"
                                  default-country-code="CM"
                                  @blur="$v.editedItem.phonenumber.$touch()"
                                  required
                                  v-model="editedItem.phonenumber"
                                  :error-messages="phonenumberErrors"
                                />
                                <v-spacer></v-spacer>
                                <v-select
                                  required
                                  v-model="editedItem.homecountry"
                                  @blur="$v.editedItem.homecountry.$touch()"
                                  filled
                                  :items="countries"
                                  :label="$t('fields.homecountry')"
                                  :error-messages="homecountryErrors"
                                  item-text="nom"
                                  item-value="nom"
                                >
                                </v-select>
                                <v-spacer></v-spacer>
                                <v-select
                                  v-model="editedItem.visatype"
                                  item-text="designation"
                                  item-value="id"
                                  filled
                                  required
                                  @blur="$v.editedItem.visatype.$touch()"
                                  :items="typesvisa"
                                  :label="$t('fields.visatype')"
                                  :error-messages="visaTypeErrors"
                                ></v-select>
                                <v-textarea
                                  v-model="editedItem.motif"
                                  filled
                                  required
                                  @blur="$v.editedItem.motif.$touch()"
                                  :label="$t('fields.motif')"
                                  auto-grow
                                  :error-messages="motifErrors"
                                ></v-textarea>
                                <v-textarea
                                  v-model="editedItem.ordremission"
                                  filled
                                  required
                                  @blur="$v.editedItem.ordremission.$touch()"
                                  :label="$t('fields.ordremission')"
                                  auto-grow
                                  :error-messages="ordremissionErrors"
                                >
                                </v-textarea>
                                
                                <v-text-field
                                  v-model="editedItem.passportnumber"
                                  required
                                  @blur="$v.editedItem.passportnumber.$touch()"
                                  :error-messages="passportnumberErrors"
                                  type="text"
                                  :label="$t('fields.passportnumber')"
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
                                      :label="$t('fields.expiredate')"
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
                                        Date.now() -
                                          new Date().getTimezoneOffset() * 60000
                                      )
                                        .toISOString()
                                        .substr(0, 10)
                                    "
                                    @change="expi_save"
                                  ></v-date-picker>
                                </v-menu>
                                <v-row>
                                  <v-col cols="10">
                                    <v-file-input
                                      required
                                      @blur="
                                        $v.editedItem.copypassport.$touch()
                                      "
                                      v-model="editedItem.copypassport"
                                      :label="$t('fields.copypassport')"
                                      filled
                                      prepend-icon="mdi-camera"
                                      :error-messages="copypassportErrors"
                                    ></v-file-input>
                                  </v-col>
                                  <v-col cols="2">
                                     <viewer style="display: none" :images="images">
                                        <img v-for="src in images" :key="src" :src="src">
                                      </viewer>
   
                                    <v-btn
                                      color="success"
                                      :disabled="stepFour"
                                      @click="show"
                                      >{{ $t("btn.show") }}</v-btn
                                    >
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="10">
                                    <v-file-input
                                      required
                                      @blur="
                                        $v.editedItem.justificatiflogement.$touch()
                                      "
                                      v-model="editedItem.justificatiflogement"
                                      :label="$t('fields.justificatiflogement')"
                                      filled
                                      prepend-icon="mdi-camera"
                                      :error-messages="
                                        justificatiflogementErrors
                                      "
                                    ></v-file-input
                                  ></v-col>
                                  <v-col cols="2">
                                    
                                    <v-btn
                                      color="success"
                                      :disabled="!stepFour"
                                      @click="show"
                                      >{{ $t("btn.show") }}</v-btn
                                    >
                                  </v-col>
                                </v-row>

                    
                         
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
                      Valider
                    </v-btn>
                    <v-btn color="red darken-1" text @click="save">
                      Rejeter
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">{{
                    $t("validations.confirmation_delete")
                  }}</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                                  @click="step = 1"
                                  color="warning"
                                  class="mx-5"
                                  >{{ $t("btn.return") }}</v-btn
                                >
                                <v-btn
                                  color="primary"
                                  class="mx-5"
                                  :disabled="!stepThree"
                                  @click="step = 3"
                                >
                                  {{ $t("btn.next") }}
                                </v-btn>
                           
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
            <v-chip :color="getColor(item.statut_demande)" dark>
              {{ item.statut_demande }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </div>
    </div>
  </MainLayout-component>
</template>
<script>

import moment from "moment";
import 'viewerjs/dist/viewer.css'
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
const nameRegex = helpers.regex(
  "alphaNum",
  /^(?![0-9]+$)[A-Za-z0-9_ -]{1,30}$/i
);

import i18n from "../../i18n";
import MainLayout from "../MainLayout";
export default {
  name: "ListDemands",
  components: {
    "MainLayout-component": MainLayout,
    "vue-phone-number-input": VuePhoneNumberInput,
  },
  mixins: [validationMixin],
  validations: {
    editedItem: {
      firstname: { required, nameRegex },
      lastname: { required, nameRegex },
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
    },
  },
  data: () => ({
    images:[],
    search:null,
    sortBy: "created_at",
    sortDesc: true,
    copypassportfilename: null,
    justificatiflogementfilename: null,
    images:null,
    countries: null,
    typesvisa: null,
    menu: false,
    expi: false,
    sortBy: "created_at",
    sortDesc: true,
    visa: null,
    isLoading: false,
    nationalities: null,
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
      lastname: null,
      gender: null,
      birthdate: null,
      visatype: null,
      homecountry: null,
      motif: null,
      ordremission: null,
      nationality: null,
      expiredate: null,
      phonenumber: null,
      copypassport: null,
      justificatiflogement:null,
      passportnumber: null,
    },
    defaultItem: {},
  }),

  computed: {
    
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
          value: "lastname",
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
        errors.push(i18n.t("required_phonenumber"));
      return errors;
    },
    firstnameErrors() {
      const errors = [];
      if (!this.$v.editedItem.firstname.$dirty) return errors;
      !this.$v.editedItem.firstname.required &&
        errors.push(i18n.t("required_firstname"));
      !this.$v.editedItem.firstname.nameRegex &&
        errors.push(i18n.t("caracter_firstname"));
      return errors;
    },
    lastnameErrors() {
      const errors = [];
      if (!this.$v.editedItem.lastname.$dirty) return errors;
      !this.$v.editedItem.lastname.required &&
        errors.push(i18n.t("required_lastname"));
      !this.$v.editedItem.lastname.nameRegex &&
        errors.push(i18n.t("caracter_lastname"));
      return errors;
    },
    genderErrors() {
      const errors = [];
      if (!this.$v.editedItem.gender.$dirty) return errors;
      !this.$v.editedItem.gender.required &&
        errors.push(i18n.t("required_gender"));
      return errors;
    },
    birthdateErrors() {
      const errors = [];
      if (!this.$v.editedItem.birthdate.$dirty) return errors;
      !this.$v.editedItem.birthdate.required &&
        errors.push(i18n.t("required_birthdate"));
      return errors;
    },
    homecountryErrors() {
      const errors = [];
      if (!this.$v.editedItem.homecountry.$dirty) return errors;
      !this.$v.editedItem.homecountry.required &&
        errors.push(i18n.t("required_homecountry"));
      return errors;
    },
    visaTypeErrors() {
      const errors = [];
      if (!this.$v.editedItem.nationality.$dirty) return errors;
      !this.$v.editedItem.nationality.required &&
        errors.push(i18n.t("required_visatype"));
      return errors;
    },
    motifErrors() {
      const errors = [];
      if (!this.$v.editedItem.motif.$dirty) return errors;
      !this.$v.editedItem.motif.required &&
        errors.push(i18n.t("required_motif"));
      return errors;
    },
    ordremissionErrors() {
      const errors = [];
      if (!this.$v.editedItem.ordremission.$dirty) return errors;
      !this.$v.editedItem.ordremission.required &&
        errors.push(i18n.t("required_ordremission"));
      return errors;
    },
    nationalityErrors() {
      const errors = [];
      if (!this.$v.editedItem.nationality.$dirty) return errors;
      !this.$v.editedItem.nationality.required &&
        errors.push(i18n.t("required_nationality"));
      return errors;
    },
    expiredateErrors() {
      const errors = [];
      if (!this.$v.editedItem.expiredate.$dirty) return errors;
      !this.$v.editedItem.expiredate.required &&
        errors.push(i18n.t("required_expiredate"));
      return errors;
    },
    passportnumberErrors() {
      const errors = [];
      if (!this.$v.editedItem.passportnumber.$dirty) return errors;
      !this.$v.editedItem.passportnumber.required &&
        errors.push(i18n.t("required_passportnumber"));
      !this.$v.editedItem.passportnumber.alphaNumAndDotValidator &&
        errors.push(i18n.t("caracter_passportnumber"));
      !this.$v.editedItem.passportnumber.minLength &&
        errors.push(i18n.t("min_passportnumber"));
      !this.$v.editedItem.passportnumber.maxLength &&
        errors.push(i18n.t("max_passportnumber"));
      return errors;
    },
    copypassportErrors() {
      const errors = [];
      if (!this.$v.editedItem.copypassport.$dirty) return errors;
      !this.$v.editedItem.copypassport.required &&
        errors.push(i18n.t("required_copypassport"));
      !regEx.test(this.copypassportfilename) &&
        errors.push(i18n.t("file_required"));
      return errors;
    },
    justificatiflogementErrors() {
      const errors = [];
      if (!this.$v.editedItem.justificatiflogement.$dirty) return errors;
      !this.$v.editedItem.justificatiflogement.required &&
        errors.push(i18n.t("required_justificatiflogement"));
      !regEx.test(this.justificatiflogementfilename) &&
        errors.push(i18n.t("file_required"));
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
    'editedItem.copypassport'(val) {
      if (val) {
         let url = URL.createObjectURL(val)
         let result = val['name'].includes("https");
         if(result){
            this.images= [val['name'],]
            this.copypassportfilename = val['name'];
         }else{
            this.images= [url,]   
            this.copypassportfilename = val.name;
         }
      
      }
    },
    'editedItem.justificatiflogement'(val) {
      if (val) {
        //   let url = URL.createObjectURL(val)
        //  let result = val['name'].includes("https");
        //  if(result){
        //     this.images= [val['name'],]
        //      this.justificatiflogementfilename = val['name'];
        //  }else{
        //     this.images= [url,]   
        //     this.copypassportfilename = val.name;
        //  }
      }
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      //  const file = new File(['blob'], "https://picsum.photos/250/200", {
      //   lastModified: new Date(2020, 1, 1),
      //   type: "text/jpg"
      // });
      // this.images = ['https://picsum.photos/250/200',]
     // item.copypassport=file 
      this.demands = [
        {
          code_demande: "78EZ7EDD",

          lastname: "Stark",
          firstname: "Tony",
          gender:"f",
          pays_demande: "Ghana",
          type_visas: "Visa de travail",

          statut_demande: "Validé",
          created_at: "12-04-2022",
            birthdate:  "12-04-1995",
          visatype: null,
          homecountry: null,
          motif: "thgzrthezrthetrhertherth",
          ordremission: "drgezrgrgtrtgrtgeztrg",
          nationality: "ezstrhrthrthrthr",
          expiredate:"12-04-2022",
          phonenumber: "222966301160",
          justificatiflogement:"https://picsum.photos/200/200",
          copypassport:"https://picsum.photos/250/200",
          passportnumber: "7375637637568548",
      
        },
     
      ];
    },
    getColor(statut) {
      if (statut == "Validé" || statut == "Valided") return "green";
      else if (statut == "En cours" || statut == "Pending") return "orange";
      else return "red";
    },
    editItem(item) {
      this.editedIndex = this.demands.indexOf(item);
      const file = new File(['blob'], item.copypassport, {
        lastModified: new Date(2020, 1, 1),
        type: "text/jpg"
      });
     item.copypassport=file  
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
        this.demands.push(this.editedItem);
      }
      this.close();
    },
    save_birthdate(date) {
      // this.birthdate = date;
      this.$refs.menu.save(date);
    },
    expi_save(newdate) {
      // this.expiredate = newdate;
      this.$refs.expi.save(newdate);
    },
    show() {
      this.$viewerApi({
        images: this.images,
      });
    },
    async submit() {},
  },
};
</script>
<style scoped>
.custimize-dialog{
 z-index: 33000;
}
</style>