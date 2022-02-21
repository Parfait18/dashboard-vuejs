<template>
    <div class="wrapper" style="margin-top:40px">
    
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">Evisa Dashboard</h1>
              </div>
              <!-- /.col -->
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item active">Evisa Dashboard</li>
                </ol>
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <section class="content">
          <div class="container-fluid">
            <!-- Small boxes (Stat box) -->
            <div class="row">
              <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3 class="text-white">150</h3>

                    <p class="text-white" style="font-size: 20px">Total</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-bag"></i>
                  </div>
                  <a href="#" class="small-box-footer"
                    >More info </a>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-success">
                  <div class="inner">
                    <h3  class="text-white" >53<sup style="font-size: 20px">%</sup></h3>
                       <p class="text-white" style="font-size: 20px">Accepté</p>
                  
                  </div>
                  <div class="icon">
                   <i class="fa-solid fa-check"></i>
                  </div>
                  <a href="#" class="small-box-footer"
                    >More info <i class="fas fa-arrow-circle-right"></i
                  ></a>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-warning">
                  <div class="inner">
                    <h3 class="text-white" >44</h3>

                   <p class="text-white" style="font-size: 20px">Attente</p>
                  </div>
                  <div class="icon">
                   <i class="fa-solid fa-clock"></i>
                  </div>
                  <a href="#" class="small-box-footer"
                    >More info <i class="fas fa-arrow-circle-right"></i
                  ></a>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-danger">
                  <div class="inner">
                    <h3 class="text-white" >65</h3>

                      <p class="text-white" style="font-size: 20px">Rejeté</p>
                  </div>
                  <div class="icon">
                    <i class="fa-solid fa-xmark"></i>
                  </div>
                  <a href="#" class="small-box-footer"
                    >More info <i class="fas fa-arrow-circle-right"></i
                  ></a>
                </div>
              </div>
              <!-- ./col -->
            </div>
            <!-- /.row -->
            <!-- Main row -->
            <div class="row">
              <section class="col-lg-12 connectedSortable">
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
                 :label="$t('fields.search_text')"
                single-line
                hide-details
              ></v-text-field>

              <v-dialog
                content-class="custimize-dialog"
                transition="dialog-bottom-transition"
                scrollable
                v-model="dialog"
                style="z-index: 1500"
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
                            v-model="editedItem.firstname"
                            
                            name="fristname"
                            :label="$t('fields.firstname')"
                          ></v-text-field>
                          <v-text-field
                            v-model="editedItem.lastname"
                            
                            readonly
                            name="lastname"
                            :label="$t('fields.lastname')"
                          ></v-text-field>
                          <v-select
                            v-model="editedItem.gender"
                            
                            item-text="name"
                            readonly
                            :items="genders"
                            :label="$t('fields.gender')"
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
                                  
                                  v-model="editedItem.birthdate"
                                  :label="$t('fields.birthdate')"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="editedItem.birthdate"
                                :active-picker.sync="activePicker"
                                :max="
                                  new Date(
                                    Date.now() -
                                      new Date().getTimezoneOffset() * 60000
                                  )
                                    .toISOString()
                                    .substr(0, 10)
                                "
                                min="1950-01-01"
                              ></v-date-picker>
                            </v-menu>
                          </div>
                          <v-select
                            v-model="editedItem.nationality"
                            
                            item-text="nationalite"
                            :items="nationalities"
                            filled
                            :label="$t('fields.nationality')"
                            readonly
                          >
                          </v-select>
                          <vue-phone-number-input
                            class="mb-5"
                            default-country-code="CM"
                            
                            readonly
                            v-model="editedItem.phonenumber"
                          />
                          <v-spacer></v-spacer>
                          <v-select
                            
                            v-model="editedItem.homecountry"
                            readonly
                            filled
                            :items="countries"
                            :label="$t('fields.homecountry')"
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
                            
                            readonly
                            :items="typesvisa"
                            :label="$t('fields.visatype')"
                          ></v-select>
                          <v-textarea
                            v-model="editedItem.motif"
                            filled
                            
                            readonly
                            :label="$t('fields.motif')"
                            auto-grow
                          ></v-textarea>
                          <v-textarea
                            v-model="editedItem.ordremission"
                            filled
                            
                            readonly
                            :label="$t('fields.ordremission')"
                            auto-grow
                          >
                          </v-textarea>

                          <v-text-field
                            v-model="editedItem.passportnumber"
                            
                            readonly
                            type="text"
                            :label="$t('fields.passportnumber')"
                          >
                          </v-text-field>
                          <v-menu
                            ref="expi"
          
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                 readonly
                                v-model="editedItem.expiredate"
                                :label="$t('fields.expiredate')"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                v-on="on"
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
                            ></v-date-picker>
                          </v-menu>
                          <v-row>
                            <v-col cols="10">
                              <v-file-input
                                
                                disabled
                                v-model="editedItem.copypassport"
                                :label="$t('fields.copypassport')"
                                filled
                                prepend-icon="mdi-camera"
                              ></v-file-input>
                            </v-col>
                            <v-col cols="2">
                              <viewer
                                style="display: none"
                                :images="passport_images"
                              >
                                <img
                                  v-for="src in passport_images"
                                  :key="src"
                                  :src="src"
                                />
                              </viewer>

                              <v-btn color="success" @click="show_passport">{{
                                $t("btn.show")
                              }}</v-btn>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="10">
                              <v-file-input
                       
                                disabled
                                v-model="editedItem.justificatiflogement"
                                :label="$t('fields.justificatiflogement')"
                                filled
                                prepend-icon="mdi-camera"
                            
                              ></v-file-input
                            ></v-col>
                            <v-col cols="2">
                              <viewer
                                style="display: none"
                                :images="logement_images"
                              >
                                <img
                                  v-for="src in logement_images"
                                  :key="src"
                                  :src="src"
                                />
                              </viewer>
                              <v-btn color="success" @click="show_logement">{{
                                $t("btn.show")
                              }}</v-btn>
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
                    <v-btn color="warning" class="mx-5">{{
                      $t("btn.return")
                    }}</v-btn>
                    <v-btn color="primary" class="mx-5">
                      {{ $t("btn.next") }}
                    </v-btn>

                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
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
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
              </section>
               
              <!-- Left col -->
              <section class="col-lg-7 connectedSortable">
                <!-- Custom tabs (Charts with tabs)-->
             
                <!-- /.card -->
              </section>
              <!-- /.Left col -->
              <!-- right col (We are only adding the ID to make the widgets sortable)-->
              <section class="col-lg-5 connectedSortable">
                <!-- Map card -->
            
                <!-- /.card -->
              </section>
              <!-- right col -->
            </div>
            <!-- /.row (main row) -->
          </div>
          <!-- /.container-fluid -->
        </section>
        <!-- /.content -->
      </div>
      <!-- /.content-wrapper -->
    </div>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import { mapGetters } from "vuex";
