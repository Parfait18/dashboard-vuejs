import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
import Dashboard from '../views/Dashboard'
import CreateRole from '../views/role/CreateRole'
import i18n from '../i18n';
import store from '../store/index';
import ListAgent from '../views/agent/ListAgent'
import ListDemands from '../views/demandes/ListDemands'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/login',
  //   meta: {
  //     title: i18n.t("routes.login"),
  //     middleware: 'guest'
  //   }
  // },
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
    path: "/dashboard/",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: i18n.t("routes.createrole"),
      middleware: 'admin'
    },
  },
  {
    path: "/create-role",
    name: "createrole",
    component: CreateRole,
    meta: {
      title: i18n.t("routes.createrole"),
      middleware: 'admin'
    },
  },
  {
    path: "/create-user",
    name: "register",
    component: Register,
    meta: {
      title: i18n.t("routes.register"),
      middleware: 'admin'
    }
  },
  {
    path: "/list-agent",
    name: "listagent",
    component: ListAgent,
    meta: {
      title: i18n.t("routes.listagent"),
      middleware: 'admin'
    }
  },
  {
    path: "/list-demands",
    name: "listdemands",
    component: ListDemands,
    meta: {
      title: i18n.t("routes.Listdemands"),
      middleware: 'admin'
    }
  }

];

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
    document.title = `E-Visa - ${to.meta.title}`
    store.dispatch('getUser');
    if(to.meta.middleware=="admin"){
     console.log("admin middlewar")
      if(store.getters.authenticated){
        console.log("connecté")
      }else{
        console.log("non connecté")
      }
     next()
    }else if(to.meta.middleware=="guest"){
      console.log("guest middlewar")
      if(store.getters.authenticated){
        console.log("connecté")
      }else{
        console.log("non connecté")
      }
      next()
    }else{
      next()
    }
  }
);
// router.beforeEach((to, from, next) => {
//   document.title = `E-Visa - ${to.meta.title}`
//   store.dispatch('getUser');
//   if(to.meta.middleware=="admin"){
//     if(store.getters.authenticated){
//       console.log(" connecté")
//       next({name:"dashboard"})

//     }else{
//        console.log(" non connecté")
//       next({name:"login"})
//     }  
//   }else{
//     next()
//   }
//   if(to.meta.middleware=="admin"){
//     if(store.getters.authenticated){
//       console.log(" connecté")
//       next({name:"dashboard"})

//     }else{
//        console.log(" non connecté")
//       next({name:"login"})
//     }  
//   }
//   if(to.meta.middleware=="guest"){
//     if(store.getters.authenticated){
//       console.log("je suis connecté")
//       next({name:"dashboard"})

//     }else{
//        console.log("je suis non connecté")
//       next({name:"login"})
//     }  
//   }
// })


export default router
