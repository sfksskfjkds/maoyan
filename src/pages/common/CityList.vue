<template>
    <div id="city-list" class="page">
        <app-content :style="{top: 0, bottom: 0}" ref="content">
            <header ref="header">
                <div class="locate_city">
                    <p>定位城市</p>
                    <div class="show_locate_city">
                        {{city}}
                    </div>
                </div>
                <div class="history">
                    <p>最近访问的城市</p>
                    <div class="show_locate_city">
                        {{city}}
                    </div>
                </div>
                <div class="hostCity">
                    <p>热门城市</p>
                    <div class="show_hot_city">
                        <li v-for="(value,key) in cityList" :key="key" class="city_item" @click="setCityAction(key)">{{key}}</li>
                    </div>
                </div>
            </header>
            <div v-for="cityMap in data" :key="cityMap.key" ref="list" class="cityList">
                <h5 class="title">{{cityMap.key.toUpperCase()}}</h5>
                <ul class="ul_item">
                    <li v-for="item in cityMap.value" :key="item.id" @click="selectCityAction(item)" class="cityList_item">
                        {{item.nm}}
                    </li>
                </ul>
            </div>
        </app-content>
        <nav class="nav-bar">
            定位<br>
            最近<br>
            热门<br>
            <li v-for="(item,index) in keys" :key="index" class="nav-item" @click="btnAction(index)">
                {{item.toUpperCase()}}
            </li>
        </nav>
    </div>
</template>

<script>
import {getCityListData} from '../../services/appServices'
import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return {
            data: [],
            keys: [],
            cityList: {
                '上海':10,
                '北京':1,
                '广州':20,
                '深圳':30,
                '武汉':57,
                '天津':40,
                '西安':42,
                '南京':55,
                '杭州':50
            }
        }
    },
    computed: {
        ...mapState(['city'])
    },
    methods: {
        ...mapActions(['selectCity']),
        selectCityAction(item){
            this.selectCity({
                city: item.nm,
                id: item.id
            })
            this.$router.back()
        },
        setCityAction(value){
             this.selectCity({
                city: value,
                id: this.cityList[value]
            })
            this.$router.back()
        },
        btnAction(index){
            //计算滚动高度
            let height = 0 + this.$refs.header.offsetHeight;
            for(let i = 0; i < index; i++){
                height += this.$refs.list[i].offsetHeight;
            }
            console.log(height)
            this.$refs.content.scrollTo(height);
        }
    },
    created(){
        getCityListData().then(({data,keys})=>{
            this.data = data;
            this.keys = keys;
        })
    }
}
</script>

<style lang="scss" scoped>
#city-list{
    background: #ebebeb;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    font-size: 14px;
    color: #333;
    header{
        .locate_city{
            padding-left: 5px;
            p{
                padding-left: 15px;
                padding-top: 5px;
                padding-bottom: 5px;
                line-height: 30px;
                background-color: #ebebeb;
                font-size: 14px;
                color: #333;
            }
            .show_locate_city{
                background-color: #fff;
                font-size: 14px;
                color: #333;
                padding: 5px 30px;
                text-align: center;
                float: left;
            }
        }
        .history{
            padding-left: 5px;
            p{
                padding-left: 15px;
                padding-top: 5px;
                padding-bottom: 5px;
                line-height: 30px;
                background-color: #ebebeb;
                font-size: 14px;
                color: #333;
                clear: both;
            }
            .show_locate_city{
                background-color: #fff;
                font-size: 14px;
                color: #333;
                padding: 5px 30px;
                text-align: center;
                float: left;
                clear: both;
            }
        }
        .hostCity{
            clear: both;
            padding-left: 5px;
            p{
                padding-left: 15px;
                padding-top: 5px;
                padding-bottom: 5px;
                line-height: 30px;
                background-color: #ebebeb;
                font-size: 14px;
                color: #333;
                clear: both;
            }
            .show_hot_city{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                clear: both;
                padding-right: 30px;
                .city_item{
                    background-color: #fff;
                    font-size: 14px;
                    color: #333;
                    padding: 5px 30px;
                    text-align: center;
                    margin-left: 8px;
                    margin-top: 16px;
                }
            }
        }
    }
    .cityList{
        clear: both;
        .ul_item{ 
            .cityList_item{
                padding-left: 10px;
                padding-top: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #c8c7cc;
            }

        }
        .title{
            background-color: #777;
            font-size: 14px;
            color: #333;
            padding: 8px;
        }
    }
}
.nav-bar{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    text-align: center;
    .nav-item{
        font-size: 14px;
        padding: 0 6px;
    }
}
</style>


