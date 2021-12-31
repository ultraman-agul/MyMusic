<template>
    <div>
        <toptab></toptab>
        <div class="pic-div">
            <div class='hotsong'></div>
            <p>更新日期：6月29日</p>
        </div>
        <song-list :songList='songList'></song-list>
    </div>
</template>
<script>
import axios from 'axios'
import toptab from "@/components/TopTab.vue";
import SongList from '../components/SongList.vue'
export default {
    name: "hotlist",
    components: { toptab, SongList },
    data(){
        return {
            songList: []
        }
    },
    methods: {
          getSongListInfo() {
            axios
                .get("/playlist/detail?id=5001")
                .then((res) => {
                    console.log(res);
                    this.songList = res.playlist.tracks;
                    this.$store.commit(
                        "INIT_TOPLISTIDS",
                        res.playlist.tracks
                    );
                });
        },
    },
    mounted(){
        this.getSongListInfo()
    }
};
</script>
<style>
.pic-div {
    width: 100%;
    background: url(../assets/hot_music_bg_2x.jpg) no-repeat center center;
    height: 300px;
    padding: 30px;
    background-size: contain;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.hotsong {
    background: url(../assets/index_icon_2x.png) no-repeat;
    background-size: 300px 170px;
    width: 300px;
    height: 140px;
    background-position: -30px -40px;
}

.pic-div p {
    margin: 0;
    color: #fff;
    font-size: 20px;
}


</style>