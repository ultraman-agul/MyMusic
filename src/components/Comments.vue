<template>
    <!-- 歌曲评论 -->
    <div class="comments">
        <div class="part-title">最新评论({{this.commentList.length}})</div>
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
</template>
<script>

export default {
    name: "Comments",
    data() {
        return {
        };
    },
    props: {
        commentList: {
            type: Array
        }
    },
    methods: {
        
    },
};
</script>
<style lang='scss' scoped>
.part-title{
    background-color: #eee;
    font-size: 40px;
    padding: 20px 0;
    padding-left: 30px;
}
.comment {
    margin-top: 20px;
    padding: 0 20px;
    .comment-userinfo {
        display: flex;
        justify-content: space-between;
        .left-user {
            img {
                float: left;
                height: 70px;
                width: 70px;
                border-radius: 50%;
                margin-right: 20px;
            }
            div {
                float: left;
                p{
                    font-size: 34px;
                    img {
                        height: 30px;
                        width: 60px;
                        border-radius: 0;
                    }
                }
                p:nth-child(2){
                    color: #999;
                    font-size: 25px;
                }
            }
        }
        .good {
            height: 70px;
            color: #999;
            font-size: 25px;
            line-height: 70px;
        }
    }
}

.comment-content {
    margin-left: 70px;
    font-size: 30px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 最多两行，超出隐藏*/
    overflow: hidden;
    border-bottom: 2px solid #eee;
    p {
        margin: 14px 0;
    }
}

</style>