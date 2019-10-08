import axios from 'axios'

export const state = () => {
  return {
    authUser: null
  }
}

export const mutations = {
    SET_USER (state, user) {
      state.authUser = user
    }
}

export const actions = {
  async getUserInfo({ commit }) {
    const { data } = await axios.post('/api/userInfo');
    commit('SET_USER', data.data)
    return data;
  },

  async login ({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/api/login', { username, password })
      if (data.code === 200) {
          commit('SET_USER', data.data)
          return data;
      }
      else throw "login err"
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    const { data } = await axios.post('/api/logout')
    commit('SET_USER', null)
    return data;
  },

  async pay ({ commit }, param) {
    const { data } = await axios.post('/api/pay', param)
    if (data.code === 200) {
      if (Number(data.data.ret_code) === 0 && data.data.gateway_url)  window.location.href = data.data.gateway_url
    }
  }
}
