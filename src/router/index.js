import Vue from 'vue'
import Router from 'vue-router'

import Cinema from '../pages/cinema/Root'
import Mine from '../pages/mine/Root'
import Movie from '../pages/movie/Root'
import CityList from '../pages/common/CityList'
import SearchCinema from '@/pages/common/Search'
import DetailMovie from '@/pages/movie/DetailMovie'
Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/cinema',
        component: Cinema,
        children: [
          {
            path: 'search-cinema',
            component: SearchCinema
          }
        ]
      },
      {
        path: '/mine',
        component: Mine
      },
      {
        path: '/movie',
        component: Movie,
        children: [
            {
              path: 'city-list',
              component: CityList
            },
            {
              path: 'detail-movie/:movieId/:time',
              component: DetailMovie
            }
        ]
      },
      {
        path: '**',
        redirect:'/movie'
      }  
  ]
})
