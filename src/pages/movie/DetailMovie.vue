<template>
    <div class="detail-movie">
        <app-header :title="movieTitle">
            <span slot="left" @click="back">
                返回
            </span>
        </app-header>
        <div class="detail-content">
            <div class="banner">
                <div class="movie_img">
                    <img :src="movieMsg.img">
                </div>
                <div class="movie_describle">
                    <h3 class="movie_nm">
                        {{movieMsg.nm}}
                    </h3>
                    <p class="enm">{{movieMsg.enm}}</p>
                    <p class="score">
                        {{movieMsg.sc}}
                        <span>({{movieMsg.snum}}人评)</span>
                    </p>
                    <p class="cat">
                        {{movieMsg.cat}}
                    </p>
                    <p class="src_dur">
                        {{movieMsg.src}}/{{movieMsg.dur}}分钟
                    </p>
                    <p class="pubDesc">
                        {{movieMsg.pubDesc}}
                    </p>
                </div>
                <div class="next_page">
                    
                </div>
            </div>
            <h-scroll class="time_scroll">
                <li class="playing_time" v-for="(item,index) in timeList" :key="index" @click="selectTime(index)" :class="{active:selected==index}">
                    {{item}}
                </li>
            </h-scroll>
            <cinema-se :cinemaMsg="cinemaData">



            </cinema-se>
            <ul class="cinemaList">
                <li v-for="(item,index) in cinemas" :key="index">
                    <p>
                        {{item.nm}}
                        <span class="price">
                            {{item.sellPrice}}
                            <span class="word">元起</span>
                        </span>
                    </p>
                    <p class="ads">{{item.addr}}</p>
                    <p class="cardPromotion">{{item.promotion.cardPromotionTag}}</p>
                    <p class="showTimes">近期场次:&nbsp; {{item.showTimes}}</p>
                    <div class="distance">
                        {{item.distance}}
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
import {movieDetail} from '@/services/movieServices'
import {getTime} from '@/services/appServices'
import '@/utils/filter'
import {mapState} from 'vuex'
import {filterCinemas} from '@/services/cinemaServices'
export default {
    data(){
        return {
            movieTitle: '猫眼电影',
            movieMsg: {},
            timeList: [],
            selected: 0,
            week: ['周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四'],
            cinemaData: {},
            cinemas: []       
        }
    },
    computed: {
        ...mapState(['cityId'])
    },
    methods: {
        back(){
            this.$router.back()
        },
        selectTime(index){
            this.selected = index;
        }
    },
    created(){
        let _this = this;
        let movieId = this.$route.params.movieId;
        let date = new Date();
        let today = date.getDay();
       
        // this.week[today]
        
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let dayTime = `${year}-${month}-${day}`;
        let reqId = this.$route.params.time;
        let timeArr = [];
        movieDetail(movieId).then(function(data){
                console.log(data,'detail')
                _this.movieTitle = data.detailMovie.nm;
                _this.movieMsg = {...data.detailMovie};
            })
        getTime({movieId:movieId,day:dayTime,reqId:reqId,cityId:this.cityId}).then(data=>{
            console.log(data,'time')
            this.cinemas = data.cinemas;
            let dates = data.showDays.dates;
            console.log(dates);
            dates.map(item=>{
                let arr = item.date.split('-');
                timeArr.push(`${arr[1]}月${arr[2]}日`);
            })
            let newArr = ['今天','明天','后天',_this.week[today+3],_this.week[today+4],_this.week[today+5],_this.week[today+6]];
            for(let j = 0;j < 7;j++){
                _this.timeList.push(newArr[j] + timeArr[j]);
            }
        })
        filterCinemas({movieId:movieId,day:dayTime}).then(data=>{
            console.log(data,54321)
            this.cinemaData = data;
        })
    }
}
</script>

<style lang="scss" scoped>
.detail-movie{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: lightcoral;
    bottom: 0;
    z-index: 12;
    .detail-content{
        position: absolute;
        top: 44px;
        left: 0;
        width: 100%;
        .banner{
            padding: 19px 30px 19px 15px;
            display: flex;
            background: #333;
            // width: 100%;
            .movie_img{
                width: 110px;
                height: 150px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .movie_describle{
                flex: 1;
                margin-left: 10px;
                color: aliceblue;
                .movie_nm{
                    font-size: 20px;
                    font-weight: 700;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .enm,.cat,.src_dur,.pubDesc{
                    margin-top: 6px;
                    font-size: 12px;
                    color: #fff;
                    opacity: .8;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .score{
                    font-size: 18px;
                    font-weight: 700;
                    color: #fc0;
                    margin-top: 10px;
                    span{
                        font-size: 12px;
                        color: #fff;
                        opacity: .8;
                    }
                }
            }
            .next_page{
                position: absolute;
                right: 15px;
                line-height: 150px;
                color: #fff;
                &::after{
                    content: "";
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border: 2px solid white;
                    background: transparent;
                    transform: rotate(45deg);
                    border-left: none;
                    border-bottom: none;
                    opacity: 0.5;
                }
            }
        }
        .time_scroll{
            background: #fff;
            .playing_time{
                height: 42px;
                display: inline-block;
                margin-left: 8px;
                width: 116px;
                text-align: center;
                line-height: 42px;
                // overflow: hidden;
                position: relative;
            }
            .active{
                color: red;
                border-bottom: 2px solid red;
            }
        }
        .cinemaList{
            background: #fff;
            padding: 10px;
            li{
                border-bottom: 1px solid lightgray;
                padding-bottom: 10px;
                position: relative;
                line-height: 20px;
                padding-top: 10px;
                p:nth-child(1){
                    line-height: 23px;
                    font-size: 16px;
                    color: #000;
                    .price{
                        color: #f03d37;
                        font-size: 18px;
                        .word{
                            font-size: 11px;
                        }
                    }
                }
                .ads{
                    font-size: 13px;
                    color: #666;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    padding-right: 50px;
                }
                .cardPromotion{
                    font-size: 11px;
                    color: #999;
                }
                .showTimes{
                    font-size: 12px;
                    color: #999;
                }
                .distance{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 6px;
                    color: #666;
                    font-size: 13px;
                }
            }
        }
    }

}
</style>

