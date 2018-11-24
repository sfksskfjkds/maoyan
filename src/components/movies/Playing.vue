<template>
<app-content :style="{top:'88px',bottom:'49px'}" @loadMore="loadMoreData" :canLoadMore="canLoadMore" ref="content">
    <ul class="playing">
        <li class="playing-item" v-for="item in playingList" :key="item.id" @click="goToDetail(item.id)">
            <div class="item-img">
                <img :src="item.img">
            </div>
            <div class="item-content">
                <h4>{{item.nm}}</h4>
                <div class="wish-item">
                    <span class="word">观众评</span>
                    <span class="person">{{item.sc}}</span>
                </div>
                <div class="item-star">
                    主演:{{item.star}}
                </div>
                <div class="coming-time">
                    {{item.showInfo}}
                </div>
            </div>
            <div class="coming-btn" :class="{active:item.globalReleased}">
                <button v-if="item.globalReleased==false">预售</button>
                <button v-if="item.globalReleased==true">购票</button>
            </div>
        </li>
    </ul>
</app-content>
</template>

<script>
import {getPlaying,getMorePlaying} from '@/services/movieServices'
import {mapState} from 'vuex'
export default {
    name:"playing",
    data(){
        return {
            playingList: [],
            playingIDS: [],
            canLoadMore: true
        }
    },
    computed: {
        ...mapState(['cityId'])
    },
    watch: {
        cityId(){
            this.initData();
        }
    },
    methods: {
        loadMoreData(){
            console.log('执行加载更多')
            let ids = [...this.playingIDS];
            ids = this.playingIDS.splice(this.playingList.length,10);
            let movieIds = ids.join(',');
            this.canLoadMore = false;
            getMorePlaying(movieIds)
            .then(data=>{
                console.log(data)
                this.playingList = [...this.playingList,...data];
                if(this.playingList.length >= this.playingIDS.length){
                    this.canLoadMore = false;
                }else{
                    this.canLoadMore = true;
                }
            })
        },
        initData(){
            getPlaying({ci:this.cityId}).then(({data,ids})=>{
                this.playingList = data;
                this.playingIDS = ids;
            });
        },
        goToDetail(movieId){

            this.$router.push(`/movie/detail-movie/${movieId}/${Date.now()}`);

        }
    },
    created(){
        this.initData()
    }
}
</script>

<style lang="scss" scoped>
.playing-item{
    width: 100%;
    padding: 12px 14px;
    display: flex;
    position: relative;
    .item-img{
        width: 64px;
        margin-right: 10px;
        img{
            width: 100%;
        }
    }
    .item-content{
        flex: 1;
        padding-right: 5px;
        margin-right: 60px;
        overflow: hidden;
        .movie-name{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 17px;
            color: #333;
            font-weight: 700;
            padding-right: 5px;
        }
        .wish-item{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .person{
                color: #faaf00;
                font-size: 15px;
                font-weight: 600;
                line-height: 20px;
            }
            .word{
                font-size: 13px;
                margin-left: -2px;
                display: inline-block;
                color: #666;
            }
        }
        .item-star{
            font-size: 13px;
            color: #666;
            margin-top: 6px;
            line-height: 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .coming-time{
            font-size: 13px;
            color: #666;
            line-height: 15px;
        }
    }
    .coming-btn{
        width: 47px;
        position: absolute;
        right: 45px;
        top: 39px;
        display: flex;
        justify-content: center;
        button{
            width: 47px;
            height: 27px;
            line-height: 28px;
            text-align: center;
            color: #fff;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            background-color: #3c9fe6;
            border: none;
        }
    }
    .active{
        button{
            background-color: #f03d37;
        }
    }
}
</style>

