<template>
  <v-app>
  <TheHeader/> 
  <TheSideBar/> 
    <v-main>
      <router-view/>
    </v-main>  
    <!-- <TheFooter></TheFooter> -->
  </v-app>
  
  

</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>

@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css";
</style>