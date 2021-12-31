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
                        :key="index">
                        <van-icon name="clock-o" class="clock" />
                        <div class='left-name' @click="handleToSelect(item)">
                            {{ item }}
                        </div>
                        <van-icon
                            name="cross"
                            @click="handleToDeleteHistory(index)"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- 搜索结果部分 -->
        <div v-if="searchStep == 2">
            <div class="search-tips">已显示“{{ searchValue }}”的搜索结果</div>
            <song-list :songList='songList'></song-list>
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
                    <div @click="handleToSelect(item.keyword)" class='left-name'>
                        {{ item.keyword }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import toptab from "@/components/TopTab.vue";
import axios from "axios";
import SongList from '@/components/SongList.vue'
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
    components: { toptab, SongList },
    methods: {
        // 获取搜索热词
        getHotSearch() {
            axios.get("/search/hot").then((res) => {
                if (res.code === 200) {
                    this.hotSearchList = res.result.hots;
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
                console.log(res)
                if (res.code === 200) {
                    this.songList = res.result.songs;
                }
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
                .get(`/search/suggest?keywords=${this.searchValue}&type=mobile`)
                .then((res) => {
                    if(res.code === 200){
                        this.keyWord = res.result.allMatch;
                    }
                });
        },
    },
    mounted() {
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
<style lang='scss' scoped>
.search-box {
    border-bottom: 2px solid #ddd;
}

.hot-search {
    padding: 30px 20px;
    .hot-search-title {
        font-size: 26px;
    }
    .hot-search-content {
        display: flex;
        flex-wrap: wrap;
        padding-top: 20px;
        .van-button {
            height: 70px;
            margin-right: 20px;
            margin-bottom: 20px;
        }
    }
   
}
 .search-history {
    // margin-top: 40px;
    padding: 20px;
    .history-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 50px;
        line-height: 50px;
        padding: 20px 0;
        font-size: 36px;
        .left-name {
            font-size: 26px;
            margin-left: 20px;
            width: 100%;
            border-bottom: 2px solid #ddd;
        }
    }
}
.search-tips {
    padding: 40px;
    font-size: 30px;
}

</style>