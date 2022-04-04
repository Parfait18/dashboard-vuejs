<template>
  <v-app class='main'>
    <TheHeader v-if="authenticated" />
    <TheSideBar v-if="authenticated" />
    <v-main>
      <router-view />
    </v-main>
    <!-- <TheFooter></TheFooter> -->
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data: () => ({
    //
  }),
  mounted() {
      
  },
  methods: {},
  watch: {
    authenticated(value, oldvalue) {
    },
  },
  computed: {
    ...mapGetters(['authenticated']),
  },
}
</script>
<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css';
/* .main{
 background: rgba(39, 44, 89,0.7) !important;
  background: linear-gradient(3deg, #40795D,#AF272D, #EFD62B) !important; 
  } */
</style>
