<template>
    <div>
        <toptab></toptab>
        <div class="search-box">
            <van-search
                v-model="searchValue"
                shape="round"
                placeholder="请输入歌曲、歌手、专辑"
                @search="handleToSearch"
                @clear="clearSearchValue"
                @focus="searchFocus"
                @input="upadteValue"
            />
        </div>
        <div v-if="searchStep == 1">
            <!-- 热门搜索 -->
            <div class="hot-search">
                <div class="hot-search-title">热门搜索</div>
                <div class="hot-search-content">
                    <van-button
                        round
                        v-for="(item, index) in this.hotSearchList"
                        :key="index"
                        @click="handleToSelect(item.first)"
                    >
                        {{ item.first }}</van-button
                    >
                </div>
                <!-- 搜索记录 -->
                <div class="search-history">
                    <div
                        class="history-item"
                        v-for="(item, index) in searchHistory"
                        :key="index"
                    >
                        <van-icon name="clock-o" class="clock" />
                        <div>
                            <div @click="handleToSelect(item)">{{ item }}</div>
                            <van-icon
                                name="cross"
                                @click="handleToDeleteHistory(index)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 搜索结果部分 -->
        <div v-if="searchStep == 2">
            <div class="search-tips">已显示“{{ searchValue }}”的搜索结果</div>
            <div class="song-lists">
                <div
                    class="song-list-item"
                    v-for="(item, index) in this.songList"
                    :key="index"
                    @click="handleToDetail(item.id)"
                >
                    <div>
                        <div class="idx">
                            {{ index + 1 < 10 ? "0" + (index + 1) : index + 1 }}
                        </div>
                        <div class="song-info">
                            <p>{{ item.name }}</p>
                            <p>
                                <span
                                    v-for="(item, index) in item.artists"
                                    :key="index"
                                >
                                    {{ item.name + " " }}
                                </span>
                                <span>{{ " - " + item.album.name }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="play-icon">
                        <van-icon name="play-circle-o" />
                    </div>
                </div>
            </div>
        </div>
        <!-- 搜索提示部分 -->
        <div v-if="searchStep == 3">
            <div class="search-history">
                <div
                    class="history-item"
                    v-for="(item, index) in keyWord"
                    :key="index"
                >
                    <van-icon name="search" class="clock" />
                    <div>
                        <div @click="handleToSelect(item.keyword)">
                            {{ item.keyword }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import toptab from "@/components/TopTab.vue";
import axios from "axios";
export default {
    name: "search",
    data() {
        return {
            searchValue: "",
            hotSearchList: [],
            timer: null,
            searchHistory: [],
            searchStep: 1,
            songList: [],
            keyWord: [],
        };
    },
    components: { toptab },
    methods: {
        // 获取搜索热词
        getHotSearch() {
            axios.get("/search/hot").then((res) => {
                if (res.data.code === 200) {
                    this.hotSearchList = res.data.result.hots;
                }
            });
        },
        // 点击搜索事件
        handleToSearch() {
            if (this.searchValue.trim().length === 0) {
                this.searchStep = 1;
                return;
            }
            // 添加进搜索历史数组最前面，localStorage存储
            this.searchHistory.unshift(this.searchValue);
            this.searchHistory = Array.from(new Set(this.searchHistory));
            localStorage.setItem(
                "historySearch",
                JSON.stringify(this.searchHistory)
            );

            axios.get("/search?keywords= " + this.searchValue).then((res) => {
                if (res.data.code === 200) {
                    this.songList = res.data.result.songs;
                }
                // console.log(res)
            });
            // this.searchValue = ''
            this.searchStep = 2;
        },
        // 选择搜索热词
        handleToSelect(value) {
            this.searchValue = value;
            this.handleToSearch();
        },

        // 删除某个搜索历史
        handleToDeleteHistory(index) {
            this.searchHistory.splice(index, 1);
            localStorage.setItem(
                "historySearch",
                JSON.stringify(this.searchHistory)
            );
        },
        // 前往歌曲详情
        handleToDetail(index) {
            this.$router.push({
                name: "detail",
                query: { id: index },
            });
        },
        // 清除搜索框的内容
        clearSearchValue() {
            this.searchStep = 1;
        },
        searchFocus() {
            this.searchStep = 3;
        },
        // 搜索建议
        upadteValue() {
            // console.log(1)
            axios
                .get(
                    "/search/suggest?keywords= " +
                        this.searchValue +
                        "&type=mobile"
                )
                .then((res) => {
                    // console.log(res)
                    this.keyWord = res.data.result.allMatch;
                });
        },
    },
    created() {
        this.getHotSearch();
        // 获取搜索历史
        if (localStorage.getItem("historySearch")) {
            this.searchHistory = JSON.parse(
                localStorage.getItem("historySearch")
            );
        }
    },
};
</script>
<style>
.search-box {
    border-bottom: 2px solid #ddd;
}

.hot-search {
    padding: 30px 20px;
}

.hot-search-title {
    font-size: 26px;
}

.hot-search-content {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
}

.hot-search-content button {
    margin-right: 20px;
    margin-bottom: 20px;
}

.hot-search-content .van-button {
    height: 70px;
}

.history-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.search-history {
    margin-top: 40px;
}

.clock {
    left: 10px;
    position: relative;
    top: -20px;
}

.history-item > div {
    margin-left: 40px;
    width: 86%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #ddd;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.search-tips {
    padding: 40px;
}

/* 歌曲部分 */
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
    font-size: 60px;
}

.song-list-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
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