<template>
    <div>
        <headnav title="歌曲详情"></headnav>
        <div
            class="most"
            :style="{
                backgroundImage: 'url(' + this.songsInfo.al.picUrl + ')',
            }"
        ></div>
        <div class="detail-head">
            <div class="left-ask">
                <img src="../assets/109951165641456117.jpg" alt="" />
            </div>
            <div class="title-name">
                <p>{{ this.songsInfo.name }}</p>
                <p>
                    <span
                        v-for="(item, index) in this.songsInfo.ar"
                        :key="index"
                    >
                        {{ item.name + " " }}
                    </span>
                </p>
            </div>
            <div class="right-app">
                <van-icon name="like-o" />
            </div>
        </div>
        <div class="container">
            <div class="tantou"></div>
            <div
                :class="{ bottom: true, activeRote: this.playFlag }"
                @click="trogglePlay"
            >
                <div class="center">
                    <img :src="this.songsInfo.al.picUrl" alt="" />
                    <div class="playbtn" v-if="!this.playFlag">
                        <img src="../assets/下载.png" alt="" />
                    </div>
                </div>
            </div>
            <div class="lyric">
                <div
                    class="lyric-wrap"
                    :style="{ 'margin-top': this.marginTop }"
                >
                    <p
                        v-for="(item, index) in lyric"
                        :key="index"
                        :class="{ activelyric: index === currentIndex }"
                    >
                        {{ item.content }}
                    </p>
                </div>
            </div>
            <div class="song-this"></div>
            <div>
                <van-progress :percentage="percentage" class="progress" />
                <div class="play-control">
                    <van-icon name="arrow-left" @click="preSong" />
                    <van-icon
                        v-if="playFlag"
                        name="pause-circle-o"
                        @click="trogglePlay"
                    />
                    <van-icon
                        v-else
                        name="play-circle-o"
                        @click="trogglePlay"
                    />
                    <van-icon name="arrow" @click="nextSong" />
                </div>
            </div>
            <div class="app-btn">
                <div class="open-app">打开</div>
                <div class="download">下载</div>
            </div>
        </div>
        <div class="bottom-container">
            <h4>喜欢这首歌的人也在听</h4>
            <div class="like-songs">
                <div
                    class="like-song"
                    v-for="(item, index) in this.sameSong"
                    :key="index"
                >
                    <div class="pic">
                        <img :src="item.album.picUrl" alt="" />
                    </div>
                    <div class="song-info">
                        <p>{{ item.name }}</p>
                        <p>
                            <span
                                v-for="(item, index) in item.artists"
                                :key="index"
                                >{{ item.name }}&nbsp; </span
                            ><span>-&nbsp;{{ item.album.name }}</span>
                        </p>
                    </div>
                    <div class="playicon">
                        <van-icon name="play-circle-o" size="40" />
                    </div>
                </div>
            </div>
            <h4>精彩评论</h4>
            <div class="comments">
                <div
                    class="comment"
                    v-for="(item, index) in hotComments"
                    :key="index"
                >
                    <div class="comment-userinfo">
                        <div class="left-user">
                            <img :src="item.user.avatarUrl" alt="" />
                            <div>
                                <p>
                                    {{ item.user.nickname }}
                                    <img src="../assets/vip4.png" alt="" />
                                </p>
                                <p>{{ item.time | formatDate }}</p>
                            </div>
                        </div>
                        <div class="good">
                            {{ item.likedCount }}
                            <van-icon name="good-job-o" size="16" />
                        </div>
                    </div>
                    <div class="comment-content">
                        <p>{{ item.content }}</p>
                    </div>
                </div>
            </div>
            <van-button round type="info" @click="print" class="more"
                >打开酷网Q查看更多</van-button
            >
        </div>
    </div>
