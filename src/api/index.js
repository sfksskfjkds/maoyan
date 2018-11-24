
//为了区分常量与变量，一般常量大写

const HOST = 'http://localhost:8080';


/*
1.请求正在热映的接口
2.参数：token
*/
const PLAYING_API = '/ajax/movieOnInfoList'

/*
1.请求更多正在热映的接口
2.参数:
    token ''
    movieIds

*/
const MORE_PLAYING_API = '/ajax/moreComingList'

/*
1.请求即将上映的接口
2.参数
    ci 30   (代表深圳)
    token
    limit   10
*/
const COMING_API = '/ajax/comingList'

/*
    请求更多即将上映的电影
    参数:
    ci
    token
    limit
    movietIds
*/
const MORE_COMING_API = 'ajax/moreComingList'

/*请求最受期待的电影的接口
    参数
    ci 30
    token ''
    limit 10
    offset 0 
*/
const MOST_EXPECTED_API = '/ajax/mostExpected'

/*
    请求城市列表
    http://m.maoyan.com/dianying/cities.json
    由于没有配置dianying的开头，所以得在package.json中配置
*/
const CITY_LIST_API = '/dianying/cities.json'

/*
    请求影院列表
    /ajax/cinemaList?
    参数
    day=2018-11-18
    offset=0
    limit=20
    districtId=-1
    lineId=-1
    hallType=-1
    brandId=-1
    serviceId=-1
    areaId=-1
    stationId=-1
    item ''
    updateShowDay=true
    reqId=1542531288644
    ci
*/
const CINEMA_LIST_API = '/ajax/cinemaList'


/*
    搜索电影
    /ajax/search?kw=%E6%9E%97%E6%AD%A3%E8%8B%B1&cityId=30&stype=-1
    参数:
    kw    用户输入的内容
    cityId
    stype -1
*/
const SEARCH_MOVIE_API = '/ajax/search'

/*
    请求电影详情的接口
    /ajax/detailmovie?movieId=42964
    参数: 
        movieTd
*/
const DETAIL_MOVIE_API = '/ajax/detailmovie'


/*
    请求时间
        http://m.maoyan.com/ajax/movie?forceUpdate=1542889205994
        参数:
            forceUpdate  Date.now()
            movieId: 42964
            day: 2018-11-22
            offset: 0
            limit: 20
            districtId: -1
            lineId: -1
            hallType: -1
            brandId: -1
            serviceId: -1
            areaId: -1
            stationId: -1
            item: 
            updateShowDay: true
            reqId: 1542889202975
            cityId: 30
*/
const TIME_API = '/ajax/movie'

/*
    请求影院位置特色等详细数据
        /ajax/filterCinemas?movieId=42964&day=2018-11-23
        参数:
            movieId
            day
*/
const FILTER_CINEMAS_API = '/ajax/filterCinemas'




//输出api
export default {
    HOST,
    PLAYING_API,
    COMING_API,
    MORE_PLAYING_API,
    MOST_EXPECTED_API,
    CITY_LIST_API,
    MORE_COMING_API,
    CINEMA_LIST_API,
    SEARCH_MOVIE_API,
    DETAIL_MOVIE_API,
    TIME_API,
    FILTER_CINEMAS_API
}