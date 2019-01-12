import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    base: '/cfq/',
    routes: [{
        path: '/',
        name: 'Index',
        component: () => import('@/view/index'),
        // children: [{
        //     path: '/quan01',
        //     name: 'Quan01',
        //     component: () => import('@/components/quan01'),
        // }]
    },{
        path: '/begin',
        name: 'Begin',
        component:() => import('@/view/begin'),
    },{
        path: '/result',
        name: 'Result',
        component:() => import('@/view/result'),
    },,{
        path: '/gift',
        name: 'Gift',
        component:() => import('@/view/gift'),
    },{
        path: '/addInfo',
        name: 'AddInfo',
        component:() => import('@/view/addInfo'),
    }]
})
