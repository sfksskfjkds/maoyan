<template>
<div class="search_page">
    <div id="search">
        <app-header title="猫眼电影"></app-header>
        <div class="backIcon" @click="backAc">←</div>
        <div class="search_header">
            <div class="search-item">
                <div class="search-img"><img src="@/assets/cinema-search.png"></div>
                <input type="text" class="search-inp" placeholder="搜电影、影院" v-model="inpValue">
            </div>
            <div class="cancel" @click="backAc">取消</div>
        </div>
        <div class="content" v-if="inpValue!=''">
            <ul class="movie_list">
                <p v-if="moviesTotal>0">电影/电视剧/综艺</p>
                <li class="movie_item" v-for="(item,index) in movieList" :key="index">
                    <div class="item_img">
                        <img :src="item.img">
                    </div>
                    <div class="item_content">
                        <div class="title">
                            <p>{{item.nm}}</p>
                            <span class="word" :class="{active:item.sc=='暂无评分'}">
                                {{item.sc}}
                                <b v-if="item.sc!='暂无评分'">分</b>
                            </span>
                        </div>
                        <span class="item_enm">
                            {{item.enm}}
                        </span>
                        <p class="item_cat">
                            {{item.cat}}
                        </p>
                        <p class="item_rt">
                            {{item.rt}}
                        </p>
                    </div>
                </li>
                <div class="moreMovies" v-if="moviesTotal>3">查看全部{{moviesTotal}}部影视剧</div>
            </ul>
            <ul class="cinema_list">
                <h4 v-if="cinemaTotal>0">影院</h4>
                <li class="cinema_item" v-for="(item,index) in cinemaList" :key="index">
                    <div class="cinema_title">
                        <p>{{item.nm}}</p>
                        <span>{{item.sellPrice}}</span>
                        <b>元起</b>
                    </div>
                    <div class="addr">
                        <p>{{item.addr}}</p>
                        <span>{{item.distance}}</span>
                    </div>
                </li>
                <div class="moreMovies" v-if="cinemaTotal>3" @click="moreCinema">查看全部{{cinemaTotal}}家电影院</div>
            </ul>

        </div>
    </div>
    
</div>
</template>

<script>
import { searchMovies } from "@/services/movieServices";
import { mapState } from "vuex";
export default {
  data() {
    return {
      inpValue: "",
      movieList: [],
      cinemaList: [],
      moviesTotal: 0,
      cinemaTotal: 0,
      cinemaListAll:[],
    };
  },
  computed: {
    ...mapState(["cityId"])
  },
  watch: {
    inpValue(newValue) {
      searchMovies(this.inpValue, this.cityId).then(({ movies, cinemas, moviesTotal,cinemaTotal }) => {
        console.log(movies, cinemas, "search");
        movies.map(item=>{
            if(item.sc == 0){
                item.sc = '暂无评分';
            }
        })
        this.cinemaListAll = cinemas;
        cinemas = cinemas.slice(0,3);
        this.movieList = movies;
        this.cinemaList = cinemas;
        this.moviesTotal = moviesTotal;
        this.cinemaTotal = cinemaTotal;
      });
    }
  },
  methods: {
    backAc() {
      this.$router.back();
    },
    moreCinema(){
        this.cinemaList = this.cinemaListAll;
        this.cinemaTotal = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.search_page{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 10;
    background: #fff;
#search {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 11;
  .backIcon {
    position: absolute;
    height: 44px;
    width: 22px;
    color: #fff;
    top: 0;
    left: 0;
    text-align: center;
    line-height: 44px;
    padding: 0 10px;
  }
  .search_header {
    position: absolute;
    top: 44px;
    height: 44px;
    display: flex;
    background: #f5f5f5;
    width: 100%;
    border-bottom: 1px solid gray;
    .search-item {
      width: 80%;
      background: #f5f5f5;
      padding: 8px 5px;
      display: flex;
      justify-content: flex-start;
      .search-img {
        padding: 0 10px;
        border: 1px solid #e6e6e6;
        border-radius: 5px 0 0 5px;
        text-align: center;
        border-right: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        img {
          width: 15px;
          height: 15px;
        }
      }
      .search-inp {
        border: 1px solid #e6e6e6;
        border-radius: 0 5px 5px 0;
        width: 100%;
        border-left: none;
        background: #fff;
      }
    }
    .cancel {
      flex: 1;
      height: 44px;
      line-height: 44px;
      padding: 0 4px;
      font-size: 16px;
      color: #f03d37;
      text-align: center;
    }
  }
  .content {
    position: absolute;
    top: 88px;
    left: 0;
    // background: #f5f5f5;
    width: 100%;
    .movie_list{
        padding-left: 15px;
        .movie_item{
            border-bottom: 1px solid #e6e6e6;
            padding: 12px 0;
            display: flex;
            .item_img{
                width: 64px;
                height: 90px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .item_content{
                flex: 1;
                padding-left: 4px;
                padding-right: 74px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden; 
                .title{
                    font-weight: 700;
                    font-size: 17px;
                    display: flex;
                    p{
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        width: 80%;
                    }
                    .word{
                        flex: 1;
                        color: #fa0;
                        font-size: 16px;
                        b{
                            font-size: 10px;
                        }
                    }
                    .active{
                        flex: 1;
                        font-size: 14px;
                        color: #666;
                    }
                }
                .item_enm{
                    font-size: 13px;
                    color: #666;
                    margin-top: 2px;
                }
                .item_cat{
                    font-size: 13px;
                    color: #666;
                    margin-top: 2px;
                }
                .item_rt{
                    font-size: 13px;
                    color: #666;
                    margin-top: 2px;
                }
            }
        }
        .moreMovies{
            text-align: center;
            color: #f03d37;
        }
    }
    .cinema_list{
        padding-left: 10px;
        .cinema_item{
            border-bottom: 1px solid #e6e6e6;
            padding-top: 12px;
            padding-bottom: 8px;
            .cinema_title{
                display: flex;
                p{
                    width: 80%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                span{
                    font-size: 17px;
                    color: #ef4238;
                }
                b{
                    font-size: 11px;
                    color: #999;
                    line-height: 22px;
                    margin-left: 4px;
                }
            }
            .addr{
                font-size: 13px;
                color: #999;
                display: flex;
                p{
                    width: 80%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                span{
                    flex: 1;
                    margin-left: 6px;
                }
            }
        }
    }
    .moreMovies{
        text-align: center;
        color: #ef4238;
    }
  }
}
}
</style>

