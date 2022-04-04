<template>
  <div class="fixed-top">
    <div class="div-lang text-right">
    <div class="container lang-container">
      <v-btn @click="changeLanguage(item.id)" id="lang-btn" text class="white--text"  v-for="item in languages" :key="item.id">{{ item.langue}}<flag :iso="item.flag" class="white-text" :class="['m-2' ]"/> </v-btn>   
    </div>
    </div>
        <!-- Navbar  v-if="authenticated"-->
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"
              ><i class="fas fa-bars"></i
            ></a>
          </li>
          <!-- <li class="nav-item d-none d-sm-inline-block">
        <a href="/dashboard" class="nav-link">Home</a>
      </li> -->
          <li class="nav-item d-none d-sm-inline-block">
            <v-btn
              class="text-right btn btn-default"
              id="logout"
              @click="logout"
              depressed
              plain
              link
              >{{$t('btn.logout')}}</v-btn
            >
            <!-- <a  :href="logout" class="nav-link">Logout</a> -->
          </li>
        </ul>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" data-widget="fullscreen" href="#" role="button">
              <i class="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
        </ul>
      </nav>
      
      <!-- /.navbar -->
   <!-- <div class="container">
      <nav class="navbar navbar-expand-lg stroke">
          <a class="navbar-brand" href="/">
              <img
                id="img-logo"
                :src="image_perso"/>
                <span class="evisa">e-visa Cameroun </span> 
          </a>
          <button class="navbar-toggler  collapsed bg-gradient" type="button" data-toggle="collapse"
              data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon fa icon-expand fa-bars"></span>
              <span class="navbar-toggler-icon fa icon-close fa-times"></span>  
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02" >
              <ul class="navbar-nav ml-auto">
                  <li class="nav-item" v-bind:class="[currentRouteName=='Home' ? 'active' : '']">
                      <a class="nav-link" href="/">{{ $t('home') }}</a>
                  </li>
                
                   <li class="nav-item" v-bind:class="[currentRouteName=='Demand' ? 'active' : '']" v-if="authenticated">
                      <a class="nav-link" href="/demand">{{ $t('dashboard') }}</a>
                  </li> 
                   <li class="nav-item" v-bind:class="[currentRouteName=='Login' ? 'active' : '']" v-if="!authenticated">
                      <a class="nav-link" href="/login">{{ $t('sign_in') }}</a>
                  </li>
                  
                  <li  class="nav-item" v-bind:class="[currentRouteName=='Logout' ? 'active' : '']" v-if="authenticated">
                      <a class="nav-link" @click="logout">{{ $t('logout') }}</a>
                  </li>  
              </ul>
          </div>
        <div class="mobile-position">
              <nav class="navigation">
                  <div class="theme-switch-wrapper">
                          <div>                              
                                <v-btn text @click="changeTheme" icon>
                                    <v-icon size="19" v-if="isdark == true">fas fa-sun</v-icon>
                                    <v-icon size="19" v-else>fas fa-moon</v-icon>
                                </v-btn>
                          </div>
                  </div>
              </nav>
          </div>
      </nav>
  </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    name: 'TheHeader',

    data: () => ({
      items: [
          {
              title: "Fee Request",
                icon: "mdi-cash-multiple",
                method: () => this.feeRequest()
          },
            {
              title: "Profile",
                icon: "mdi-account-badge-horizontal",
                method: () => this.profile()
            }
        ],
        languages: [
            {   id:0,
                name: "fr",
                flag: "fr",
                langue:"Français"                
            },
            {   id:1,
                name: "en",
                flag: "us",
                langue:"English"
            },
          ],
    }),
    mounted(){
      // console.log(this.authenticated);
    },
    methods :{
       logout(){
        this.$store.dispatch('logout')
       },
        changeLanguage(id){
        this.$store.dispatch('setlanguage',this.languages[id]['name']);
         },
    },
     computed: {
        currentRouteName() {
          return this.$route.name;  
        },
    ...mapGetters(['authenticated'])
}

  }
</script>
<style scoped>
 .div-lang{
    background-color:rgb(37, 51, 114);
    height: 35px;
    padding:0px;
  }
   #lang-btn{
    border: none;
    outline:none;
    font-size:15px;
  }
  .lang-container{
    padding:0px;
    padding-right:10px;
  }

</style>