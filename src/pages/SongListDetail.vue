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
                <div class="title">
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
        <div class='part-title'>歌曲列表</div>
        <song-list :songList="songList"></song-list>
        <comment :commentList="commentList"></comment>
    </div>
</template>
<script>
import axios from "axios";
import headnav from "@/components/HeadNav.vue";
import SongList from '../components/SongList.vue'
import Comment from '../components/Comments.vue'

export default {
    name: "SongListDetail",
    components: { headnav, SongList, Comment },
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
        getComments() {
            axios
                .get("/comment/playlist?id=" + this.songListId)
                .then((res) => {
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
        this.getSongListInfo()
        this.getComments()
    },
};
</script>
<style lang='scss' scoped>
.cover {
    width: 100%;
    z-index: -1;
    position: absolute;
    height: 320px;
    overflow: hidden;
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
}

.song-details{
    padding: 40px;
    color: #fff;
    display: flex;
    justify-content: space-around;
    .song-detail-img {
        width: 200px;
        height: 200px;
        border-radius: 20px;
        overflow: hidden;
        margin-right: 30px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .song-detail-info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .detail-list-title {
            width: 400px;
        }
        p {
            color: #ccc;
            font-size: 30px;
             img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                vertical-align: middle;
            }
            i {
                vertical-align: middle;
            }
        }
        .edits {
            font-size: 24px;
        }
    }
        
}


.part-title {
    background-color: #eee;
    font-size: 40px;
    padding: 20px 0;
    padding-left: 30px;
}

</style>