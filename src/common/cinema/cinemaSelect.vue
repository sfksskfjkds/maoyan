<template>
    <div class="cinemaSelect" :style="showContent?{position:'absolute',top:'0px',width:'100%',left:0,'z-index':100000}:''">
        <ul class="nav">
            <li v-for="(item,index) in navLi" :key="index" @click="clickNav(index)" :class="{navActive:showContent&&navIndex==index,navNormal:!showContent||navIndex!=index}">
                {{item}}
            </li>
        </ul>
        <div class="content" v-if="showContent">
            <ul class="ads">
                <li v-for="(item,index) in adsLi" :key="index" :class="{active:selected==index}" @click="clickAdc(index)">
                    {{item}}
                </li>
            </ul>
            <div class="bus_detail" v-if="selected==0">
                <ul class="detail">
                    <li v-for="(item,index) in cinemaMsg.district.subItems" :key="index" class="detailLi" @click="clickDet(index)" :class="{detActive:detIndex==index}">
                        {{item.name}}({{item.count}})
                    </li>
                </ul>
                <!-- <div> -->
                    <ul class="right_detail" v-for="(item,index) in cinemaMsg.district.subItems" :key="index"  v-if="detIndex==index">
                        <li v-for="(attr,index) in item.subItems" :key="attr.id" :class="{rdActive:rdLiIndex==index}" @click="rdclick(attr.name,index)">
                            <span>{{attr.name}}</span>
                            <span>{{attr.count}}</span>
                        </li>
                    </ul>
                <!-- </div> -->
            </div>
            <div class="bus_detail" v-if="selected==1">
                <ul class="detail">
                    <li v-for="(item,index) in cinemaMsg.subway.subItems" :key="index" class="detailLi" @click="clickDet(index)" :class="{detActive:detIndex==index}">
                        {{item.name}}({{item.count}})
                    </li>
                </ul>
                <ul class="right_detail" v-for="(item,index) in cinemaMsg.subway.subItems" :key="index"  v-if="detIndex==index">
                    <li v-for="(attr,index) in item.subItems" :key="attr.id" :class="{rdActive:rdLiIndex==index}" @click="rdclick(attr.name,index)">
                        <span>{{attr.name}}</span>
                        <span>{{attr.count}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {filterCinemas} from '@/services/cinemaServices'
import {mapState} from 'vuex'
export default {
    name: 'cinema-se',
    data(){
        return {
            navLi: ['全城','品牌','特色'],
            showContent: false,
            adsLi: ['商区','地铁站'],
            selected: 0,
            navIndex: -1,
            district: [],
            subway: [],
            detIndex: 0,
            rdLiIndex: 0
        }
    },
    props: {
        cinemaMsg: Object
    },
    compoted: {
        ...mapState(['cityDetail'])
    },
    methods: {
        clickAdc(index){
            this.selected = index;
        },
        clickNav(index){
            this.showContent = !this.showContent;
            this.navIndex = index;
        },
        clickDet(index){
            this.detIndex = index;
        },
        rdclick(name,index){
            this.rdLiIndex = index;
            if(name!='全部'){
                this.navLi[0] = name;
                this.showContent = false;
            }
        }
    },
    created(){
        console.log(this.cinemaMsg,3333)
        this.district = this.cinemaMsg
    }
}
</script>

<style lang="scss" scoped>
.cinemaSelect{
    background: #fff;
    .nav{
        display: flex;
        border-bottom: 1px solid gainsboro;
        li{
            flex: 1;
            text-align: center;
            height: 40px;
            line-height: 40px;
            font-size: 13px;
            color: #777;
            border-right: 1px solid gainsboro;
            margin-left: 6px;  
        }
        .navNormal{
            &::after{
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border: 4px solid transparent;
                border-top: 4px solid #b0b0b0;
                transform: translateY(2px);
            }
        }
        .navActive{
            color: #e54847;
            &::after{
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border: 4px solid transparent;
                border-bottom: 4px solid #e54847;
                transform: translateY(-2px);
            }
        }
    }
    .content{
        .ads{
            display: flex;
            li{
                flex: 1;
                text-align: center;
                height: 44px;
                line-height: 44px;
                color: #777;
            }
            .active{
                border-bottom: 2px solid #f03d37;
                color: #f03d37;
            }
        }
         .bus_detail{
            display: flex;
            background: #f5f5f5;
            .detail{
                width: 112px;
                .detailLi{
                    height: 44px;
                    padding-left: 10px;
                    line-height: 44px;
                    font-size: 14px;
                    width: 112px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    background: #fff;
                    text-align: center;
                }
                .detActive{
                    color: #f03d37;
                    background: #f5f5f5;
                }
            }
            .right_detail{
                flex: 1;
                li{
                    display: flex;
                    height: 44px;
                    line-height: 44px;
                    font-size: 14px;
                    text-align: center;
                    justify-content: space-around;
                }
                .rdActive{
                    span{
                        color: #e54847;
                    }
                }
            }
        }
       
    }
}
</style>

