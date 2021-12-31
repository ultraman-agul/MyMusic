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
<style>
.comment {
    margin-top: 20px;
}

.comment-userinfo {
    display: flex;
    justify-content: space-between;
}

.left-user > img {
    float: left;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    margin-right: 20px;
}

.left-user div {
    float: left;
}

.left-user div p {
    margin: 0;
}

.left-user div p img {
    height: 30px;
    width: 60px;
}

.left-user div p:nth-child(2),
.good {
    color: #999;
    font-size: 25px;
}

.good {
    line-height: 70px;
}

.comment-content {
    margin-left: 70px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 最多两行，超出隐藏*/
    overflow: hidden;
    border-bottom: 2px solid #eee;
}

.comment-content p {
    margin: 14px 0;
}

</style>