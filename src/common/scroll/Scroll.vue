<template>
    <div class="scroll" ref="scroll">
        <div class="wrap" :style="{width:width+'px'}">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'h-scroll',
    data(){
        return {
            width: 0
        }
    },
    props: {
        canLoadMore: Boolean
    },
    mounted(){
        this.scroll = new IScroll(this.$refs.scroll,{
            scrollX: true,
            scrollY: false
        })
        //由于宽度要大于滚动视图的宽度，这里计算宽度
        this.scroll.on('beforeScrollStart',()=>{
            let width = 0;
            let marginLeft = this.$slots.default[0].elm.offsetLeft
            this.$slots.default.map(item=>{
                width += (item.elm.offsetWidth + marginLeft);
            })
            this.scroll.refresh();
            this.width = width;
            console.log(this.width)
        })
        this.scroll.on('scrollEnd',()=>{
            console.log(this.scroll.x)
            if(this.scroll.x <= this.scroll.maxScrollX && this.canLoadMore==true){
                this.$emit('loadExpectedMore')
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.scroll{
    overflow: hidden;
    white-space: nowrap;
}
</style>
