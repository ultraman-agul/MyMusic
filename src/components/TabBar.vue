<template>
    <footer>
        <van-tabbar v-model="active">
            <van-tabbar-item v-for='(item,index) in tabbars' :key='index' @click='tab(item.name,index)'
                :icon='item.icon'>
            </van-tabbar-item>
        </van-tabbar>
    </footer>

</template>
<script>
    export default {
        name: 'tabbar',
        data() {
            return {
                // homeActive: false,
                // detailActive: false,
                // userActive: false
                tabbars: [
                    {
                        name: '/home',//route
                        icon: 'home-o'
                    },
                    {
                        name: '/detail',
                        icon: 'chart-trending-o',
                    },
                    {
                        name: '/search',
                        icon: 'search',
                    },
                    {
                        name: '/city',
                        icon: 'notes-o',
                    },
                    {
                        name: '/userinfo',
                        icon: 'manager-o',
                    },
                ],
                currentIndex: 0,
                active: 0
            }
        },
        methods: {
            tab(name, index) {
                this.currentIndex = index
                this.$router.push(name)
            }
        }
        // watch: {
        //     $route(to, from) {
        //         switch (to.name) {
        //             case 'home':
        //                 this.homeActive = true
        //                 break;
        //             case 'userinfo':
        //                 this.userActive = true
        //                 break;
        //         }
        //         switch (from.name) {
        //             case 'home':
        //                 this.homeActive = false
        //                 break;
        //             case 'userinfo':
        //                 this.userActive = false
        //                 break
        //         }
        //     }
        // }
    }
</script>
<style scoped>
    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #dedede;
    }

    /* footer ul {
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    ul>li {
        height: 100%;
        line-height: 3rem;
    }

    ul>li>a {
        display: block;
        font-size: 1.5rem;
        width: 4rem;
        height: 100%;
    }

    .active {
        color: #1296db;
    } */
</style>