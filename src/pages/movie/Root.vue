<template>
<div>
    <div class="page" id="movie">
        <app-header title="猫眼电影"></app-header>
        <header class="sub-header">
            <span class="city-icon" @click="goCityList()">{{city}}</span>
            <nav class="nav">
                    <li :class="{active:navIndex==index}" v-for="(navItem,index) in navList"
                    :key="index" @click="navAction(index)">{{navItem}}</li>
            </nav>
            <span class="search-icon" @click="goSearch">
                <img src="@/assets/search.png">
            </span>
        </header>
        <keep-alive>
            <playing v-if="navIndex==0"/>
            <coming v-if="navIndex==1"/>
        </keep-alive>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
import Coming from '@/components/movies/Coming'
import Playing from '@/components/movies/Playing'
import {mapState} from 'vuex'
export default {
    components: {
        'coming': Coming,
        'playing': Playing
    },
    data(){
        return {
            navList: ['正在热映','即将上映'],
            navIndex: 0,  
        }
    },
    computed: {
        ...mapState(['city'])
    },
    methods:{
        navAction(index){
            this.navIndex = index;
        },
        goCityList(){
            this.$router.push('/movie/city-list');
        },
        goSearch(){
            this.$router.push('/cinema/search-cinema');
        }
    },
    
}
</script>

<style lang="scss" scoped>
.sub-header {
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #e6e6e6;
  position: absolute;
  left: 0;
  top: 44px;
  display: flex;
  color: #666;
  font-size: 14px;
  .city-icon {
    flex: 1;
    text-align: center;
    line-height: 44px;
    &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top: 6px solid #666;
      transform: translateY(4px);
    }
  }
  .nav {
    width: 60%;
    display: flex;
    li {
      flex: 1;
      text-align: center;
      line-height: 44px;
      font-weight: bold;
      &.active {
        border-bottom: 2px solid #f03d37;
        color: #f03d37;
      }
    }
  }
  .search-icon {
    flex: 1;
    img {
      width: 24px;
      margin: 10px auto;
    }
  }
}
</style>