</template>
<script>
import axios from "axios";
import headnav from "@/components/HeadNav.vue";
export default {
    name: "detail",
    components: { headnav },
    data() {
        return {
            songId: this.$route.query.id,
            songsInfo: {
                al: {
                    picUrl: "",
                },
            },
            sameSong: [],
            hotComments: [],
            songUrl: "",
            playFlag: false,
            lyric: [],
            currentIndex: 0,
            tiemr: null, // 定时器id需加在这里，确保唯一。如果在函数中，则无法清除定时器，存储的值会被覆盖
            marginTop: 0,
            audio: new Audio(),
            percentage: 0,
        };
    },
    methods: {
        print() {
            console.log(this.$store.state.nextId);
        },
        trogglePlay() {
            if (this.playFlag) {
                clearInterval(this.timer);
                this.audio.pause();
                this.playFlag = !this.playFlag;
            } else {
                this.startPlay();
            }
        },
        preSong() {
            this.getMusic(this.$store.state.preId);
        },
        nextSong() {
            // 获取下一首id
            this.getMusic(this.$store.state.nextId);
        },
        async getMusic(id) {
            // 获取歌曲详情信息
            this.$toast.loading({
                message: "加载中...",
                forbidClick: true,
            });
            this.$store.commit("NEXT_ID", id);
            //歌曲详情
            await axios.get("/song/detail?ids=" + id).then((res) => {
                if (res.data.code === 200) {
                    // console.log(res)
                    this.songsInfo = res.data.songs[0];
                }
            });

            //相关歌曲
            await axios.get("/simi/song?id=" + id).then((res) => {
                if (res.data.code === 200) {
                    // console.log(res)
                    this.sameSong = res.data.songs;
                }
            });

            // 歌曲评论
            await axios
                .get("/comment/music?id=" + id + "&limit=" + 1)
                .then((res) => {
                    if (res.data.code === 200) {
                        this.hotComments = res.data.hotComments;
                        // console.log(this.hotComments)
                    }
                });

            // 歌词
            await axios.get("/lyric?id=" + id).then((res) => {
                if (res.data.code === 200) {
                    console.log(res.data);
                    if (res.data.nolyric) {
                        return;
                    }
                    res.data.lrc.lyric.replace(
                        /\[([^\]]+)\]([^\[]+)/g,
                        (match, p1, p2) => {
                            let arr;
                            arr = p1.split(":");
                            let formatTime = (
                                Number(arr[0] * 60) + Number(arr[1])
                            ).toFixed(1);
                            this.lyric.push({
                                time: formatTime,
                                content: p2,
                            });
                        }
                    );
                }
            });

            // 歌曲资源链接
            await axios.get("/song/url?id=" + id).then((res) => {
                if (res.data.code === 200) {
                    // console.log(res.data);
                    if (res.data.data[0].url === null) {
                        this.$toast.fail({
                            forbidClick: true,
                            message: "暂无歌曲资源",
                        });
                        this.$router.go(-1);
                        return;
                    }
                    this.songUrl = res.data.data[0].url;
                    this.audio.src = this.songUrl;
                }
            });
        },
        startLyric() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                // console.log(ado.currentTime)
                for (let i = 0; i < this.lyric.length; i++) {
                    // 需要判断是否已经最后一句歌词
                    if (
                        this.audio.currentTime >=
                        this.lyric[this.lyric.length - 1].time
                    ) {
                        this.currentIndex = this.lyric[this.lyric.length - 1];
                        break; // 终止循环
                    }
                    if (
                        this.audio.currentTime > this.lyric[i].time &&
                        this.audio.currentTime < this.lyric[i + 1].time
                    ) {
                        this.currentIndex = i;
                        this.marginTop = i * -27 + "px";
                    }
                }
                this.updateTime();
            }, 600);
        },
        updateTime() {
            let totalTime = this.audio.duration;
            let currentTime = parseInt(this.audio.currentTime);
            this.percentage = ((currentTime / totalTime) * 100).toFixed(2);
        },
        startPlay() {
            this.playFlag = true;
            this.audio.play();
            this.startLyric();
        },
    },
    created() {
        this.getMusic(this.songId);
        // 开启自动播放
        this.audio.addEventListener("canplay", () => {
            this.startPlay();
        });
        // 绑定播放完毕事件
        this.audio.addEventListener("ended", () => {
            this.nextSong();
        });
    },
    destroyed() {
        clearInterval(this.timer);
        this.audio.pause();
        this.playFlag = !this.playFlag;
    },
};
</script>
<style>
.most {
    position: fixed;
    width: 80%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    height: 1000px;
    filter: blur(30px);
    transform: scale(1.5);
    z-index: -1;
    overflow: hidden;
}

