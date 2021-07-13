<template>
    <div class='user-container'>
        <headnav title='个人中心'></headnav>
        <!-- <div @click='print'>123</div> -->
        <div class="usertitle">
            {{userProfile.nickname}}
        </div>
        <div class='top-info'>
            <div class='avatar'>
                <img :src="userProfile.avatarUrl" alt="">
            </div>
            <div>
                <div class='top-fans'>
                    <div>
                        <p>{{userProfile.followeds}}</p>
                        <p>粉丝</p>
                    </div>
                    <div>
                        <p>{{userProfile.follows}}</p>
                        <p>关注</p>
                    </div>
                    <div>
                        <p>{{"Lv." + userInfo.level}}</p>
                        <p>等级</p>
                    </div>
                </div>
                <div>
                    <van-button round block class='edit-info'>编辑信息</van-button>
                </div>
            </div>
        </div>
        <van-tabs v-model:active="active">
            <van-tab title="主页">
                <div class='home-con'>
                    <div class='one-item'>
                        <div>
                            <p>
                                唱片收藏架
                            </p>
                            <p>表达音乐品味</p>
                        </div>
                        <div class='bottom-item'> 布置唱片架
                            <van-icon name="arrow" />
                        </div>
                    </div>
                    <div class='one-item'>
                        <div>
                            <p>
                                展示动态图片
                            </p>
                            <p>让别人了解你</p>
                        </div>
                        <div class='bottom-item'> 使用相册
                            <van-icon name="arrow" />
                        </div>
                    </div>
                    <div class='one-item'>
                        <div>
                            <p>
                                大声说出你的
                            </p>
                            <p>愿望</p>
                        </div>
                        <div class='bottom-item'> 写愿望清单
                            <van-icon name="arrow" />
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="动态">
                <div></div>
            </van-tab>
            <van-tab title="播客">
                <div></div>
            </van-tab>
        </van-tabs>
        <div class="base-info">
            <div class="base-info-title">
                基本信息
            </div>
            <div class="base-info-con">
                <p>村龄: <span>{{new Date().getFullYear() - new Date(userInfo.createTime).getFullYear() - 1}}年 (
                        {{userInfo.createTime |
                        formatDateYM}} 注册)</span></p>
                <p>性别: <span>{{userProfile.gender == 1?'男':'女'}}</span></p>
                <p>个人介绍: <span>还没有填写个人介绍</span></p>
                <p>查看全部
                    <van-icon name="arrow" />
                </p>
            </div>
        </div>

        <div class="base-info">
            <div class="base-info-title">
                创建的歌单
            </div>
            <div class="base-info-con">
                <div class='my-song-lists'>
                    <div class="my-song-list" v-for='(item, index) in mySongList' :key='index'
                        @click='handleToSongListDetail(item.id)'>
                        <div class='my-song-list-img'>
                            <img :src="item.coverImgUrl" alt="">
                        </div>
                        <div class='songlist-name'>
                            <p>{{item.name}}</p>
                            <p id='secP'>
                                <span>{{item.trackCount}}首,播放{{item.playCount}}次</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="base-info">
            <div class="base-info-title">
                收藏的歌单
            </div>
            <div class="base-info-con">
                <div class='my-song-lists'>
                    <div class="my-song-list" v-for='(item, index) in collectSongList' :key='index'
                        @click='handleToSongListDetail(item.id)'>
                        <div class='my-song-list-img'>
                            <img :src="item.coverImgUrl" alt="">
                        </div>
                        <div class='songlist-name'>
                            <p>{{item.name}}</p>
                            <p id='secP'>
                                <span>{{item.trackCount}}首,播放{{item.playCount}}次</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <van-button type="danger" block round @click='handleToLogout'>退出登录</van-button>
    </div>

</template>

