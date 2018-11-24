import Vue from 'vue'

Vue.filter('filterWH',(path,w,h)=>{
    return path.replace(/w.h/,`${w}.${h}`)
})