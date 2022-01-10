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
                <div class='play-progress'>
                    <span>{{showCurrentTime}}</span>
                    <van-progress class="progress" :percentage='percentage' pivot-text=''/>
                    <span>{{showTotalTime}}</span>
                </div>
                <div class="play-control">
                    <van-icon name="arrow-left" @click="preSong" />
                    <van-icon
                        v-show="playFlag"
                        name="pause-circle-o"
                        @click="trogglePlay"
                    />
                    <van-icon
                        v-show="!playFlag"
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
           <comment :commentList='hotComments'></comment>
            <van-button round type="info" @click="print" class="more"
                >打开酷网Q查看更多</van-button
            >
        </div>
    </div>
</template>
<script>
import axios from "axios";
import headnav from "@/components/HeadNav.vue";
import comment from '@/components/Comments.vue'
import { min } from 'moment';
export default {
    name: "detail",
    components: { headnav, comment },
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
            totalTime: 0,
            currentTime: 0,
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
                if (res.code === 200) {
                    // console.log(res)
                    this.songsInfo = res.songs[0];
                }
            });

            //相关歌曲
            await axios.get("/simi/song?id=" + id).then((res) => {
                if (res.code === 200) {
                    // console.log(res)
                    this.sameSong = res.songs;
                }
            });

            // 歌曲评论
            await axios
                .get("/comment/music?id=" + id + "&limit=" + 1)
                .then((res) => {
                    if (res.code === 200) {
                        this.hotComments = res.hotComments;
                        // console.log(this.hotComments)
                    }
                });

            // 歌词
            await axios.get("/lyric?id=" + id).then((res) => {
                if (res.code === 200) {
                    console.log(res);
                    if (res.nolyric) {
                        return;
                    }
                    res.lrc.lyric.replace(
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
                if (res.code === 200) {
                    // console.log(res);
                    if (res.data[0].url === null) {
                        this.$toast.fail({
                            forbidClick: true,
                            message: "暂无歌曲资源",
                        });
                        this.$router.go(-1);
                        return;
                    }
                    this.songUrl = res.data[0].url;
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
                        this.marginTop = i * -23 + "px";
                    }
                }
                this.updateTime();
            }, 100);
        },
        updateTime() {
            this.totalTime = this.audio.duration;
            this.currentTime = parseInt(this.audio.currentTime);
            this.percentage = ((this.currentTime / this.totalTime) * 100).toFixed(2);
        },
        startPlay() {
            this.playFlag = true;
            this.audio.play();
            this.startLyric();
        },
    },
    mounted() {
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
    computed: {
        showCurrentTime(){
            const minutes = Math.floor(this.currentTime / 60)
            const seconds = Math.floor(this.currentTime % 60)
            return `${minutes <= 9 ? '0' + minutes : minutes}:${seconds <=9 ? '0' + seconds : seconds}`
        },
        showTotalTime(){
            const minutes = Math.floor(this.totalTime / 60)
            const seconds = Math.floor(this.totalTime % 60)
            return `${minutes <= 9 ? '0' + minutes : minutes}:${seconds <=9 ? '0' + seconds : seconds}`
        }
    },
    destroyed() {
        clearInterval(this.timer);
        this.audio.pause();
        this.playFlag = !this.playFlag;
    },
};
</script>
<style lang='scss' scoped>
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
    &::before{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.2);
    }
}

.detail-head {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    color: #fff;
    align-items: center;
    .left-ask {
        line-height: 70px;
        img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            vertical-align: middle;
        }
    }
    .title-name {
        width: 100%;
        text-align: center;
        p:nth-child(1) {
            font-size: 30px;
        }
        p:nth-child(2) {
            font-size: 22px;
        }
    }
    .right-app {
        width: 60px;
    }
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
    img {
        width: 100%;
        height: 100%;
    }
    .playbtn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        z-index: 2;
        img {
            width: 100%;
            height: 100%;
        }
    }
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


.lyric {
    margin-top: 20px;
    text-align: center;
    color: #999;
    height: 300px;
    overflow: hidden;
    font-size: 32px;
    p {
        margin: 14px 0;
    }
    .lyric-wrap {
        height: 2000px;
        transition: all 0.2s;
    }
    .activelyric {
        color: #fff;
        font-size: 40px;
    }
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

.play-progress{
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    padding: 10px;
    span{
        margin: 10px;
        color: #fff;
    }
    .van-progress{
        width: 100%;
    }
}

.app-btn {
    display: flex;
    justify-content: space-around;
    margin-top: 100px;
    div {
        width: 35%;
        height: 50px;
        border-radius: 45px;
        padding: 20px;
        line-height: 50px;
        font-size: 40px;
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
}

.bottom-container {
    margin-top: 50px;
    background-color: #fff;
    padding: 40px;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    .like-song {
        height: 80px;
        display: flex;
        justify-content: space-between;
        font-size: 28px;
        margin: 20px 0;
        .song-info {
            width: 70%;
            overflow: hidden;
            .song-info p:nth-child(2) {
                color: #999;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        div {
            height: 80px;
        }
        .pic {
            margin-right: 20px;
            img {
                height: 80px;
                overflow: hidden;
            }
        }
    }
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
    i {
        display: block;
        width: 70px;
        height: 70px;
        text-align: center;
        line-height: 70px;
        border: 1px solid #999;
        font-size: 40px;
        border-radius: 50%;
    }
}

.progress {
    margin-top: 20px;
}

</style>