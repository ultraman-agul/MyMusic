<template>
    <div class='top-tab-container'>
        <div class="music-header">
            <span>网酷Q音乐</span>
            <van-button round type="info" @click='handleToLogin' v-if="!onLine">登陆/注册</van-button>
            <van-button round type="info" @click='handleToUser' v-else>个人中心</van-button>
            <!-- <van-icon name="user-circle-o" /> -->
        </div>
        <van-tabs v-model:active="active" @click='changeTab'>
            <van-tab :title="item" v-for='(item,index) in tabList' :key='index'>
                <router-view></router-view>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'toptab',
        data() {
            return {
                active: Number(localStorage.getItem('activeIdx')) ? Number(localStorage.getItem('activeIdx')) : 0,
                tabList: ['推荐音乐', '热歌榜', '搜索'],
                onLine: false,
                userId: ''
            }
        },
        methods: {
            changeTab(idx) {
                this.active = idx;
                localStorage.setItem('activeIdx', idx) // 将选中的tab缓存起来,避免点击两次才切换样式
                switch (this.active) {
                    case 0:
                        this.$router.push({ name: 'home' })
                        break;
                    case 1:
                        this.$router.push({ name: 'hotlist' })
                        break;
                    case 2:
                        this.$router.push({ name: 'search' })
                        break;
                }
            },
            handleToLogin() {
                this.$router.push({
                    name: 'login'
                })
            },
            handleToUser() {
                this.$router.push({
                    name: 'userinfo',
                    query: {
                        userId: this.userId
                    }
                })
            },
        },
        created() {
            axios.get('/login/status').then(res => {
                console.log(res)
                if (res.data.data.account) {
                    this.onLine = true
                    this.userId = res.data.data.account.id
                } else {
                    this.onLine = false
                }
            })
        }
    }
</script>

<style>
    .music-header {
        height: 120px;
        background-color: #1989fa;
        display: flex;
        justify-content: space-between;
        padding-left: 30px;
        align-items: center;
    }

    .music-header span {
        color: #fff;
        line-height: 120px;
        font-weight: bold;
        letter-spacing: 2px;
    }

    .music-header a {
        display: inline-block;
        padding: 20px 30px;
        height: 30px;
        line-height: 30px;
        margin-top: 20px;
        background-color: #fff;
        border-radius: 30px;
        color: #1989fa;
    }

    .top-tab-container {
        border-bottom: 4px solid #ddd;
    }
</style>