<template>
    <div class="head-nav-container">
        <div class="left-nav">
            <van-button type="info" icon="arrow-left" @click="goBack">
            </van-button>
            <!-- <van-button icon="home-o" type="info" @click='goHome'></van-button> -->
        </div>
        <div class="title">{{ title }}</div>
    </div>
</template>
<script>
export default {
    name: "headnav",
    props: ["title"], // 父组件传值
    data() {
        return {};
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        // goHome() { this.$router.push('/') }
    },
};
</script>
<style>
.head-nav-container {
    height: 80px;
    background-color: #1989fa;
    display: flex;
    align-items: center;
}

.left-nav {
    position: absolute;
    height: 80px;
    overflow: hidden;
}

.title {
    width: 100%;
    font-size: 30px;
    text-align: center;
    color: #fff;
    font-weight: bold;
}
</style>