<template>
<app-content :style="{top:'88px',bottom:'49px'}" @loadMore="loadMoreData" :canLoadMore="canLoadMore" ref="content">
    <!-- <div class="coming"> -->
        
        <div class="expected">
            <p>近期最受期待</p>
            <h-scroll class="expected-list" @loadExpectedMore="loadExpectedMore" :canLoadMore="canLoadMore">
                <li v-for="item in expectedList" :key="item.id" class="expected-item">
                    <div class="item-img">
                        <img :src="item.img | filterWH(85,115)"/>
                        <span class="wish-item">{{item.wish}}人想看</span>
                    </div>
                    <h5 class="movie-name">{{item.nm}}</h5>
                    <p class="coming-time">{{item.comingTitle}}</p>
                </li>
            </h-scroll>
        </div>

        <div v-for="(list,key) in comingList" :key="key" class="coming-list">
            <p class="coming-time">{{key}}</p>
            <li v-for="item in list" :key="item.id" class="coming-item">
                <div class="item-img">
                    <img :src="item.img | filterWH(128,180)">
                </div>
                <div class="item-content">
                    <h3 class="movie-name">{{item.nm}}</h3>
                    <div class="wish-item">
                        <span class="person">{{item.wish}}</span>
                        <span class="word">人想看</span>
                    </div>
                    <div class="item-star">
                        主演:{{item.star}}
                    </div>
                    <div class="coming-time">
                        {{item.rt}}上映
                    </div>
                </div>
                <div class="coming-btn" :class="{active:item.showst==1}">
                    <button v-if="item.showst==4">预售</button>
                    <button v-if="item.showst==1">想看</button>
                </div>
            </li>
        </div>
    <!-- </div> -->
</app-content>
</template>

<script>
import '../../utils/filter'
import {getComing,getMostExpectedData,getMoreComing} from '../../services/movieServices'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            comingList: {},
            comingIds: [],
            newDataList: [],
            expectedList: [],
            offsetData: 0,
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
        loadExpectedMore(){
            console.log('加载更多')
            this.canLoadMore = false;
            this.offsetData += 10;
            getMostExpectedData({offset:this.offsetData,ci:this.cityId})
            .then((result)=>{
                console.log(result,33)
                 result.coming.map((item)=>{
                item.comingTitle = item.comingTitle.split(' ')[0];
                return result.coming;
            })
            this.expectedList = [...this.expectedList,...result.coming];
            if(this.expectedList.length >= result.paging.total){
                this.canLoadMore = false;
            }else{
                this.canLoadMore = true;
            }
            })
        },
        initData(){
            getComing(this.cityId).then(({data,ids,newData})=>{
            this.comingList = data;
            this.comingIds = ids;
            this.newDataList = newData;
            console.log(this.comingIds,22)
        })
        getMostExpectedData({ci:this.cityId}).then((result=>{
            console.log(result,555)
                result.coming.map((item)=>{
                item.comingTitle = item.comingTitle.split(' ')[0];
                return result.coming;
            })
            this.expectedList = result.coming;
        }))
        },
        loadMoreData(){
            console.log('执行加载更多')
            let ids = [...this.comingIds];
            ids = this.comingIds.splice(this.newDataList.length,10);
            let movieIds = ids.join(',');
            console.log(movieIds)
            this.canLoadMore = false;
            console.log(this.comingList,777)
            getMoreComing({ids:movieIds,ci:this.cityId})
            .then(data=>{
                console.log(data,123456)
                this.comingList = {...this.comingList,...data};
                console.log(this.comingList,789)
                if(this.comingList.length >= this.comingIds.length){
                    this.canLoadMore = false;
                }else{
                    this.canLoadMore = true;
                }
            })
        }
    },
    created(){
        this.initData();
        
    }
}
</script>

<style lang="scss" scoped>
.expected{
    padding: 10px 15px;
    background-color: #fff;
    margin-bottom: 10px;
    .expected-item{
        display: inline-block;
        width: 85px;       
        overflow: hidden;
        padding-right: 10px;
        .item-img{
            position: relative;
            .wish-item{
            position: absolute;
            left: 4px;
            bottom: 2px;
            color: #faaf00;
            font-size: 11px;
            font-weight: 600;
            }
            img{
            width: 100%;
            height: 115px;
            }
        }
        .movie-name{
            margin: 0 0 3px;
            font-size: 13px;
            color: #222;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .coming-time{
            margin: 0;
            font-size: 12px;
            color: #999;
        }
        
    }
}
.coming-list{
    padding: 12px 14px 12px 0;
    width: 100%;
    .coming-time{
        padding: 12px 15px 0;
        margin: 0;
        font-size: 14px;
        color: #333;
    }
    .coming-item{
        width: 100%;
        display: flex;
        padding: 12px 15px 0;
        position: relative;
        .item-img{
            width: 64px;
            height: 90px;
            margin-right: 10px;
            img{
                width: 64px;
                display: block;
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
                background-color: #faaf00;
            }
        }
    }
}
</style>


