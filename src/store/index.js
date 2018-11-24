import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: localStorage.getItem('city')?localStorage.getItem('city'):'深圳',
    cityId: localStorage.getItem('CityId')?localStorage.getItem('CityId'):30,
    cityDetail: localStorage.getItem('cityDetail')?localStorage.getItem('cityDetail'):'全城'
  },
  mutations: {
    setCity(state,value){
      state.city = value;
    },
    setCityId(state,value){
      state.cityId = value;
    }
  },
  actions: {
    selectCity(context,params){
      context.commit('setCity',params.city);
      context.commit('setCityId',params.id);
      //全局数据修改后设置本地存储
      localStorage.setItem('city',params.city);
      localStorage.setItem('CityId',params.id);
    }
  }
})
