<template>
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
                          <v-stepper v-model="step">
                            <v-stepper-header>
                              <v-stepper-step :complete="step > 1" step="1">{{
                                $t("title.personal_info")
                              }}</v-stepper-step>

                              <v-divider></v-divider>

                              <v-stepper-step :complete="step > 2" step="2">{{
                                $t("title.visa_info")
                              }}</v-stepper-step>

                              <v-divider></v-divider>

                              <v-stepper-step :complete="step > 3" step="3">{{
                                $t("title.piecesjointes")
                              }}</v-stepper-step>

                              <v-divider></v-divider>
                            </v-stepper-header>
                            <v-stepper-items class="mt-10">
                              <v-stepper-content ref="step1" step="1">
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
                                  default-country-code="CM"
                                  @blur="$v.editedItem.phonenumber.$touch()"
                                  required
                                  v-model="editedItem.phonenumber"
                                  :error-messages="phonenumberErrors"
                                />

                                <v-btn
                                  color="primary"
                                  class="mt-4"
                                  @click="step = 2"
                                  :disabled="stepTwo"
                                  >{{ $t("btn.next") }}</v-btn
                                >
                              </v-stepper-content>
                              <v-stepper-content ref="step2" step="2">
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
                              </v-stepper-content>
                              <v-stepper-content ref="step3" step="3">
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

                                <v-btn
                                  @click="
                                    step = 2;
                                    isLoading = false;
                                  "
                                  class="mx-5"
                                  color="warning"
                                  >{{ $t("btn.return") }}</v-btn
                                >
                                <v-btn
                                  color="success"
                                  :loading="isLoading"
                                  :disabled="!stepFour"
                                  @click="submit"
                                  >{{ $t("btn.valide") }}</v-btn
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
                      Valider
                    </v-btn>
                    <v-btn color="red darken-1" text @click="save">
                      Rejeter
                    </v-btn>
                  </v-card-actions>
                </v-card>
</template>