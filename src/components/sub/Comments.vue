<template>
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
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'Comments',
        data() {
            return {
                commentList: [],
                songOrSongListId: this.$route.query.songId
            }

        },
        methods: {
            getComments() {
                axios.get('/comment/playlist?id=' + this.songOrSongListId).then(res => {
                    if (res.data.code === 200) {
                        this.commentList = res.data.comments
                    }
                    console.log(res)
                })
            }
        },
        created() {
            this.getComments()
        }
    }
</script>
<style></style>