<script>
    import headnav from '@/components/HeadNav.vue'
    import axios from 'axios'
    export default {
        name: 'userinfo',
        components: { headnav },
        data() {
            return {
                userId: this.$route.query.userId,
                userInfo: [],
                userProfile: [],
                active: 0,
                mySongList: [],
                collectSongList: []
            }
        },
        methods: {
            print() {
                console.log(this.userId)
            },
            getUserInfo() {
                //  个人信息
                axios.get('/user/detail?uid=' + this.userId).then(res => {
                    console.log(res)
                    this.userInfo = res.data,
                        this.userProfile = res.data.profile
                })
                // 个人歌单
                axios.get('/user/playlist?uid=' + this.userId).then(res => {
                    if (res.data.code === 200) {
                        // 区分个人歌单和收藏歌单
                        res.data.playlist.forEach((item, index) => {
                            if (item.creator.userId == this.userId) {
                                this.mySongList.push(item)
                            } else {
                                this.collectSongList.push(item)
                            }
                        })
                        // this.mySongList = res.data.playlist
                    }
                    console.log(res)
                    console.log(this.mySongList)
                    console.log(this.collectSongList)
                })
            },
            // 歌单详情
            handleToSongListDetail(index) {
                this.$router.push({
                    name: 'songlistdetail',
                    query: {
                        songListId: index
                    }
                })
            },
            handleToLogout() {
                axios.get('/logout').then(res => {
                    if (res.data.code === 200) {
                        this.$router.push({
                            name: 'home'
                        }
                        )
                    }
                })
            }
        },
        created() {
            this.getUserInfo()
            console.log(this.userId)
        }
    }
</script>

<style>
    .user-container {
        background-color: #f1f1f1;
    }

    .usertitle {
        font-size: 40px;
        font-weight: bold;

        text-align: center;
        padding: 20px 0;
    }

    .top-info {
        width: 100%;
        /* padding: 20px 40px; */
        display: flex;
        justify-content: space-around;
        text-align: center;
    }

    .avatar {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
    }

    .avatar img {
        width: 100%;
        height: 100%;
    }

    .top-fans {
        width: 400px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .top-fans div p {
        margin: 10px 0;
    }

    .edit-info {
        background-color: transparent !important;
        border: 2px solid #ccc !important;
    }

    .top-fans p:nth-child(1) {
        font-weight: bold;
    }

    .top-fans p:nth-child(2) {
        font-size: 20px;
        color: #999;
    }

    .van-tabs__nav {
        background-color: transparent !important;
    }

    .home-con {
        display: flex;
        justify-content: space-around;
    }

    .one-item {
        background-color: #fff;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px 15px;
        font-size: 28px;
    }

    .bottom-item {
        color: #fa1414;
    }

    .bottom-item i {
        vertical-align: middle;
    }

    .base-info {
        padding: 40px 20px;
        background-color: #fff;
        border-radius: 20px;
        margin: 20px;
    }

    .base-info-title {
        font-weight: bold;
    }

    .base-info-con {
        font-size: 28px;
        color: #888;
    }

    .base-info-con p:last-child {
        text-align: center;
        border-top: 2px solid #ddd;
        padding-top: 20px;
        margin-bottom: 0;
    }

    .base-info-con p:last-child i {
        vertical-align: middle;
    }

    .base-info-con p span {
        color: #555;
    }

    .my-song-lists {
        padding-top: 30px;
    }

    .my-song-list {
        display: flex;
        margin-bottom: 20px;
    }

    .my-song-list-img {
        width: 100px;
        height: 100px;
        border-radius: 20px;
        overflow: hidden;
    }

    .my-song-list-img img {
        width: 100%;
        height: 100%;
    }

    .songlist-name {
        padding-left: 20px;
        width: 80%;

    }

    .songlist-name p:nth-child(1) {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #222;
        font-size: 30px;
        margin: 0;
    }

    #secP {
        border-top: 0;
        padding-top: 0;
        margin: 0;
        color: #888;
        text-align: left;
        font-size: 20px;
        margin-top: 10px;
    }
</style>