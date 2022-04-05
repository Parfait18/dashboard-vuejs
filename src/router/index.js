import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/auth/Login'
import CodeVerify from '@/views/auth/CodeVerify'
// import CodeVerify from '@/views/auth/Register'ResetPassword
import ResetPassword from '@/views/auth/ResetPassword'
import ListTraitPost from '../views/post-traitement/ListTraitPost'
import ListTraitUnit from '../views/post-traitement/ListTraitUnit'
import Dashboard from '../views/Dashboard'
import CreateRole from '../views/role/CreateRole'
import i18n from '../i18n';
import store from '../store/index'
import ListAgent from '../views/agent/ListAgent'
import ListDemands from '../views/demandes/ListDemands'
Vue.use(Router)

const routes = [
  {
    path: "/",
    name: "home",
    component: Dashboard,
    meta: {
      title: i18n.t("routes.dashboard"),
      middleware: 'auth'
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: i18n.t("routes.login"),
      middleware: 'guest'
    }

  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: i18n.t("routes.dashboard"),
      middleware: 'auth'
    },
  },
  {
    path: "/create-role",
    name: "createrole",
    component: CreateRole,
    meta: {
      title: i18n.t("routes.createrole"),
      middleware: 'auth'
    },
  },
  {
    path: "/list-agent",
    name: "listagent",
    component: ListAgent,
    meta: {
      title: i18n.t("routes.listagent"),
      middleware: 'auth'
    }
  },
  {
    path: "/list-demands",
    name: "listdemands",
    component: ListDemands,
    meta: {
      title: i18n.t("routes.listdemands"),
      middleware: 'auth'
    }
  },
  {
    path: "/verify-code",
    name: "codeverify",
    component: CodeVerify,
    meta: {
      title:"codeverify",
      middleware: 'auth'
    }
  },
  {
    path: "/reset-password",
    name: "resetpassword",
    component: ResetPassword,
    meta: {
      title:"resetpassword",
      middleware: 'auth'
    }
  },
  {
    path: "/list-trait-unit",
    name: "list-trait-unit",
    component: ListTraitUnit,
    meta: {
      title:"ist-trait-unit",
      middleware: 'auth'
    }
  },
  {
    path: "/list-trait-post",
    name: "list-trait-post",
    component: ListTraitPost,
    meta: {
      title:"list-trait-post",
      middleware: 'auth'
    }
  }


];

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to, from, next) => {
//     document.title = `E-Visa - ${to.meta.title}`
//     store.dispatch('getUser');
 
//     if(to.meta.middleware=='auth'){
//       if(store.state.authenticated){
//         next()
//       }else{  
//         next({name:'login'})
//       }  
//     }else if(to.meta.middleware=='guest'){
//       if(store.state.authenticated){
//         next({name:'dashboard'})   
//       }else{ 
//         next()       
//       }   
//     }
//     else {
//       next()
//     }
//   }
// );

export default router
