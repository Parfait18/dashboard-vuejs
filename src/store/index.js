import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '../i18n'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authenticated: false,
    verifycode: false,
    registered: false,
    user: {},
    errors: {},
    countries: null,
    globalError: false,
    isdark: false,
  },
  getters: {
    authenticated(state) {
      return state.authenticated
    },
    verifycode(state) {
      return state.verifycode
    },
    user(state) {
      return state.user
    },
    registered(state) {
      return state.registered
    },

    errors(state) {
      return state.errors
    },
    countries(state) {
      return state.countries
    },
    langLocal(state) {
      return state.langLocal
    },
    globalError(state) {
      return state.globalError
    },
    isdark(state) {
      return state.isdark
    },
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value
    },
    SET_VERIFYCODE(state, value) {
      state.verifycode = value
    },
    SET_REGISTERED(state, value) {
      state.registered = value
    },
    SET_USER(state, value) {
      state.user = value
    },
    SET_ERRORS(state, value) {
      state.errors = value
    },
    CLEAR_ERRORS(state) {
      state.errors = {}
    },
    SET_COUNTRIES(state, value) {
      state.countries = value
    },
    SET_GLOBAL_ERROR(state, value) {
      state.globalError = value
    },
    SET_LANGLOCAL(state, value) {
      state.langLocal = value
      i18n.locale = state.langLocal
    },
    SET_ISDARK(state, value) {
      state.isdark = value
    },
  },
  actions: {
    async clear({ commit }) {
      commit('CLEAR_ERRORS')
    },
    async register({ commit }, payload) {
      await axios.get('sanctum/csrf-cookie')
      try {
        let response = await axios.post('backoffice/agents', payload)
        commit('SET_REGISTERED', true)
      } catch (e) {
        console.log(e)
      }
    },
    async login({ commit }, payload) {
      await axios.get('sanctum/csrf-cookie')
      try {
        let response = await axios.post('backoffice/login', payload)
        if (response.data.success==true) {
            console.log("commit")
            commit('SET_VERIFYCODE', true)
          // commit('SET_USER', response.data)
          // commit('SET_AUTHENTICATED', true)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async logout({ commit }) {
      await axios.get('sanctum/csrf-cookie')
      try {
        let response = await axios.post('backoffice/logout')
        console.log(response)
        if (response.status >= 200 && response.status <= 299) {
          commit('SET_USER', {})
          commit('SET_AUTHENTICATED', false)
          this.$router.push('/login')
        } else {
          commit('SET_ERRORS', response.data)
        }
      } catch (error) {
        commit('SET_ERRORS', error)
        commit('SET_AUTHENTICATED', false)
        console.log(error)
      }
    },
    async getcountries({ commit }) {
      await axios.get('sanctum/csrf-cookie')
      try {
        let response = await axios.get('api/paysorigine')
        let countries = response.data
        console.log(countries)
        commit('SET_COUNTRIES', countries)
      } catch (e) {
        console.log(e)
      }
    },
    async setlanguage({ commit }, payload) {
      commit('SET_LANGLOCAL', payload)
    },
    async getUser({ commit }) {
      await axios.get('sanctum/csrf-cookie')
      let response = await axios.get('/api/me')
      let { connected } = response.data
      commit('SET_AUTHENTICATED', connected)
    },
    // async createrole({ commit }) {
    //   await axios.get('sanctum/csrf-cookie')
    //   let response = await axios.get('backoffice/roles')
    //   return response.data
    // },
    async getRoles({ commit }) {
      await axios.get('sanctum/csrf-cookie')
      let response = await axios.get('backoffice/roles')
      return response.data
    },
    async getUnites({ commit }) {
      await axios.get('sanctum/csrf-cookie')
      let response = await axios.get('')
      return response.data
    },
    async getTokenInfo({ commit }, payload) {
      await axios.get('sanctum/csrf-cookie')
      try {
        const formdata = new FormData()
        formdata.append('code', payload)
        let response = await axios.post('backoffice/code_login', formdata)
        return response.data
      } catch (e) {
        console.log(e)
      }
    },
  },
  plugins: [createPersistedState()],
  modules: {},
})

export default store
