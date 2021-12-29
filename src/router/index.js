import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/pages/Home.vue"
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
// import About from '@/pages/About.vue'
import UserInfo from '@/pages/UserInfo.vue'
import Detail from '@/pages/Detail.vue'
import HotList from '@/pages/HotList.vue'
import Search from '@/pages/Search.vue'
import SongListDetail from '@/pages/SongListDetail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: 'home'
            }
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        // {
        //     path: '/about',
        //     name: 'about',
        //     component: About
        // },
        {
            path: '/userinfo',
            name: 'userinfo',
            component: UserInfo
        },
        {
            path: '/detail',
            name: 'detail',
            component: Detail
        },
        {
            path: '/hotlist',
            name: 'hotlist',
            component: HotList
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        },
        {
            path: '/songlistdetail',
            name: 'songlistdetail',
            component: SongListDetail
        }
    ]
})

export default router