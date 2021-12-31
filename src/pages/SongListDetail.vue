<template>
    <div>
        <headnav title='歌曲详情'></headnav>
        <div class="cover">
            <div class="cover-img" :style="{'backgroundImage': 'url('+this.songListInfo.coverImgUrl+')'}">
            </div>
        </div>

        <div class='song-details'>
            <div class='song-detail-img'>
                <img :src="this.songListInfo.coverImgUrl" alt="">
            </div>
            <div class='song-detail-info'>
                <div class="detail-list-title">
                    {{this.songListInfo.name}}
                </div>
                <p><img :src="this.songListInfo.creator.avatarUrl" alt=""><span>
                        {{this.songListInfo.creator.nickname}}</span>

                    <van-icon name="arrow" />
                </p>
                <p class='edits'>编辑信息
                    <van-icon name="arrow" />
                </p>
            </div>
        </div>
        <div class='song-list-title'>歌曲列表</div>
        <song-list :songList="songList"></song-list>
        <!-- 歌曲评论 -->
        <div class="comments">
            <div class="comment-title">最新评论({{this.commentList.length}})</div>
            <div class="comment" v-for='(item,index) in commentList' :key='index'>
                <div class="comment-userinfo">
                    <div class='left-user'>
                        <img :src="item.user.avatarUrl" alt="">
                        <div>
                            <p>{{item.user.nickname}} <img src="../assets/vip4.png" alt=""></p>
                            <p>{{item.time | formatDate}}</p>
                        </div>
                    </div>
                    <div class="good">
                        {{item.likedCount}}
                        <van-icon name="good-job-o" size="16" />
                    </div>
                </div>
                <div class="comment-content">
                    <p>{{item.content}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import headnav from "@/components/HeadNav.vue";
import SongList from '../components/SongList.vue'

export default {
    name: "SongListDetail",
    components: { headnav, SongList },
    data() {
        return {
            songList: [],
            songListInfo: {
                creator: {
                    avatarUrl: "",
                },
            },
            commentList: [],
            songListId: 5001,
        };
    },
    methods: {
        getSongListInfo() {
            axios
                .get("/playlist/detail?id=" + this.songListId)
                .then((res) => {
                    console.log(res);
                    this.songList = res.data.playlist.tracks;
                    this.songListInfo = res.data.playlist;
                    this.$store.commit(
                        "INIT_TOPLISTIDS",
                        res.data.playlist.tracks
                    );
                });
        },
        handleToComments() {
            axios.get("/comment/playlist?id=" + this.songListId).then((res) => {
                if (res.data.code === 200) {
                    this.commentList = res.data.comments;
                }
                console.log(res);
            });
        },
    },
    mounted() {
        const id = this.$route.query.songListId  // 如果传入歌单id则获取传入的歌单,否则为热歌榜歌单
        console.log(id)
        if(id){
            this.songListId = id
        }
        this.getSongListInfo();
        this.handleToComments();
    },
};
</script>
<style>
.cover {
    width: 100%;
    z-index: -1;
    position: absolute;
    height: 320px;
    overflow: hidden;
}

.cover-img {
    height: 320px;
    width: 100%;
    background-size: 100% 400px;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: -1;
    filter: blur(30px);
    transform: scale(1.2);
    overflow: hidden;
}

.song-details {
    padding: 40px;
    color: #fff;
    display: flex;
    justify-content: space-around;
}

.song-detail-img {
    width: 200px;
    height: 200px;
    border-radius: 20px;
    overflow: hidden;
    margin-right: 30px;
}

.song-detail-img img {
    width: 100%;
    height: 100%;
}

.detail-list-title {
    width: 400px;
}

.song-detail-info p {
    color: #ccc;
}

.song-detail-info p img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
}

.edits {
    font-size: 24px;
}

.song-detail-info p i {
    vertical-align: middle;
}

.song-list-title {
    background-color: #eee;
    font-size: 24px;
    position: relative;
    top: -12px;
    padding-left: 30px;
}

.comment-title {
    background-color: #eee;
    font-size: 24px;
    padding-left: 30px;
}
</style>