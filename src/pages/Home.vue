<template>
    <div class='home'>
        <toptab></toptab>
        <div v-if="isLoading">
            <van-skeleton :row="8" />
            <br />
            <van-skeleton title :row="10" />
        </div>
        <div v-else>
            <div class="banner">
                <van-swipe 
                    class="my-swipe"
                    :autoplay="3000"
                    indicator-color="white"
                >
                    <van-swipe-item
                        v-for="(item, index) in banners"
                        :key="index"
                        ><img class="banner-img" :src="item.pic" alt="" />
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="music-column">编辑推荐</div>
            <div class="songlist">
                <div
                    class="songlist-item"
                    v-for="(item, index) in songList"
                    :key="index"
                    @click="handleToSongListDetail(item.id)"
                >
                    <div class="songlist-item-img">
                        <img :src="item.picUrl" alt="" />
                        <span>{{
                            (item.playCount / 10000).toFixed(1) + "万"
                        }}</span>
                    </div>
                    <p>{{ item.name }}</p>
                </div>
            </div>

            <div class="music-column">最新音乐</div>
            <div class="new-songs">
                <div
                    class="new-song-item"
                    v-for="(item, index) in newSongList"
                    :key="index"
                    @click="handleToDetail(item.song.id)"
                >
                    <div class="left-song">
                        <div class="song-name">{{ item.name }}</div>
                        <div class="author">
                            <div
                                class="SQ"
                                v-if="item.song.privilege.flag >= 60"
                            ></div>
                            <span
                                v-for="(item, index) in item.song.artists"
                                :key="index"
                            >
                                {{ item.name }}
                            </span>
                            <span>{{ " - " + item.song.album.name }}</span>
                        </div>
                    </div>
                    <div class="play-icon">
                        <van-icon name="play-circle-o" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import toptab from "@/components/TopTab.vue";
export default {
    name: "home",
    components: {
        toptab,
    },
    data() {
        return {
            active: 0,
            songList: [],
            newSongList: [],
            banners: [],
            isLoading: true,
        };
    },
    methods: {
        handleToDetail(id) {
            this.$router.push({
                name: "detail",
                query: { id: id },
            });
        },
        // 歌单详情
        handleToSongListDetail(index) {
            this.$router.push({
                name: "songlistdetail",
                query: {
                    songListId: index,
                },
            });
        },
        // 轮播图
        getBanner() {
            axios.get("/banner?type=1").then((res) => {
                console.log(res);
                this.banners = res.banners;
            });
        },
        // 主编推荐歌单
        getRecommendSongList() {
            axios.get("/personalized?limit=6").then((res) => {
                this.songList = res.result;
                // console.log(this.songList)
            });
        },
        // 最新音乐
        getNewSongs() {
            axios.get("/personalized/newsong").then((res) => {
                this.newSongList = res.result;
                console.log(res.result);
                this.$store.commit("INIT_TOPLISTIDS", res.result);
            });
        },
    },
    created() {
        setTimeout(() => {
            this.isLoading = false;
        }, 600); // 实际开发不这么用
        this.getRecommendSongList();
        this.getNewSongs();
        this.getBanner();
    },
};
</script>

<style lang='scss' scoped>
.home{
    .banner{
        .van-swipe {
            text-align: center;
            .banner-img {
                width: 100%;
                height: 300px;
            }
        }
    }
    .music-column {
        border-left: 8px solid #1989fa;
        padding-left: 20px;
        padding: 30px;
        border-top: 1px solid #eee;
        font-size: 40px;
        font-weight: bold;
    }
    .songlist {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .songlist-item{
            flex: 33.3%;
            p {
                font-size: 14px;
                padding-left: 4px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                /* 最多两行，超出隐藏*/
                overflow: hidden;
            }
            .songlist-item-img{
                position: relative;
                img{
                    width: 100%;
                }
                span {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 12px;
                    color: #fff;
                }
            }
        }
    }
   
}
</style>

<style lang='scss'>
     .new-songs{
        width: 100%;
        .new-song-item {
            height: 100px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            margin-top: 20px;
            .left-song {
                /* font-size: 16px; */
                padding-left: 30px;
                .song-name{
                    font-size: 30px;
                }
                .author {
                    font-size: 12px;
                    color: #a2a2a2;
                    margin: 4px 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    .SQ{
                        display: inline-block;
                        background-image: url(../assets/index_icon_2x.png);
                        width: 50px;
                        height: 34px;
                        background-position: 0 0;
                        transform: scale(0.6);
                        vertical-align: middle;
                        margin-right: -10px;
                    }
                }
            }
            .play-icon {
                line-height: 70px;
                width: 100px;
                height: 100px;
                i {
                    width: 100%;
                    height: 100%;
                    font-size: 60px;
                    line-height: 80px;
                }
            }
        }
    }

    .van-tabs__wrap{
        .van-tabs__nav{
            .van-tab{
                span{
                    font-size: 30px;
                }
            }
        }
    }
</style>