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
                    >More info <i class="fas fa-arrow-circle-right"></i
                  ></a>
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
                    <i class="ion ion-stats-bars"></i>
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
                    <i class="ion ion-person-add"></i>
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
                    <i class="ion ion-pie-graph"></i>
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
                 <slot/>
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
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  props: {
    message: {
      type: String,
    },
  },
  data() {
    return {};
  },
  created() {
    this.authenticated;
  },
  components: {},
  computed: {
    ...mapGetters(["authenticated", "langLocal", "isdark"]),
  },
  watch: {
    authenticated(value) {
      if (value === false) {
        this.$router.push("/login");
      }
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
