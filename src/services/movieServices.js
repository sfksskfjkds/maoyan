import http from '../utils/http';
import API from '../api'

//封装请求正在热映的电影数据,精简组件结构，方便复用
export function getPlaying({ci}){
    // 利用promise处理ajax的异步操作，请求到数据再渲染页面，root页面调用getPlaying再执行.then
    return new Promise((resolve,reject)=>{
        http({
            url: API.PLAYING_API,
            method: 'GET',
            data: {
                token: '',
                ci: ci
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            let newData = data.movieList.map(item=>{
                let {id,img,nm,sc,showInfo,star,version,globalReleased } = item;
                img = item.img.replace(/w.h/,'128.180');
                // img = img.replace(/http/,'https');
                return {id,img,nm,sc,showInfo,star,version,globalReleased };
            })
            // console.log(newData)
            resolve({
                data: newData,
                ids: data.movieIds
            });
        })
        .catch(error=>{
        console.log(error)
        })
    })
}

export function getMorePlaying(ids){
    // 利用promise处理ajax的异步操作，请求到数据再渲染页面，root页面调用getPlaying再执行.then
    return new Promise((resolve,reject)=>{
        http({
            url: API.MORE_PLAYING_API,
            method: 'GET',
            data: {
                token: '',
                movieIds: ids
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            // 请求成功
            let newData = data.coming.map(item=>{
                let {id,img,nm,sc,showInfo,star,version,globalReleased } = item; //item /img/id
                img = item.img.replace(/w.h/,'128.180');
                return {id,img,nm,sc,showInfo,star,version,globalReleased };
            })
            resolve(newData);
        })
        .catch(error=>{
        console.log(error)
        })
    })
}

//封装请求即将上映的电影数据,精简组件结构，方便复用
export function getComing(ci){
    // 利用promise处理ajax的异步操作，请求到数据再渲染页面，root页面调用getPlaying再执行.then
    return new Promise((resolve,reject)=>{
        http({
            url: API.COMING_API,
            method: 'GET',
            data: {
                token: '',
                ci: ci,
                limit: 10
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            console.log(data,123)
            //过滤数据
            let newData = data.coming.map(item=>{
                let {comingTitle,img,nm,showInfo,star,globalReleased,wish,id,rt,showst} = item;
                return {comingTitle,img,nm,showInfo,star,globalReleased,wish,id,rt,showst};
            })
            //根据上映时间对数据进行分类
            let dataMap = {};
            newData.map(item=>{
                if(!dataMap[item.comingTitle]){
                    dataMap[item.comingTitle] = [];
                }
                dataMap[item.comingTitle].push(item);
            })
            console.log(dataMap)
            resolve({
                data:dataMap,
                ids: data.movieIds,
                newData: newData
            });
        })
        .catch(error=>{
        console.log(error)
        })
    })
}


export function getMoreComing({ids,ci}){
    // 利用promise处理ajax的异步操作，请求到数据再渲染页面，root页面调用getPlaying再执行.then
    return new Promise((resolve,reject)=>{
        http({
            url: API.MORE_COMING_API,
            method: 'GET',
            data: {
                token: '',
                ci: ci,
                limit: 10,
                movieIds: ids
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            console.log(data,999)
            //过滤数据
            let newData = data.coming.map(item=>{
                let {comingTitle,img,nm,showInfo,star,globalReleased,wish,id,rt,showst} = item;
                return {comingTitle,img,nm,showInfo,star,globalReleased,wish,id,rt,showst};
            })
            //根据上映时间对数据进行分类
            let dataMap = {};
            newData.map(item=>{
                if(!dataMap[item.comingTitle]){
                    dataMap[item.comingTitle] = [];
                }
                dataMap[item.comingTitle].push(item);
            })
            console.log(dataMap,888)
            resolve(dataMap);
        })
        .catch(error=>{
        console.log(error)
        })
    })
}

//封装请求最受期待的电影数据
export function getMostExpectedData({offset,ci}){
    offset = 0 || offset;
    return new Promise((resolve,reject)=>{
        http({
            url: API.MOST_EXPECTED_API,
            method: 'GET',
            data: {
                token: '',
                ci: ci,
                limit: 10,
                offset: offset
            }
        })
        .then(({data,status})=>{
            console.log(data.coming)
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            console.log(data,666)
            resolve(data);
        })
    })
}

//搜索电影
export function searchMovies(kw,ci){
    console.log(kw,ci)
    return new Promise((resolve,reject)=>{
        http({
            url: API.SEARCH_MOVIE_API,
            method: 'GET',
            data: {
                kw:kw,
                cityId: ci,
                stype: -1
            }
        }).then(({data,status})=>{
            if(status != 200){
                return;
            }
            let movies = data.movies.list.map(item=>{
                let {cat,enm,rt,wish,img,nm,sc} = item;
                img = item.img.replace(/w.h/,'128.180');
                return {cat,enm,rt,wish,img,nm,sc};
            })
            let cinemas = data.cinemas.list.map(item=>{
                let {addr,distance,nm,sellPrice} = item;
                return {addr,distance,nm,sellPrice};
            })
            let moviesTotal = data.movies.total;
            let cinemaTotal = data.cinemas.total;
            resolve({movies,cinemas,moviesTotal,cinemaTotal});
        }).catch(error=>{

        })
    })
}


//请求电影详情
export function movieDetail(movieId){
    return new Promise((resolve,reject)=>{
        http({
            url: API.DETAIL_MOVIE_API,
            method: 'GET',
            data: {
                movieId
            }
        }).then(({data,status})=>{
            if(status!=200){
                return;
            }
            data.detailMovie.img = data.detailMovie.img.replace(/w.h/,'148.208')
            resolve(data);
        }).catch(error=>{

        })
    })
}

