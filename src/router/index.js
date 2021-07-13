import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/components/Home.vue"
import Login from '@/components/sub/Login.vue'
import Register from '@/components/sub/Register.vue'
import About from '@/components/About.vue'
import UserInfo from '@/components/UserInfo.vue'
import Detail from '@/components/Detail.vue'
import HotList from '@/components/HotList.vue'
import Search from '@/components/Search.vue'
import SongListDetail from '@/components/SongListDetail.vue'

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
        {
            path: '/about',
            name: 'about',
            component: About
        },
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