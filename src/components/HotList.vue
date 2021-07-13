<template>
    <div>
        <toptab></toptab>
        <div class="pic-div">
            <div class='hotsong'></div>
            <p>更新日期：6月29日</p>
        </div>
        <div class="song-lists">
            <div class="song-list-item" v-for="(item,index) in this.songList" @click='handleToDetail(item.id)'>
                <div>
                    <div class="idx">
                        {{(index+1) < 10 ? '0' +(index+1) : (index+1)}} </div>
                            <div class='song-info'>
                                <p>{{item.name}}</p>
                                <p>
                                    <span v-for='(item,index) in item.ar'>
                                        {{item.name+" "}}
                                    </span>
                                    <span>{{" - "+ item.al.name}}</span>
                                </p>
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
    import toptab from '@/components/TopTab.vue'
    import axios from 'axios'
    export default {
        name: 'hotlist',
        components: { toptab },
        data() {
            return {
                songList: []
            }
        },
        methods: {
            handleToDetail(id) {
                this.$router.push({
                    name: 'detail',
                    query: { id: id }
                })
            }
        },
        created() {
            axios.get('/playlist/detail?id=5001').then(res => {
                if (res.data.code === 200) {
                    this.songList = res.data.playlist.tracks
                    console.log(this.songList)
                }
            })
        }
    }
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

    .play-icon {
        line-height: 70px;
        width: 100px;
        height: 100px;
    }

    .play-icon i {
        width: 100%;
        height: 100%;
        font-size: 80px;
    }

    .song-list-item {
        display: flex;
        justify-content: space-between;
        width: 100%;
        border-bottom: 2px solid #ddd;
    }

    .idx,
    .song-info {
        float: left;
    }

    .idx {
        margin: 0 20px;
        width: 50px;
        line-height: 100px;
        color: #1989fa;
    }

    .song-info {
        width: 550px;
        line-height: 100px;
        padding: 10px 0;
    }

    .song-list-item:nth-child(-n+3) .idx {
        color: #f01414;
    }

    .song-info p {
        line-height: 40px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .song-info p:nth-child(2) {
        font-size: 22px;
        color: #999;
    }
</style>