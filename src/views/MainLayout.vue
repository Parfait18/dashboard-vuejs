<template>
    <div class="wrapper" style="margin-top:40px">
    
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
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
  name: "MainLayout",
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
