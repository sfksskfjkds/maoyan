<template>
    <div class="page" id="cinema">
        <app-header title="影院"></app-header>
        <header class="sub-header">
            <span class="city-icon" @click="goCityList()">{{city}}</span>
            <div class="search_inp" @click="goSearch">
                <img src="@/assets/cinema-search.png">
                <span>搜影院</span>
            </div>
        </header>
        <cinema-se :style="{position:'absolute',top:'88px',left:0,width:'100%','z-index':100}" :cinemaMsg="cinemaData">


                
        </cinema-se>
        <app-content :style="{top:'128px',bottom:'49px'}">
            <ul class="city_list">
                <li class="city_item" v-for="(item,index) in cinemaList" :key="index">
                    <h4 class="cinema_title">
                        {{item.nm}}
                        <span class="price">{{item.sellPrice}}</span>
                        <span class="word">元起</span>
                    </h4>
                    <div class="cinema_addr">
                        <span class="addr">{{item.addr}}</span>
                        <span class="position">{{item.distance}}</span>
                    </div>
                    <div class="discount" v-if="item.promotion.cardPromotionTag">
                        <img src="@/assets/card.png" >
                        <span class="discount_msg">{{item.promotion.cardPromotionTag}}</span>
                    </div>
                </li>
            </ul>
        </app-content>
        <router-view/>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {getCinemaList} from '@/services/cinemaServices'
import {filterCinemas} from '@/services/appServices'
export default {
    data(){
        return {
            cinemaList: [],
            cinemaData: {}
        }
    },
    computed: {
        ...mapState(['city','cityId'])
    },
    methods: {
        goCityList(){
            this.$router.push('/movie/city-list')
        },
        goSearch(){
            this.$router.push('/cinema/search-cinema')
        }
    },
    created(){
        getCinemaList(this.cityId).then(result=>{
            console.log(result)
            this.cinemaList = result;
        })
        filterCinemas(this.cityId).then(result=>{
            this.cinemaData = result;
            console.log(result,'result')
        })
        
    }
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
  align-items: center;
  color: #666;
  font-size: 14px;
  background: #f5f5f5;
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
  .search_inp {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 44px;
        outline: none;
        height: 28px;
        font-size: 13px;
        color: #b2b2b2;
        margin-left: 18px;
        border: .5px solid #e6e6e6;
        border-radius: 5px;
        margin-right: 15px;
        background-color: #fff;
        &.active {
        border-bottom: 2px solid #f03d37;
        color: #f03d37;
        }
        span{
            text-align: center;
        }
        img{
            width: 14px;
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
.city_list{
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    .city_item{
        padding-top: 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid #777;
        .cinema_title{
            height: 23px;
            line-height: 23px;
            font-size: 16px;
            color: #000;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-weight: normal;
            .price{
                font-size: 18px;
                color: #f03d37;
            }
            .word{
                font-size: 11px;
                color: #f03d37;
                margin-left: 3px;
            }
        }
        .cinema_addr{
            margin-top: 6px;
            font-size: 13px;
            color: #666;
            display: flex;
            justify-content: space-between;
            .addr{
                font-size: 13px;
                color: #666;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .position{
                font-size: 13px;
                color: #666;
            }
        }
        .discount{
            display: flex;
            justify-content: flex-start;
            padding-top: 10px;
            img{
                width: 15px;
                height: 14px;
            }
            .discount_msg{
                margin-left: 4px;
                font-size: 11px;
                color: #999;
            }
        }
    }
}
</style>

