import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import $ from '@/apis'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const state = {
  token: Cookies.get('Kindless-Token')
}

const getters = {
  authorized: state => {
    return state.token && state.token !== ''
  },
  token: state => {
    return state.token
  }
}

const mutations = {
  setToken: (state, token) => {
    state.token = token
    if (token) {
      Cookies.set('Kindless-Token', token)
    } else {
      Cookies.remove('Kindless-Token')
    }
  }
}

const actions = {
  login: function ({ commit }, data) {
    return new Promise((resolve, reject) => {
      $.login(data.username, data.password)
        .then(response => {
          commit('setToken', response.token)
          resolve(response)
        })
        .catch(error => {
          console.log('response failure')
          reject(error)
        })
    })
  },
  logout: function ({ commit }, data) {
    return new Promise((resolve, reject) => {
      $.logout()
        .then(response => {
          commit('setToken', null)
          resolve()
        })
        .catch(error => {
          console.log('response failure')
          reject(error)
        })
    })
  }
}

const store = new Vuex.Store({
  state,
  modules: {
    user
  },
  actions,
  getters,
  mutations
})

export default store
