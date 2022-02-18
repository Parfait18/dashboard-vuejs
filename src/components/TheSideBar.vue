<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="https://evisacameroun2.webcoom.net/" class="brand-link">
          <img
            src="../../public/logo.png"
            alt="Evisa Logo"
            class="img-circle m-2"
            style="width: 40px; height: 40px"
          />
          <span class="brand-text font-weight-light">Evisa Cameroun</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
          <!-- Sidebar user panel (optional) -->
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              <i
                style="color: white; margin: 10px"
                class="fa fa-user"
                aria-hidden="true"
              ></i>
            </div>
            <div class="info" style="border-radius: 2px; color: white; ">
              <a href="#" class="d-block">User name</a>
            </div>
          </div>

          <!-- Sidebar Menu -->
          
          <nav class="mt-2">


              <ul
              class="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li class="nav-item">
                <a href="/" class="nav-link">
                <i class="fas fa-home"></i>
                  <p> {{$t('link.home')}}
                 
                  </p>
                </a>            
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fa-solid fa-users-gear"></i>
                  <p> {{$t('link.user_role')}}
                  <i class="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="/list-agent" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>{{$t('link.list_agent')}} </p>
                    </a>
                  </li>
                </ul>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="/create-role" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>{{$t('link.create_role')}}</p>
                    </a>
                  </li>
                </ul>
                 
              </li>
           
            
          
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-table"></i>
                  <p>
                    Demandes
                    <i class="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="/list-demands" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>{{$t('link.list_demands')}}</p>
                    </a>
                  </li>
                  
                </ul>
              </li>
             
            </ul>
          </nav>
          <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
      </aside>
    

</template>
<script>
export default {
  name: "TheSidebar",
};
</script>