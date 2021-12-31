<template>
    <div class="song-lists">
        <div class="song-list-item" v-for="(item,index) in this.songList" :key='index' @click='handleToDetail(item.id)'>
            <div class="idx">
                {{(index+1) &lt; 10 ? '0' +(index+1) : (index+1)}} 
            </div>
            <div class='song-info'>
                <p>{{item.name}}</p>
                <p>
                    <span v-for='(item,index) in item.ar' :key="index">
                        {{item.name+" "}}
                    </span>
                    <span>{{" - "+ item.al.name}}</span>
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

<style scoped>
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

.song-list-item:nth-child(-n + 3) .idx {
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
