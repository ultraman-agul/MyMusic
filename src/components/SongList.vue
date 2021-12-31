<template>
    <div class="song-lists">
        <div class="song-list-item" v-for="(item,index) in this.songList" :key='index' @click='handleToDetail(item.id)'>
            <div class="idx">
                {{(index+1) &lt; 10 ? '0' +(index+1) : (index+1)}} 
            </div>
            <div class='song-info'>
                <p>{{item.name}}</p>
                <p>
                    <span v-if='item.ar'>
                        <span v-for='(item,index) in item.ar' :key="index">
                            {{item.name+" "}}
                        </span>
                    </span>
                    <span v-else>
                        <span v-for='(item,index) in item.artists' :key="index">
                            {{item.name+" "}}
                        </span>
                    </span>
                   
                </p>
            </div>
            <div class="play-icon">
                <van-icon name="play-circle-o" />
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data() {
        return {
            songListId: 5001,
        };
    },
    props: {
        songList: {
            type: Array,
        }
    },
    methods: {
        handleToDetail(id) {
            this.$router.push({
                name: "detail",
                query: { id: id },
            });
        },
    },
    mounted(){
        
    },
}
</script>

<style lang='scss' scoped>
.song-lists{
    .song-list-item {
        display: flex;
        justify-content: space-between;
        width: 100%;
        border-bottom: 2px solid #ddd;
        .idx {
            margin: 0 20px;
            width: 50px;
            line-height: 100px;
            color: #1989fa;
        }
        .idx,
        .song-info {
            float: left;
        }
        .song-info {
            width: 550px;
            line-height: 100px;
            padding: 10px 0;
            p {
                font-size: 34px;
                font-weight: bold;
                line-height: 40px;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            p:nth-child(2) {
                font-size: 22px;
                color: #999;
            }
        }
        .play-icon { 
            width: 100px;
            height: 100px;
            .van-icon-play-circle-o{
                width: 100%;
                height: 100%;
                line-height: 100px;
                font-size: 60px;
            }

        }
    }
    .song-list-item:nth-child(-n + 3){
        .idx {
            color: #f01414;
        }
    } 
} 
</style>
