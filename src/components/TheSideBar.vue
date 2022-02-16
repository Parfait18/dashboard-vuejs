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
                <a href="#" class="nav-link">
                  <i class="fa-solid fa-users-gear"></i>
                  <p>
                    User and Role Controls
                    <i class="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="/list-agent" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Liste des agents</p>
                    </a>
                  </li>
                </ul>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="/create-role" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Céer un rôle</p>
                    </a>
                  </li>
                </ul>
                 
              </li>
              <!-- <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-edit"></i>
                  <p>
                    Forms
                    <i class="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="pages/forms/general.html" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>General Elements</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="pages/forms/advanced.html" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Advanced Elements</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="pages/forms/editors.html" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Editors</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="pages/forms/validation.html" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Validation</p>
                    </a>
                  </li>
                </ul>
              </li> -->
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
                      <p>Listes des demandes</p>
                    </a>
                  </li>
                  <!-- <li class="nav-item">
                    <a href="pages/tables/data.html" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>DataTables</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="pages/tables/jsgrid.html" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>jsGrid</p>
                    </a>
                  </li> -->
                </ul>
              </li>
              <!-- <li class="nav-header">EXAMPLES</li>
              <li class="nav-item">
                <a href="pages/calendar.html" class="nav-link">
                  <i class="nav-icon far fa-calendar-alt"></i>
                  <p>
                    Calendar
                    <span class="badge badge-info right">2</span>
                  </p>
                </a>
              </li> -->
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