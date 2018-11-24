import http from '@/utils/http'
import API from '@/api'

export function getCinemaList(ci){
    return new Promise((resolve,reject)=>{
        http({
            url: API.CINEMA_LIST_API,
            method: 'GET',
            data: {
                day: 2018-11-18,
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
                reqId: 1542531288644,
                ci: ci?ci:30
            }
        }).then(({data,status})=>{
            if(status!=200){
                //请求失败
            }
            //请求成功
            resolve(data.cinemas)
        })
        .catch(error=>{

        })
    })
}

//请求影院服务
export function filterCinemas({movieId,dayTime}){
    return new Promise((resolve,reject)=>{
        http({
            url: API.FILTER_CINEMAS_API,
            method: 'GET',
            data: {
                movieId: movieId,
                day: dayTime
            }
        }).then(({data,status})=>{
            if(status!=200){

            }
            resolve(data)
        }).catch(error=>{

        })
    })
}