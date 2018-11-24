<template>
    <div class="content" ref='content'>
        <div class="wrap">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app-content',
    data(){
        return {
            
        }
    },
    props: {
        canLoadMore: Boolean
    },
    methods: {
        refresh(){
            this.contentScroll.refresh()
        },
        scrollTo(y){
            this.contentScroll.refresh();
            //x轴为0，点击侧边栏滚动y轴跳转
            this.contentScroll.scrollTo(0,y*(-1),500)
        }
    },
    //在mounted时创建滚动视图
    mounted(){
        //创建滚动视图,第一个参数传入dom对象不传类名，防止其他类名相同的组件间互相影响
        this.contentScroll = new IScroll(this.$refs.content,{
            mouseWheel: true
        })
        this.contentScroll.on('beforeScrollStart',()=>{
            //滚动开始前刷新页面识别最新高度
            this.contentScroll.refresh();
        })
        this.contentScroll.on('scrollEnd',()=>{
            if(this.contentScroll.y <= this.contentScroll.maxScrollY && this.canLoadMore==true){
                this.$emit('loadMore')
            }
        })
    }
}
</script>

<style lang="scss" scoped>

.content{
    width: 100%;
    position: absolute;
    left: 0;
    overflow: hidden;
}


</style>



