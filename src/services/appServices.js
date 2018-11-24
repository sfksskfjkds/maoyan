//项目中杂七杂八的请求放到这里来

import http from '@/utils/http'
import API from '@/api'

export function getCityListData(){
    return new Promise((resolve,reject)=>{
        http({
            url: API.CITY_LIST_API,
            method: 'GET'
        }).then(({data,status})=>{
            if(status != 200){
                return;
            }
                let map = {};
                data.cts.map(item=>{
                    //获得首字母
                    let first = item.py[0];
                    //对首字母进行分类
                    if(!map[first]){
                        map[first] = [];
                    }
                    map[first].push(item);
                })
                //keys方法为取的对象的key值(属性值)
                let keys = Object.keys(map);
                //对map对象的属性值排序,字母在计算机中也是二进制，可直接比较大小
                for(let i = 0; i < keys.length - 1; i++){
                    for(let j = 0; j < keys.length - i - 1; j++){
                        if(keys[j] > keys[j+1]){
                            let max = keys[j];
                            keys[j] = keys[j+1];
                            keys[j+1] = max;
                        }
                    }
                }
                //组装数据变成自己想要的格式方便渲染
                let newData = keys.map(item=>{
                    return {
                        key: item,
                        value: map[item]
                    }
                })
                resolve({
                    keys: keys,
                    data: newData
                })
        }).catch(error=>{
            console.log(error)
        })
    })
}

//请求时间
export function getTime({movieId,dayTime,reqId,cityId}){
    return new Promise((resolve,reject)=>{
        http({
            url: API.TIME_API,
            method: 'POST',
            data: {
                forceUpdate: reqId,
                offset: 0,
                limit: 20,
                districtId: -1,
                lineId: -1,
                hallType: -1,
                brandId: -1,
                serviceId: -1,
                areaId: -1,
                stationId: -1,
                item: '',
                updateShowDay: true,
                movieId: movieId,
                day: dayTime,
                reqId: reqId,
                cityId: cityId
            }
        }).then(({data,status})=>{
            if(status!=200){
                return;
            }
            resolve(data)
    
        }).catch(error=>{
    
        })
    })
}

//请求城市详情
export function filterCinemas(ci){
    return new Promise((resolve,reject)=>{
        http({
            url: API.FILTER_CINEMAS_API,
            method: 'GET',
            data: {
                ci
            }
        }).then(({data,status})=>{
            if(status!=200){

            }
            resolve(data)
        }).catch(error=>{

        })
    })
}