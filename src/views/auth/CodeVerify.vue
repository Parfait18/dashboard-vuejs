<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex>
        <div class="row justify-content-center">
          <div class="col-md-3 col-lg-3">
            <div class="">
              <v-card class="login-wrap p-5 p-md-5">
                <div class="d-flex">
                  <v-card-title class="w-100 card-title mb-2 justify-center">
                    Code de Vérification
                  </v-card-title>
                </div>
                <div>
                  <div
                    class="ma-auto position-relative"
                    style="max-width: 300px;"
                  >
                    <v-otp-input
                      v-model="otp"
                      :disabled="loading"
                      @finish="onFinish"
                    ></v-otp-input>
                    <v-overlay absolute :value="loading">
                      <v-progress-circular
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                    </v-overlay>
                  </div>

                  <v-snackbar
                    v-model="snackbar"
                    :color="snackbarColor"
                    :timeout="2000"
                  >
                    {{ text }}
                  </v-snackbar>
                </div>
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

import { mapGetters } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      token: null,
      loading: false,
      snackbar: false,
      snackbarColor: 'default',
      otp: '',
      text: '',
      expectedOtp: '133707',
    }
  },
  components: {
    'dashboard-component': Dashboard,
  },
  watch: {
    registered(value, oldvalue) {},
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search)
    this.token = urlParams.get('token')
  },
  computed: {
    ...mapGetters(['errors', 'registered', 'countries', 'langLocal']),
  },
  methods: {
     sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
    async submit() {
      this.isLoading = true
      this.$v.$touch()
      const data = new FormData()
      data.append('role', this.leveltype)

      console.log(data)
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
    async onFinish(rsp) {
      this.loading = true
      await this.sleep(2000);
      await this.$store
        .dispatch('getTokenInfo', rsp)
        .then((response) => {
          console.log(response);
          if (response.success==true) {
             this.snackbarColor = 'success'
              this.text = "Code d'accés valide"
              setTimeout(() => {
                this.snackbar = true
                this.isLoading = false
              }, 2500);         
       
          } else {
            this.snackbarColor = 'warning'
              this.text = "Code d'accés valide"
              setTimeout(() => {
                this.snackbar = true
                this.isLoading = false
              }, 2500);         
          }
         
        })
        .catch((error) => {
          this.loading = false
          console.error(error)
        })
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
.position-relative {
  position: relative;
}
@media (max-width: 700px) {
}
</style>
