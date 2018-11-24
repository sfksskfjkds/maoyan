import Tabs from './tabs/Tabs'
import TabItem from './tabs/TabItem'
import Header from './header/Header'
import Content from './content/Content'
import Scroll from './scroll/Scroll'
import cinamaSelect from './cinema/cinemaSelect'

export default {
    //编写插件
    install(Vue){
       Vue.component(Tabs.name,Tabs)
       Vue.component(TabItem.name,TabItem)
       Vue.component(Header.name,Header)
       Vue.component(Content.name,Content)
       Vue.component(Scroll.name,Scroll)
       Vue.component(cinamaSelect.name,cinamaSelect)
    }
}