.detail-head {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    color: #fff;
    align-items: center;
}

.title-name {
    width: 100%;
    text-align: center;
}

.title-name p {
    margin: 0;
}

.title-name p:nth-child(1) {
    font-size: 30px;
}

.title-name p:nth-child(2) {
    font-size: 22px;
}

.left-ask {
    line-height: 70px;
}

.left-ask img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    vertical-align: middle;
}

.right-app {
    width: 60px;
}

.bottom {
    background: url(../assets/d7e4e3a244701ee85fecb5d4f6b5bd57.png) no-repeat
        center center;
    background-size: cover;
    height: 500px;
    width: 500px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    margin-top: 50px;
}

.center {
    height: 63%;
    width: 63%;
    margin: 0 auto;
    margin-top: 90px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
}

.center img {
    width: 100%;
    height: 100%;
}

.tantou {
    background: url(../assets/needle-ab.png) no-repeat center center;
    width: 60%;
    /* 挖坑，此处宽度100%会导致出现左右滚动条 */
    height: 250px;
    transform: rotate(-10deg);
    background-size: contain;
    position: absolute;
    z-index: 2;
    top: 140px;
    left: 220px;
}

.playbtn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    z-index: 2;
}

.playbtn img {
    width: 100%;
    height: 100%;
}

.lyric {
    margin-top: 20px;
    text-align: center;
    color: #999;
    height: 300px;
    overflow: hidden;
    font-size: 32px;
}

.lyric p {
    margin: 14px 0;
}

.lyric-wrap {
    height: 2000px;
}

.activelyric {
    color: #fff;
    font-size: 40px;
}

.song-this {
    background: url(../assets/musicStreet.png) no-repeat center center;
    width: 200px;
    height: 60px;
    margin: auto;
    background-size: contain;
    border-radius: 30px;
    border: 1px solid #eee;
}

.app-btn {
    display: flex;
    justify-content: space-around;
    margin-top: 100px;
}

.app-btn div {
    width: 35%;
    height: 50px;
    border-radius: 45px;
    padding: 20px;
    /* color: #fff; */
    border: 1px solid #1989fa;
    text-align: center;
}

.open-app {
    color: #1989fa;
}

.download {
    background-color: #1989fa;
    color: #fff;
}

.bottom-container {
    margin-top: 50px;
    background-color: #fff;
    padding: 40px;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
}

.like-song {
    height: 80px;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    margin: 20px 0;
}

.song-info {
    width: 70%;
    overflow: hidden;
}

.like-song div {
    height: 80px;
}

.pic {
    margin-right: 20px;
}

.pic img {
    height: 80px;
    overflow: hidden;
}

.song-info p {
    margin: 0;
}

.song-info p:nth-child(2) {
    color: #999;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.comment {
    margin-top: 20px;
}

.comment-userinfo {
    display: flex;
    justify-content: space-between;
}

.left-user > img {
    float: left;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    margin-right: 20px;
}

.left-user div {
    float: left;
}

.left-user div p {
    margin: 0;
}

.left-user div p img {
    height: 30px;
    width: 60px;
}

.left-user div p:nth-child(2),
.good {
    color: #999;
    font-size: 25px;
}

.good {
    line-height: 70px;
}

.comment-content {
    margin-left: 70px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 最多两行，超出隐藏*/
    overflow: hidden;
    border-bottom: 2px solid #eee;
}

.comment-content p {
    margin: 14px 0;
}

.more {
    width: 100%;
    margin-top: 60px !important;
}

.activeRote {
    animation: zhuan 3s linear infinite;
}

@keyframes zhuan {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.play-control {
    width: 400px;
    height: 100px;
    background-color: #fff;
    border-radius: 30px;
    display: flex;
    justify-content: space-around;
    margin: 30px auto;
    align-items: center;
}

.progress {
    margin-top: 20px;
}

.play-control i {
    display: block;
    width: 70px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    border: 1px solid #999;
    font-size: 40px;
    border-radius: 50%;
}
</style>