import i18n from '../i18n';
export default {
  name: "Dashboard",
  props: {
    message: {
      type: String,
    },
  },
  data() {
    return {
        passport_images: [],
    logement_images: [],
    search: null,
    sortBy: "created_at",
    sortDesc: true,
    copypassportfilename: null,
    justificatiflogementfilename: null,
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
      justificatiflogement: null,
      passportnumber: null,
    },
    defaultItem: {},
    };
  },
  created() {
  
    this.initialize();
  },
  components: {
    "vue-phone-number-input": VuePhoneNumberInput,
  },
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
    ...mapGetters(["authenticated"]),
  },
  watch: {
    authenticated(value) {
      if (value === false) {
        this.$router.push("/login");
      }
    },
       dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    
    "editedItem.copypassport"(val) {
      if (val) {
        let result = val["name"].includes("https");
        if (result) {
          this.passport_images = [val["name"]];
          this.copypassportfilename = val["name"];
        } else {
          let url = URL.createObjectURL(val);
          this.passport_images = [url];
          this.copypassportfilename = val.name;
        }
      }
    },
    "editedItem.justificatiflogement"(val) {
      if (val) {
        let result = val["name"].includes("https");
        if (result) {
          this.logement_images = [val["name"]];
          this.justificatiflogementfilename = val["name"];
        } else {
          let url = URL.createObjectURL(val);
          this.logement_images = [url];
          this.justificatiflogementfilename = val.name;
        }
      }
    },
  },
  methods: {
       initialize() {
      this.demands = [
        {
          code_demande: "78EZ7EDD",

          lastname: "Stark",
          firstname: "Tony",
          gender: "f",
          pays_demande: "Ghana",
          type_visas: "Visa de travail",

          statut_demande: "Validé",
          created_at: "12-04-2022",
          birthdate: "12-04-1995",
          visatype: "Visa_de_travail",
          homecountry: "Benin",
          motif: "thgzrthezrthetrhertherth",
          ordremission: "drgezrgrgtrtgrtgeztrg",
          nationality: "ezstrhrthrthrthr",
          expiredate: "12-04-2022",
          phonenumber: "222966301160",
          justificatiflogement: "https://picsum.photos/200/200",
          copypassport: "https://picsum.photos/250/200",
          passportnumber: "7375637637568548",
        },
         {
          code_demande: "78EZ7EDD",

          lastname: "Stark",
          firstname: "Tony",
          gender: "f",
          pays_demande: "Ghana",
          type_visas: "Visa de travail",

          statut_demande: "Pending",
          created_at: "12-04-2022",
          birthdate: "12-04-1995",
          visatype: "Visa_de_travail",
          homecountry: "Benin",
          motif: "thgzrthezrthetrhertherth",
          ordremission: "drgezrgrgtrtgrtgeztrg",
          nationality: "ezstrhrthrthrthr",
          expiredate: "12-04-2022",
          phonenumber: "222966301160",
          justificatiflogement: "https://picsum.photos/200/200",
          copypassport: "https://picsum.photos/250/200",
          passportnumber: "7375637637568548",
        },
         {
          code_demande: "78EZ7EDD",

          lastname: "Stark",
          firstname: "Tony",
          gender: "f",
          pays_demande: "Ghana",
          type_visas: "Visa de travail",

          statut_demande: "",
          created_at: "12-04-2022",
          birthdate: "12-04-1995",
          visatype: "Visa_de_travail",
          homecountry: "Benin",
          motif: "thgzrthezrthetrhertherth",
          ordremission: "drgezrgrgtrtgrtgeztrg",
          nationality: "ezstrhrthrthrthr",
          expiredate: "12-04-2022",
          phonenumber: "222966301160",
          justificatiflogement: "https://picsum.photos/200/200",
          copypassport: "https://picsum.photos/250/200",
          passportnumber: "7375637637568548",
        },
         {
          code_demande: "78EZ7EDD",

          lastname: "Stark",
          firstname: "Tony",
          gender: "f",
          pays_demande: "Ghana",
          type_visas: "Visa de travail",

          statut_demande: "",
          created_at: "12-04-2022",
          birthdate: "12-04-1995",
          visatype: "Visa_de_travail",
          homecountry: "Benin",
          motif: "thgzrthezrthetrhertherth",
          ordremission: "drgezrgrgtrtgrtgeztrg",
          nationality: "ezstrhrthrthrthr",
          expiredate: "12-04-2022",
          phonenumber: "222966301160",
          justificatiflogement: "https://picsum.photos/200/200",
          copypassport: "https://picsum.photos/250/200",
          passportnumber: "7375637637568548",
        },
         {
          code_demande: "78EZ7EDD",

          lastname: "Stark",
          firstname: "Tony",
          gender: "f",
          pays_demande: "Ghana",
          type_visas: "Visa de travail",

          statut_demande: "Rejeté",
          created_at: "12-04-2022",
          birthdate: "12-04-1995",
          visatype: "Visa_de_travail",
          homecountry: "Benin",
          motif: "thgzrthezrthetrhertherth",
          ordremission: "drgezrgrgtrtgrtgeztrg",
          nationality: "ezstrhrthrthrthr",
          expiredate: "12-04-2022",
          phonenumber: "222966301160",
          justificatiflogement: "https://picsum.photos/200/200",
          copypassport: "https://picsum.photos/250/200",
          passportnumber: "7375637637568548",
        },
         {
          code_demande: "78EZ7EDD",

          lastname: "Stark",
          firstname: "Tony",
          gender: "f",
          pays_demande: "Ghana",
          type_visas: "Visa de travail",

          statut_demande: "Validé",
          created_at: "12-04-2022",
          birthdate: "12-04-1995",
          visatype: "Visa_de_travail",
          homecountry: "Benin",
          motif: "thgzrthezrthetrhertherth",
          ordremission: "drgezrgrgtrtgrtgeztrg",
          nationality: "ezstrhrthrthrthr",
          expiredate: "12-04-2022",
          phonenumber: "222966301160",
          justificatiflogement: "https://picsum.photos/200/200",
          copypassport: "https://picsum.photos/250/200",
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
      const passport_file = new File(["blob"], item.copypassport, {
        lastModified : new Date(Date.now()).toISOString().substr(0, 10),
        type: "text/jpg",
      });
      item.copypassport = passport_file;
      const logement_file = new File(["blob"], item.justificatiflogement, {
        lastModified : new Date(Date.now()).toISOString().substr(0, 10),
        type: "text/jpg",
      });
      item.justificatiflogement = logement_file;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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

    show_passport() {
      this.$viewerApi({
        images: this.passport_images,
      });
    },
    show_logement() {
      this.$viewerApi({
        images: this.logement_images,
      });
    },
    
  },
};
</script>
