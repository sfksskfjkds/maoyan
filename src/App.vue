<template>
  <div id="app">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
      <tabs v-model="selecIndex">
          <tab-item v-for="tabItem in tabList" :key="tabItem.name" :name="tabItem.name"></tab-item>
      </tabs>
  </div>
</template>
<script>
export default {
  data(){
    return {
      selecIndex: 0,
      tabList:[
        {name:'电影',path:'/movie'},
        {name:'影院',path:'/cinema'},
        {name:'我的',path:'/mine'}
      ]
    }
  },
  watch:{
    selecIndex(newValue){
      console.log('selecIndex变成了',newValue);
      this.$router.push(this.tabList[newValue].path)
    }
  }
}
</script>

<style lang="scss">

</style>
