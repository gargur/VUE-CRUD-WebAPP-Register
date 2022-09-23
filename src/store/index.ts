import Vuex, { StoreOptions } from 'vuex'
import { RootState } from "@/store/types"


const store: StoreOptions<RootState> = {
  state: {
    registers: JSON.parse(localStorage.getItem("register") || '[]'),
    registerEdit: JSON.parse(localStorage.getItem("registerEdit") || '[]'),
    registerHistoric: JSON.parse(localStorage.getItem("registerHistoric") || '[]'),
  },
  getters: {
    sortRegisters(state) {
      return [...state.registers].sort(
        (a: any, b: any) => Number(b.registerDate) - Number(a.registerDate)
      )
    }
  },

  mutations: {
    newRegister(state, payload) {
      state.registers.push(payload)
    },
    newHistoricRegister(state, payload) {
      state.registerHistoric.push(payload)
    },
    editRegister(state, payload) {
      state.registerEdit = payload
    },
    registerExclusion(state, payload) {
      state.registers = payload
    },

  },
  actions: {

  },
  modules: {
  }
}

export default new Vuex.Store<RootState>(store);
/*export default store*/

