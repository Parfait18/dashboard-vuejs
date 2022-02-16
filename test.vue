<template>
  <v-container row justify-center align-center class="mx-auto mt-1">
    <v-flex xs12 sm12 md12 lg12 xl12>
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

            <v-stepper-step :complete="isOkay">Payment</v-stepper-step>
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
              <v-btn @click="new_demand = false" class="mx-5 m-5" color="error"
                >{{ $t("close_btn") }}
              </v-btn>
              <v-btn
                color="primary"
                @click="
                  step = 2;
                  goto('step2');
                "
                :disabled="stepTwo"
                >{{ $t("next_btn") }}</v-btn
              >
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
              <v-btn
                @click="
                  step = 1;
                  goto('step1');
                "
                color="warning"
                class="mx-5"
                >{{ $t("return_btn") }}</v-btn
              >
              <v-btn
                color="primary"
                class="mx-5"
                :disabled="stepThree"
                @click="
                  step = 3;
                  goto('step3');
                "
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
                  goto('step2');
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
</template>